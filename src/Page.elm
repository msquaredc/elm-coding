module Page exposing (Model, Msg(..), Page, defaultModel, subscriptions, update, view, viewHeader)

import Browser exposing (Document)
import Data
import Html exposing (Html, a, button, div, footer, i, img, li, nav, p, span, text, ul)
import Html.Attributes exposing (class, classList, href, style)
import Json.Decode as Decode
import Material
import Material.LayoutGrid as LayoutGrid
import Material.Options as Options
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Page.Data
import Page.Error
import Page.Login
import Page.Url
import Url


type alias Page =
    { error : Page.Error.Model Msg
    , data : Page.Data.Model Msg
    , login : Page.Login.Model Msg
    }


type GotPageMsg
    = GotErrorMsg (Page.Error.Msg Msg)
    | GotDataMsg (Page.Data.Msg Msg)
    | GotLoginMsg (Page.Login.Msg Msg)


type Msg
    = OpenDrawer
    | Mdc (Material.Msg Msg)
    | PageMsg GotPageMsg
    | OpenOverflow
    | UrlChanged Url.Url


type alias Model =
    { mdc : Material.Model Msg
    , page : Page
    , url : Page.Url.Url
    }


init : Url.Url -> Maybe Decode.Error -> Model
init url dc =
    { mdc = Material.defaultModel
    , page = defaultPage
    , url = Page.Url.fromUrl url
    }


defaultModel : Model
defaultModel =
    { mdc = Material.defaultModel
    , page = defaultPage
    , url = Page.Url.defaultUrl
    }


defaultPage : Page
defaultPage =
    { error = Page.Error.defaultModel
    , data = Page.Data.defaultModel
    , login = Page.Login.defaultModel
    }


update : Msg -> Model -> Data.Model -> ( Model, Cmd Msg )
update msg model data =
    case msg of
        Mdc msg_ ->
            Material.update Mdc msg_ model

        PageMsg m ->
            let
                ( page, effects ) =
                    updatePage m model.page data
            in
            ( { model | page = page }, effects )
        OpenDrawer -> 
            (model, Cmd.none)
        OpenOverflow -> 
            (model, Cmd.none)
        UrlChanged url -> 
            ({model | url = Page.Url.fromUrl url}, Cmd.none)


updatePage : GotPageMsg -> Page -> Data.Model -> ( Page, Cmd Msg )
updatePage msg model data =
    case msg of
        GotLoginMsg msg_ ->
            let
                ( login, effects ) =
                    Page.Login.update (PageMsg << GotLoginMsg) msg_ model.login data
            in
            ( { model | login = login }, effects )

        GotErrorMsg msg_ ->
            let
                ( error, effects ) =
                    Page.Error.update (PageMsg << GotErrorMsg) msg_ model.error
            in
            ( { model | error = error }, effects )

        GotDataMsg msg_ ->
            let
                ( datam, effects ) =
                    Page.Data.update (PageMsg << GotDataMsg) msg_ model.data
            in
            ( { model | data = datam }, effects )


view : Model -> Data.Model -> Document Msg
view model data =
    case model.url of
        Page.Url.Data ->
            viewUI model (Page.Data.view (PageMsg << GotDataMsg) model.page.data data)

        Page.Url.Error ->
            viewUI model (Page.Error.view (PageMsg << GotErrorMsg) model.page.error data)

        Page.Url.StartPage ->
            viewUI model (Page.Login.view (PageMsg << GotLoginMsg) model.page.login data)

        Page.Url.Error404 _ ->
            viewUI model (Page.Login.view (PageMsg << GotLoginMsg) model.page.login data)


subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model


viewUI : Model -> { title : String, body : List (Html Msg) } -> Document Msg
viewUI model { title, body } =
    let
        header =
            viewHeader model title
    in
    { title = title ++ " - Conduit2"
    , body = viewBody header (text title) body :: [ viewFooter model.mdc ]
    }


viewBody : Html msg -> Html msg -> List (Html msg) -> Html msg
viewBody bar title content =
    Options.styled div
        [ Options.css "display" "flex"
        , Options.css "flex-flow" "column"
        , Options.css "height" "100%"
        , Typography.typography
        ]
        [ bar
        , Options.styled div
            [ Options.cs "demo-panel"
            , Options.css "display" "flex"
            ]
            [ div
                []
                {- }                                 [ Page.drawer Mdc "page-drawer" model.mdc CloseDrawer SelectDrawerItem model.url model.is_drawer_open
                   , Drawer.scrim [ Options.onClick CloseDrawer ] []
                   ]
                -}
                []
            , Options.styled div
                [ Options.cs "demo-content"

                --                                  , DismissibleDrawer.appContent
                , TopAppBar.fixedAdjust
                , Options.css "width" "100%"
                , Options.css "display" "flex"
                , Options.css "justify-content" "flex-start"
                , Options.css "flex-direction" "column"
                , Options.css "align-items" "center"
                ]
                [ Options.styled div
                    [ Options.cs "demo-content-transition"
                    , Options.css "width" "100%"
                    , Options.css "max-width" "1200px"
                    ]
                    [ viewLayout Nothing content Nothing ]
                ]
            ]
        ]


viewLayout : Maybe (List (Html msg)) -> List (Html msg) -> Maybe (List (Html msg)) -> Html msg
viewLayout left middle right =
    LayoutGrid.view []
        [ LayoutGrid.cell
            [ LayoutGrid.span2
            , LayoutGrid.span4Phone
            ]
            (Maybe.withDefault [] left)
        , LayoutGrid.cell
            [ LayoutGrid.span8
            , LayoutGrid.span6Tablet
            ]
            middle
        , LayoutGrid.cell
            [ LayoutGrid.span2
            , LayoutGrid.span4Phone
            ]
            (Maybe.withDefault [] right)
        ]


viewHeader : Model -> String -> Html Msg
viewHeader model title =
    TopAppBar.view Mdc
        "my-top-app-bar"
        model.mdc
        [ TopAppBar.fixed ]
        [ TopAppBar.section [ TopAppBar.alignStart ]
            [ TopAppBar.navigationIcon Mdc
                "my-menu"
                model.mdc
                [ Options.onClick OpenDrawer ]
                "menu"
            , TopAppBar.title [] [ text title ]
            ]
        , TopAppBar.section [ TopAppBar.alignEnd ]
            {- [ TopAppBar.actionItem [] "file_download"
               , TopAppBar.actionItem [] "print"
               , TopAppBar.actionItem [] "bookmark"
               ]
            -}
            [ TopAppBar.actionItem Mdc "options" model.mdc [ Options.onClick OpenOverflow ] "more_vert" ]
        ]


viewFooter : Material.Model msg -> Html msg
viewFooter mdc =
    Options.styled div
        [ Typography.typography
        , Options.css "position" "fixed"
        , Options.css "left" "0"
        , Options.css "bottom" "0"
        , Options.css "width" "100%"
        , Options.css "text-align" "center"
        , Options.css "background-color" "LightGrey"
        , --        Options.css "color" "white",
          Options.css "padding" "16px"
        ]
        [ footer [ class "footer" ]
            [ div [ class "footer__content" ]
                [ a [ class "footer__logo", href "/" ] [ text "M²C" ]
                , span [ class "attribution" ]
                    [ text " Hosted with Love at "
                    , a [ href "https://github.com" ] [ text "GitHub" ]
                    , text ". Code & design licensed under MIT."
                    ]
                ]
            ]
        ]

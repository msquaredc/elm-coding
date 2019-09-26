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
import Material.SimplifiedList as SL
import Material.LinearProgress as LinearProgress
import Page.Data
import Page.Error
import Page.Login
import Page.Url
import Page.Home
import Page.Code
import Url
import Entities.Coder
import Entities.Coding
import Db exposing (Db, Row)
import List.Extra


type alias Page =
    { error : Page.Error.Model Msg
    , data : Page.Data.Model Msg
    , login : Page.Login.Model Msg
    , home : Page.Home.Model Msg
    , code : Page.Code.Model Msg
    }


type GotPageMsg
    = GotErrorMsg (Page.Error.Msg Msg)
    | GotDataMsg (Page.Data.Msg Msg)
    | GotLoginMsg (Page.Login.Msg Msg)
    | GotHomeMsg (Page.Home.Msg Msg)
    | GotCodeMsg (Page.Code.Msg Msg)


type Msg
    = OpenDrawer
    | Mdc (Material.Msg Msg)
    | PageMsg GotPageMsg
    | OpenOverflow
    | UrlChanged Url.Url
    | DataMsg (Data.Msg)
    | GenerateFrame (Row Entities.Coding.Model)


type alias Model =
    { mdc : Material.Model Msg
    , page : Page
    , url : Page.Url.Url
    , user : Maybe (Row Entities.Coder.Model)
    , coding : Maybe (Row Entities.Coding.Model)
    }


init : Url.Url -> Maybe Decode.Error -> Model
init url dc =
    { mdc = Material.defaultModel
    , page = defaultPage
    , url = Page.Url.fromUrl url
    , user = Nothing
    , coding = Nothing
    }


defaultModel : Model
defaultModel =
    { mdc = Material.defaultModel
    , page = defaultPage
    , url = Page.Url.defaultUrl
    , user = Nothing
    , coding = Nothing
    }


defaultPage : Page
defaultPage =
    { error = Page.Error.defaultModel
    , data = Page.Data.defaultModel
    , login = Page.Login.defaultModel
    , home = Page.Home.defaultModel
    , code = Page.Code.defaultModel
    }


update : Msg -> Data.Model -> Model  -> ( Model, Cmd Msg )
update msg data model =
    case msg of
        Mdc msg_ ->
            Material.update Mdc msg_ model

        PageMsg m ->
            case m of 
                GotLoginMsg (Page.Login.Select index) ->
                    let 
                        list = Page.Login.getFilteredList data.coders model.page.login.field
                        mb_row = List.Extra.getAt index list
                    in
                        ({model | user = mb_row},Cmd.none)
                GotHomeMsg (Page.Home.ListMsg (SL.Select coding)) -> 
                    let 
                        new_model = {model | coding = Just coding}
                        new_model2 = {new_model | url = Page.Url.Code}
                    in
                        new_model2
                        |> update (GenerateFrame coding) data
                GotCodeMsg (Page.Code.DataMsg msg_) -> 
                    update (DataMsg msg_) data model
                _ ->
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
        GenerateFrame coding -> 
            (model, Cmd.none)
        DataMsg _ -> 
            (model, Cmd.none)



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
        GotHomeMsg msg_ ->
            let
                ( homem, effects ) =
                    Page.Home.update (PageMsg << GotHomeMsg) msg_ model.home
            in
            ( { model | home = homem }, effects )
        GotCodeMsg msg_ -> 
            let
                ( codem, effects ) =
                    Page.Code.update (PageMsg << GotCodeMsg) msg_ model.code
            in
            ( { model | code = codem }, effects )


view : Model -> Data.Model -> Document Msg
view model data =
    let 
        viewLoggedIn viewf msg page = 
            case model.user of
                Just user ->
                    viewUI model (viewf (PageMsg << msg) page data user)
                Nothing ->
                    viewUI model (Page.Login.view (PageMsg << GotLoginMsg) model.page.login data model.user)
    in
        case model.url of
            Page.Url.Data ->
                viewLoggedIn Page.Data.view GotDataMsg model.page.data

            Page.Url.Error ->
                viewLoggedIn Page.Error.view GotErrorMsg model.page.error

            Page.Url.StartPage ->
                viewLoggedIn Page.Home.view GotHomeMsg model.page.home

            Page.Url.Error404 _ ->
                viewLoggedIn Page.Error.view GotErrorMsg model.page.error
            
            Page.Url.Home -> 
                viewLoggedIn Page.Home.view GotHomeMsg model.page.home

            Page.Url.Code ->
                case model.coding of
                    Just coding ->
                        viewUI model (Page.Code.view (PageMsg << GotCodeMsg) model.page.code data coding)
                
                    Nothing ->
                        viewLoggedIn Page.Home.view GotHomeMsg model.page.home
                
                

                        
                
            


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
    , body = viewBody header (Just 0.5) (text title) body :: viewDebug model :: [ viewFooter model.mdc ]
    }

viewDebug : Model -> Html msg
viewDebug model =
    text (Page.Url.toString model.url)

viewBody : Html msg -> Maybe Float -> Html msg -> List (Html msg) -> Html msg
viewBody bar progress title content =
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
                    [viewProgress progress, viewLayout Nothing content Nothing ]
                ]
            ]
        ]

viewProgress : Maybe Float -> Html msg 
viewProgress progress =
    case progress of
        Just value ->
            LinearProgress.view
                [ LinearProgress.determinate value
                ]
                []
    
        Nothing ->
            div [][]
    

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

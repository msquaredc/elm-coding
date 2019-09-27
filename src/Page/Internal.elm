module Page.Internal exposing (..)

import Browser
import Html exposing (Html, text, div,footer, a, span)
import Html.Attributes exposing (class, classList, href, style)
import Material
import Material.Options as Options
import Material.Typography as Typography
import Material.LinearProgress as LinearProgress
import Material.TopAppBar as TopAppBar
import Material.LayoutGrid as LayoutGrid
import Material.Elevation as Elevation
import Material.Button as Button

type alias Model m =
    {mdc : Material.Model m,
    drawer : Bool,
    overflow : Bool}

type Msg m 
    = Mdc (Material.Msg m)
    | OpenDrawer
    | OpenOverflow

update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m)
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model
        OpenDrawer -> 
            ({model | drawer = True}, Cmd.none)
        OpenOverflow -> 
            ({model | overflow = True}, Cmd.none)

    

defaultModel : Model m
defaultModel = {mdc = Material.defaultModel,
                drawer = False,
                overflow = False}

type alias Document m = 
    {title:String,
    body : List (Html m),
    progress : ProgressType,
    navigation : NavigationType}

type ProgressType
    = HideProgress
    | Progress Float
    | Indeterminate

type NavigationType
    = Paginate Int Int
    | HideNavigation

type DrawerState
    = Open
    | Closed

view : (Msg m -> m) -> Model m -> Document m -> Browser.Document m
view lift model { title, body, progress, navigation} =
    let
        header =
            viewHeader lift model title
    in
    { title = title ++ " - Conduit2"
    , body = viewBody lift header progress (text title) body :: [(viewNavigation lift model.mdc navigation) ]
    }

{- viewDebug : Model -> Html msg
viewDebug model =
    text (Page.Url.toString model.url) -}

viewBody : (Msg m -> m) -> Html msg -> ProgressType -> Html msg -> List (Html msg) -> Html msg
viewBody lift bar progress title content =
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

viewProgress : ProgressType -> Html msg 
viewProgress progress =
    case progress of
        Progress value ->
            LinearProgress.view
                [ LinearProgress.determinate value
                ]
                []
    
        HideProgress ->
            div [][]

        Indeterminate ->
            LinearProgress.view
                [ LinearProgress.indeterminate
                ]
                []
    

viewLayout : Maybe (List (Html msg)) -> List (Html msg) -> Maybe (List (Html msg)) -> Html msg
viewLayout left middle right =
    LayoutGrid.view []
        [ LayoutGrid.cell
            [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
--            , LayoutGrid.span4Phone
            ]
            middle
{-         , LayoutGrid.cell
            [ LayoutGrid.span8
            , LayoutGrid.span6Tablet
            ]
            middle
        , LayoutGrid.cell
            [ LayoutGrid.span2
--            , LayoutGrid.span4Phone
            ]
            (Maybe.withDefault [] right) -}
        ]


viewHeader :(Msg m -> m) -> Model m -> String -> Html m
viewHeader lift model title =
    TopAppBar.view (lift << Mdc)
        "my-top-app-bar"
        model.mdc
        [ TopAppBar.fixed ]
        [ TopAppBar.section [ TopAppBar.alignStart ]
            [ TopAppBar.navigationIcon (lift<< Mdc)
                "my-menu"
                model.mdc
                []
--                [ Options.onClick (OpenDrawer) ]
                "menu"
            , TopAppBar.title [] [ text title ]
            ]
        , TopAppBar.section [ TopAppBar.alignEnd ]
            {- [ TopAppBar.actionItem [] "file_download"
               , TopAppBar.actionItem [] "print"
               , TopAppBar.actionItem [] "bookmark"
               ]
            -}
            [ TopAppBar.actionItem (lift << Mdc) "options" model.mdc [ {- Options.onClick OpenOverflow -} ] "more_vert" ]
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

viewNavigation : (Msg m -> m) -> Material.Model m -> NavigationType -> Html m
viewNavigation lift mdc ntype = 
    case ntype of
        HideNavigation ->
            viewFooter mdc
        Paginate cur max ->
            Options.styled div
            [ Typography.typography
            , Elevation.z3
            , Options.css "position" "fixed"
            , Options.css "left" "0"
            , Options.css "bottom" "0"
            , Options.css "width" "100%"
            , Options.css "text-align" "center"
--            , Options.css "background-color" "LightGrey"
            ,         Options.css "color" "white",
            Options.css "padding" "16px"
            ]
            [Button.view (lift << Mdc) "navigation-back" mdc [Button.outlined][text "Button"]]
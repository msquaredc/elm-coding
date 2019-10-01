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
import Material.IconButton as IconButton

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
    progress : Maybe (ProgressType),
    navigation : Maybe (NavigationType)}

type ProgressType
    = Progress Float
    | Indeterminate

type NavigationType
    = Paginate Int Int

type DrawerState
    = Open
    | Closed

view : (Msg m -> m) -> Model m -> Document m -> Browser.Document m
view lift model document =
    let
        header =
            viewHeader lift model document.title
    in
    { title = document.title ++ " - M²C"
    , body = viewBody lift header document model :: [(viewNavigation lift model.mdc document.navigation) ]
    }

{- viewDebug : Model -> Html msg
viewDebug model =
    text (Page.Url.toString model.url) -}

viewBody : (Msg msg -> msg) -> Html msg -> Document msg -> Model msg -> Html msg
viewBody lift bar document model=
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
                [ viewProgress document.progress,
                    Options.styled div
                    [ Options.cs "demo-content-transition"
                    , Options.css "width" "100%"
                    , Options.css "max-width" "1200px"
                    ]
                    [viewLayout (viewPrev lift model.mdc document.navigation) document.body (viewNext lift model.mdc document.navigation) ]
                ]
            ]
        ]

viewProgress : Maybe (ProgressType) -> Html msg 
viewProgress progress =

    case progress of
        Just progress_type ->
            case progress_type of
                Progress value ->
                    LinearProgress.view
                        [ LinearProgress.determinate value
                        ]
                        []

                Indeterminate ->
                    LinearProgress.view
                        [ LinearProgress.indeterminate
                        ]
                        []

        Nothing -> 
            div [][]
            

viewLayout : Maybe (Html msg) -> List (Html msg) -> Maybe (Html msg) -> Html msg
viewLayout left middle right =
    LayoutGrid.view []
        {- [ LayoutGrid.cell
            [ LayoutGrid.span1Tablet
            , LayoutGrid.span1Desktop
--            , LayoutGrid.span4Phone
            ]
            [(Maybe.withDefault (div [][]) left)] -}
            [LayoutGrid.cell
            [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
            ]
            middle
            
        {- , LayoutGrid.cell
            [ LayoutGrid.span1Tablet
            , LayoutGrid.span1Desktop
            ]
            [(Maybe.withDefault (div[][]) right)] -}
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

viewNavigation : (Msg m -> m) -> Material.Model m -> Maybe (NavigationType)-> Html m
viewNavigation lift mdc wntype = 
    case wntype of 
        Nothing -> 
            viewFooter mdc
        Just ntype ->
            case ntype of
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


viewPrev : (Msg m -> m) -> Material.Model m-> Maybe (NavigationType) -> Maybe(Html m)
viewPrev lift mdc mb_navtype =
    case mb_navtype of 
        Nothing ->
            Nothing
        Just navtype ->
            case navtype of
                Paginate 0 _ -> 
                    Nothing
                Paginate _ _ ->
                    Just (Button.view 
                            (lift << Mdc) 
                            "navigation-side-previous"
                            mdc
                            (Options.css "margin" "32px 32px"
                                :: Button.ripple
                                :: Button.outlined
                                :: Button.icon "navigate_before"
                                :: []
                            )
                            []
                    )
viewNext : (Msg m -> m) -> Material.Model m-> Maybe (NavigationType) -> Maybe(Html m)
viewNext lift mdc mb_navtype =
    case mb_navtype of 
        Nothing -> 
            Nothing
        Just navtype ->
            case navtype of
                Paginate a b -> 
                    case a==b of
                        True ->
                            Nothing
                        False ->
                            Just (IconButton.view (lift <<Mdc) "my-icon-button" mdc
                                [ IconButton.icon
                                    { on = "navigate_next_border"
                                    , off = "navigate_next"
                                    }
                                , IconButton.label
                                    { on = "Remove from favorites"
                                    , off = "Add to favorites"
                                    }
                                , IconButton.on
        --                        , Options.onClick Toggle
                                ]
                                []
                            )
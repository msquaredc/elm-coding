module Page.Internal exposing (Document, Model, Msg(..), NavigationType(..), ProgressType(..), defaultModel, update, view, viewBody, viewDrawer, viewFooter, viewHeader, viewLayout, viewNavigation, viewNext, viewPrev, viewProgress)

import Browser
import Db exposing (Db, Row)
import Entities.Coder as Coder
import Html exposing (Html, a, div, footer, h3, h6, span, text)
import Html.Attributes as Html exposing (class, classList, href, style)
import Material
import Material.Button as Button
import Material.Elevation as Elevation
import Material.IconButton as IconButton
import Material.LayoutGrid as LayoutGrid
import Material.LinearProgress as LinearProgress
import Material.Options as Options
import Material.Typography as Typography
import Material.TopAppBar as TopAppBar
import Page.Internal.Drawer as Drawer
import Page.Internal.AppBar as AppBar
import Page.Internal.Navigation as Navigation


type alias Model m =
    { mdc : Material.Model m
    , drawer : Drawer.Model m
    , overflow : Bool
    , appbar : AppBar.Model m
    }



type Msg m
    = Mdc (Material.Msg m)
    | DrawerMsg (Drawer.Msg m)
    | AppBarMsg (AppBar.Msg m)
    | NavigationMsg (Navigation.Msg m)
    | OpenOverflow


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        DrawerMsg msg_ ->
            let
                ( drawer, effect ) =
                    Drawer.update (lift << DrawerMsg) msg_ model.drawer
            in
            ( { model | drawer = drawer }, effect )

        OpenOverflow ->
            ( { model | overflow = True }, Cmd.none )
        
        AppBarMsg msg_ -> 
            let 
                (appbar, effect ) = 
                    AppBar.update (lift << AppBarMsg) msg_ model.appbar
            in
                ({model | appbar = appbar}, effect)
        NavigationMsg msg_ -> 
            (model, Cmd.none)


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    , drawer = Drawer.defaultModel
    , appbar = AppBar.defaultModel
    , overflow = False
    }


type alias Document m =
    { title : String
    , body : List (Html m)
    , progress : Maybe ProgressType
    , navigation : Maybe NavigationType
    , drawer : Drawer.Config m
    , appbar : AppBar.Config m
    }


type ProgressType
    = Progress Float
    | Indeterminate


type NavigationType
    = Paginate Int Int


view : (Msg m -> m) -> Model m -> Document m -> Browser.Document m
view lift model document =
    let
        header =
            viewHeader lift model document.appbar
    in
    { title = document.title ++ " - M²C"
    , body = viewBody lift header document model document.drawer :: [ viewNavigation lift model.mdc document.navigation ]
    }



{- viewDebug : Model -> Html msg
   viewDebug model =
       text (Page.Url.toString model.url)
-}


viewBody : (Msg msg -> msg) -> Html msg -> Document msg -> Model msg -> Drawer.Config msg -> Html msg
viewBody lift bar document model drawer_config =
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
                --                [ Page.drawer Mdc "page-drawer" model.mdc CloseDrawer SelectDrawerItem model.url model.is_drawer_open
                --                   , Drawer.scrim [ Options.onClick CloseDrawer ] []
                --                   ]
                (viewDrawer lift model drawer_config)
            , Options.styled div
                [ Options.cs "demo-content"

                --               , DismissibleDrawer.appContent
                , TopAppBar.fixedAdjust
                , Options.css "width" "100%"
                , Options.css "display" "flex"
                , Options.css "justify-content" "flex-start"
                , Options.css "flex-direction" "column"
                , Options.css "align-items" "center"
                ]
                [ viewProgress document.progress
                , Options.styled div
                    [ Options.cs "demo-content-transition"
                    , Options.css "width" "100%"
                    , Options.css "max-width" "1200px"
                    ]
                    [ viewLayout (viewPrev lift model.mdc document.navigation) document.body (viewNext lift model.mdc document.navigation) ]
                ]
            ]
        ]


viewProgress : Maybe ProgressType -> Html msg
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
            div [] []


viewLayout : Maybe (Html msg) -> List (Html msg) -> Maybe (Html msg) -> Html msg
viewLayout left middle right =
    Options.styled div
        [ Options.cs "hero" ]
        [ LayoutGrid.view []
            {- [ LayoutGrid.cell
                           [ LayoutGrid.span1Tablet
                           , LayoutGrid.span1Desktop
               --            , LayoutGrid.span4Phone
                           ]
                           [(Maybe.withDefault (div [][]) left)]
            -}
            [ LayoutGrid.cell
                [ LayoutGrid.span4Phone
                , LayoutGrid.span8Tablet
                , LayoutGrid.span12Desktop
                ]
                middle

            {- , LayoutGrid.cell
               [ LayoutGrid.span1Tablet
               , LayoutGrid.span1Desktop
               ]
               [(Maybe.withDefault (div[][]) right)]
            -}
            ]
        ]


viewHeader : (Msg m -> m) -> Model m -> AppBar.Config m -> Html m
viewHeader lift model config =
    AppBar.view 
        (lift << AppBarMsg) 
        model.appbar 
        config 
        (lift (DrawerMsg Drawer.OpenDrawer))
    


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


viewNavigation : (Msg m -> m) -> Material.Model m -> Maybe NavigationType -> Html m
viewNavigation lift mdc wntype =
    case wntype of
        Just (Paginate cur_index max_index) ->
            Navigation.view (lift << NavigationMsg) mdc {cur_index = cur_index, max_index = max_index }
        Nothing ->
            div [][]
    


viewPrev : (Msg m -> m) -> Material.Model m -> Maybe NavigationType -> Maybe (Html m)
viewPrev lift mdc mb_navtype =
    case mb_navtype of
        Nothing ->
            Nothing

        Just navtype ->
            case navtype of
                Paginate 0 _ ->
                    Nothing

                Paginate _ _ ->
                    Just
                        (Button.view
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


viewNext : (Msg m -> m) -> Material.Model m -> Maybe NavigationType -> Maybe (Html m)
viewNext lift mdc mb_navtype =
    case mb_navtype of
        Nothing ->
            Nothing

        Just navtype ->
            case navtype of
                Paginate a b ->
                    case a == b of
                        True ->
                            Nothing

                        False ->
                            Just
                                (IconButton.view (lift << Mdc)
                                    "my-icon-button"
                                    mdc
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


viewDrawer : (Msg m -> m) -> Model m -> Drawer.Config m -> List (Html m)
viewDrawer lift model config =
    Drawer.view (lift << DrawerMsg) model.drawer config



{- let
       title =
   in
   [ Drawer.view (lift << Mdc) "my-drawer" model.mdc
       [ Drawer.open |> Options.when model.drawer ]
       [ Drawer.header [ ]
           [ Options.styled h3 [ Drawer.title ] [ text(Maybe.withDefault "Please Log in!" (Maybe.map .name coder))]
           , Options.styled h6 [ Drawer.subTitle ] [ text (Id.toString id) ]
           ]
       , Drawer.content []
             [ Lists.nav (lift << Mdc) "my-list" model.mdc
                   [ Lists.singleSelection
                   , Lists.useActivated
                   ]
                   [ Lists.a
                         [ Options.attribute (Html.href "#persistent-drawer")
                         , Lists.activated
                         ]
                         [ Lists.graphicIcon [] "inbox"
                         , text "Inbox"
                         ]
                   , Lists.a
                         [ Options.attribute (Html.href "#persistent-drawer")
                         ]
                         [ Lists.graphicIcon [] "star"
                         , text "Star"
                         ]
                   , Lists.divider [] []
                   , Lists.a
                         [ Options.attribute (Html.href "#persistent-drawer")
                         ]
                         [ Lists.graphicIcon [] "send"
                         , text "Sent Mail"
                         ]
                   , Lists.a
                         [ Options.attribute (Html.href "#persistent-drawer")
                         ]
                         [ Lists.graphicIcon [] "drafts"
                         , text "Drafts"
                         ]
                   ]
             ]
       ]
   , Drawer.scrim [ Options.onClick (lift CloseDrawer) ] []
   {- , Options.styled Html.div
       [ Options.cs "drawer-frame-app-content" ]
       [ Html.p [] [ text "content" ] ] -}
   ]
-}

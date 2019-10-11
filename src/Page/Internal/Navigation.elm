module Page.Internal.Navigation exposing (..)

import Html exposing (Html, text, div)
import Material
import Material.TopAppBar as TopAppBar
import Material.Options as Options
import Material.Elevation as Elevation
import Material.Typography as Typography
import Material.TabBar as TabBar
import Material.Theme as Theme
import Material.Icon as Icon
import Material.LayoutGrid as LayoutGrid
import Material.Button as Button

type Msg m
    = Mdc (Material.Msg m)
    | Back

type NavigationType = 
    Paginate CurrentState
    | Locate (List(String))

type alias CurrentState =
    {cur_index : Int,
    max_index: Int}

view : (Msg m -> m) -> Material.Model m -> CurrentState -> Html m
view lift mdc state = 
    Options.styled div
                        [ Typography.typography
                        , Elevation.z3
                        , Options.css "position" "fixed"
                        , Options.css "left" "0"
                        , Options.css "bottom" "0"
                        , Options.css "width" "100%"
                        , Theme.primaryBg]
    [viewPaginate lift mdc state]
{-   case wntype of
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
                        , Options.css "color" "white"
                        , Options.css "padding" "16px"
                        ]
                        [ Button.view (lift << Mdc) "navigation-back" mdc [ Button.outlined ] [ text "Button" ] ]
-}

viewNavigate : (Msg m -> m) -> Material.Model m -> CurrentState -> Html m
viewNavigate lift mdc state =
    TabBar.view (lift << Mdc) "my-tab-bar" mdc
        [ TabBar.activeTab 0,
        TabBar.stacked,
        TabBar.smallIndicator
        , Options.css "width" "100%"
        ]
        [ TabBar.tab [TabBar.icon "person"] [ text "person" ]
        , TabBar.tab [TabBar.icon "person"] [ text "person"]
        , TabBar.tab [TabBar.icon "message"] [ text "message"]
        ]

viewPaginate : (Msg m -> m) -> Material.Model m -> CurrentState -> Html m
viewPaginate lift mdc state = 
    LayoutGrid.view [LayoutGrid.fixedColumnWidth]
        [ LayoutGrid.cell [LayoutGrid.alignLeft][
            Button.view (lift << Mdc) "paginate-first" mdc
            [ Theme.textIconOnBackground
            , Button.outlined
            , Button.ripple
            , Options.onClick (lift Back)
            , Button.icon "person"
            ]
            [ ]
        ]
        , LayoutGrid.cell  [LayoutGrid.alignMiddle] []
        , LayoutGrid.cell [LayoutGrid.alignRight] []
        ]
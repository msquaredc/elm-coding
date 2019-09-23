module Page exposing (Page(..), view, viewHeader)

import Browser exposing (Document)
import Html exposing (Html, a, button, div, footer, i, img, li, nav, p, span, text, ul)
import Html.Attributes exposing (class, classList, href, style)
import Material exposing (..)
import Material.TopAppBar as TopAppBar
import Material.Options as Options exposing (cs, css,styled)
import Material.Typography as Typography
import Data


type Page
    = Error
    | Research
    | Data

type Msg m
    = OpenDrawer
    | Mdc (Material.Msg m)

type alias Model msg =
    {mdc : Material.Model msg,
    title : String,
    body : List(Html msg),
    data : Data.Model}

view : Material.Model msg -> Page -> { title : String, content : Html msg } -> Document msg
view mdc page { title, content } =
    let 
        header = viewHeader mdc page
    in 
        { title = title ++ " - Conduit2ü"
        , content = viewContent header (text title) content :: [ viewFooter mdc ]
        }

viewContent : Html msg -> Html msg -> Html msg -> Html msg
viewContent bar title content = 
    styled div
        [ css "display" "flex"
        , css "flex-flow" "column"
        , css "height" "100%"
        , Typography.typography
        ]
        [ bar 
        , styled div
            [ cs "demo-panel"
            , css "display" "flex"
            ]
            [ div
                    []
{-}                                 [ Page.drawer Mdc "page-drawer" model.mdc CloseDrawer SelectDrawerItem model.url model.is_drawer_open
                    , Drawer.scrim [ Options.onClick CloseDrawer ] []
                    ]-}[]
            , styled div
                    [ cs "demo-content"
--                                  , DismissibleDrawer.appContent
                    , TopAppBar.fixedAdjust
                    , css "width" "100%"
                    , css "display" "flex"
                    , css "justify-content" "flex-start"
                    , css "flex-direction" "column"
                    , css "align-items" "center"
                    ]
                    [ styled div
                    [ cs "demo-content-transition"
                    , css "width" "100%"
                    , css "max-width" "1200px"
                    ]
                    [ content ]
                    ]
            ]
        ]

viewHeader : Material.Model msg -> Page -> Html msg
viewHeader mdc page =
    TopAppBar.view Mdc
        "my-top-app-bar"
        mdc
        [ TopAppBar.fixed ]
        [ TopAppBar.section [ TopAppBar.alignStart ]
            [ TopAppBar.navigationIcon Mdc
                "my-menu"
                mdc
                [] -- [ Options.onClick OpenDrawer ]
                "menu"
            , TopAppBar.title [] [ text "Todo Title" ]
            ]
        , TopAppBar.section [ TopAppBar.alignEnd ]
{-           [ TopAppBar.actionItem [] "file_download"
            , TopAppBar.actionItem [] "print"
            , TopAppBar.actionItem [] "bookmark"
            ]
            -}
            []
        ] 
        
            
viewFooter : Material.Model msg -> Html msg
viewFooter mdc =
    styled div [Typography.typography][
    footer [class "footer"]
        [ div [ class "footer__content" ]
            [ a [ class "footer__logo", href "/" ] [ text "conduit" ]
            , span [ class "attribution" ]
                [ text "An interactive learning project from "
                , a [ href "https://thinkster.io" ] [ text "Thinkster" ]
                , text ". Code & design licensed under MI."
                ]
            ]
        ]
    ]
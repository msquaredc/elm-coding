module Page exposing (Page(..), view, viewHeader)

import Browser exposing (Document)
import Html exposing (Html, div, text )
import Material exposing (..)
import Material.TopAppBar as TopAppBar
import Material.Options as Options
import Data
import Page.Data


type Page
    = Error
    | Research
    | Data

type Msg
    = OpenDrawer

type alias Model msg =
    {mdc : Material.Model msg,
    title : String,
    body : List(Html msg),
    data : Data.Model}

view : Page -> Model msg -> (Material.Msg msg -> msg) -> Html msg
view page model msgadapt =
    div []
        ([ viewHeader model msgadapt,
           viewContent page model
        
--        , viewFooter
        ])


viewHeader : Model msg -> (Material.Msg msg -> msg) -> Html msg
viewHeader model mdc =
    TopAppBar.view mdc
        "my-top-app-bar"
        model.mdc
        [ TopAppBar.fixed ]
        [ TopAppBar.section [ TopAppBar.alignStart ]
            [ TopAppBar.navigationIcon mdc
                "my-menu"
                model.mdc
                [] -- [ Options.onClick OpenDrawer ]
                "menu"
            , TopAppBar.title [] [ text model.title ]
            ]
        , TopAppBar.section [ TopAppBar.alignEnd ]
{-           [ TopAppBar.actionItem [] "file_download"
            , TopAppBar.actionItem [] "print"
            , TopAppBar.actionItem [] "bookmark"
            ]
            -}
            []
        ] 
        
viewContent : Page -> Model msg -> Html msg   
viewContent page model =
    case page of
        Data ->
            Page.Data.view model.data
            
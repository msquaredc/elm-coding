module Page.Data exposing (Msg(..), view, Model)

import Browser exposing (Document)
import Data
import Material
import Material.LayoutGrid as LayoutGrid
import Material.Options exposing (styled)
import Html exposing (Html, h2, text,div)
import Material.Typography as Typography

type Msg m
    = GotDBMsg Data.Msg
    | Mdc (Material.Msg m)

type alias Model 
    = {}


view : Material.Model msg -> Data.Model ->  { title : String, content : Html (Msg msg) }
view mdc data =
    { title = "Data"
    , content = Html.map GotDBMsg (Data.view data)
    }

viewContent = 
    div [][
    styled Html.h3
        [ Typography.subtitle1 ]
        [ text "A title" ],
    LayoutGrid.view []
        [ LayoutGrid.cell
              [ LayoutGrid.span6
              , LayoutGrid.span8Tablet
              ]
              [text "Hello"]
        , LayoutGrid.cell
              [ LayoutGrid.span4
              , LayoutGrid.span6Tablet
              ]
              [text "World"]
        , LayoutGrid.cell
              [ LayoutGrid.span2
              , LayoutGrid.span4Phone
              ]
              [text "FooBar"]
        ]
    ]
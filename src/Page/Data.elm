module Page.Data exposing (Msg(..), view, Model, defaultModel,update)

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

type alias Model m
    = {mdc: Material.Model m}

defaultModel : Model m
defaultModel = {mdc = Material.defaultModel}

view : (Msg m -> m) -> Model m -> Data.Model -> Document m
view lift model data =
    { title = "Data"
    , body = [Html.map (lift << GotDBMsg) (Data.view data)]
    }

update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        GotDBMsg _ ->
            (model, Cmd.none)
            

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
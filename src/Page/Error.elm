module Page.Error exposing (Error(..), Model, Msg(..), defaultModel, update, view)

import Browser exposing (Document)
import Data
import Html exposing (Html, div, h2, text)
import Json.Decode as Decode
import Material


type Msg m
    = Mdc (Material.Msg m)


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model


type Error
    = DecodeError Decode.Error


type alias Model m =
    { error : List Error
    , mdc : Material.Model m
    }


defaultModel : Model m
defaultModel =
    { error = []
    , mdc = Material.defaultModel
    }


view : (Msg m -> m) -> Model m -> Data.Model -> Document m
view lift model _ =
    { title = "Error"
    , body =
        Html.h2 [] [ text "Error:" ] :: List.map viewError model.error
    }


viewError : Error -> Html m
viewError error =
    case error of
        DecodeError err ->
            text (Decode.errorToString err)

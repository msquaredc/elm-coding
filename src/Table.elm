module Table exposing (Model, Msg(..), update)

import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)


type Msg
    = Noop


type alias Model =
    { rows : Dict String String
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

module Entities.User exposing (Model, decoder, encoder)

import Db exposing (Db, Row)
import Dict exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode exposing (Value)


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "infos" (Decode.dict string)


type alias Model =
    { infos : Dict String String
    }


encoder : Model -> Value
encoder model =
    Encode.object
        [ ( "infos", Encode.dict identity Encode.string model.infos ) ]

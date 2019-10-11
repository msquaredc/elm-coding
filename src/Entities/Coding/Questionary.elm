module Entities.Coding.Questionary exposing (Model, decoder, encoder)

import Db exposing (Db, Row)
import Entities.Question as Question
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode exposing (Value)


type alias Model =
    { question : Id Question.Model }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "question" Id.decoder


encoder : Model -> Value
encoder model =
    Encode.object
        [ ( "question", Encode.string (Id.toString model.question) ) ]

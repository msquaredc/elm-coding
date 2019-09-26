module Entities.Coding.Questionary exposing (Model, decoder)

import Db exposing (Db, Row)
import Entities.Question as Question
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)


type alias Model =
    { question : Id Question.Model }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "question" Id.decoder

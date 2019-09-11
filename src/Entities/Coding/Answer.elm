module Entities.Coding.Answer exposing (Model, decoder)

import Db exposing (Db, Row)
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Question as Question
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)


type alias Model =
    { coding_question : Id CodingQuestion.Model
    , coding_frame : Id CodingFrame.Model
    , value : String
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "coding_question" Id.decoder
        |> required "coding_frame" Id.decoder
        |> required "value" string

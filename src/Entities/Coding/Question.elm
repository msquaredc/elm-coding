module Entities.Coding.Question exposing (Model, decoder)

import Db exposing (Db, Row)
import Entities.Coding.Questionary as CodingQuestionary
import Form exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)


type alias Model =
    { coding_questionary : Id CodingQuestionary.Model
    , text : String
    , input_type : Form.InputType
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "coding_questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder

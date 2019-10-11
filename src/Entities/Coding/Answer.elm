module Entities.Coding.Answer exposing (Model, decoder, encoder)

import Db exposing (Db, Row)
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Question as Question
import Entities.Timestamp as Timestamp
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (custom, hardcoded, optional, required)
import Json.Encode as Encode exposing (Value)


type alias Model =
    { coding_question : Id CodingQuestion.Model
    , coding_frame : Id CodingFrame.Model
    , value : String
    , timestamp : Timestamp.Model
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "coding_question" Id.decoder
        |> required "coding_frame" Id.decoder
        |> required "value" Decode.string
        |> custom Timestamp.decoder


encoder : Model -> Value
encoder model =
    Encode.object
        ([ ( "coding_question", Encode.string (Id.toString model.coding_question) )
         , ( "coding_frame", Encode.string (Id.toString model.coding_frame) )
         , ( "value", Encode.string model.value )
         ]
            ++ Timestamp.encoder model.timestamp
        )

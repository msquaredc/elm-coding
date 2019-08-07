module Data exposing
    ( Answer
    , Coder
    , Coding
    , CodingAnswer
    , CodingFrame
    , CodingQuestion
    , CodingQuestionary
    , Model
    , Msg
    , Question
    , Questionary
    , User
    , decoder
    , empty
    , init
    , update
    , view
    )

import Db exposing (Db, Row)
import Dict exposing (..)
import Form exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)



-- JSON-Representations
-- ...a record that directly corresponds to the JSON page data...


type alias Flags =
    { answers : Dict String Answer
    , coders : Dict String Coder
    , codings : Dict String Coding
    , coding_answers : Dict String CodingAnswer
    , coding_frames : Dict String CodingFrame
    , coding_questionaries : Dict String CodingQuestionary
    , coding_questions : Dict String CodingQuestion
    , name : String
    , questions : Dict String Question
    , questionaries : Dict String Questionary
    , users : Dict String User
    }



-- Decoders


decoder : Decode.Decoder Flags
decoder =
    Decode.succeed Flags
        |> optional "answers" (Decode.dict decoderAnswer) Dict.empty
        |> optional "coders" (Decode.dict decoderCoder) Dict.empty
        |> optional "codings" (Decode.dict decoderCoding) Dict.empty
        |> optional "coding_answers" (Decode.dict decoderCodingAnswers) Dict.empty
        |> optional "coding_frames" (Decode.dict decoderCodingFrame) Dict.empty
        |> optional "coding_questionaries" (Decode.dict decoderCodingQuestionary) Dict.empty
        |> optional "coding_questions" (Decode.dict decoderCodingQuestion) Dict.empty
        |> optional "name" string ""
        |> optional "question" (Decode.dict decoderQuestion) Dict.empty
        |> optional "questionaries" (Decode.dict decoderQuestionary) Dict.empty
        |> optional "users" (Decode.dict decoderUser) Dict.empty


decoderAnswer : Decode.Decoder Answer
decoderAnswer =
    Decode.succeed Answer
        |> required "question" Id.decoder
        |> required "user" Id.decoder
        |> optional "value" string ""


decoderCoder : Decode.Decoder Coder
decoderCoder =
    Decode.succeed Coder
        |> required "name" string


decoderCoding : Decode.Decoder Coding
decoderCoding =
    Decode.succeed Coding
        |> required "coder" Id.decoder


decoderCodingAnswers : Decode.Decoder CodingAnswer
decoderCodingAnswers =
    Decode.succeed CodingAnswer
        |> required "coding_question" Id.decoder
        |> required "coding_frame" Id.decoder
        |> required "value" string


decoderCodingFrame : Decode.Decoder CodingFrame
decoderCodingFrame =
    Decode.succeed CodingFrame
        |> required "answer" Id.decoder
        |> required "coding" Id.decoder
        |> required "index" int


decoderCodingQuestionary : Decode.Decoder CodingQuestionary
decoderCodingQuestionary =
    Decode.succeed CodingQuestionary
        |> required "question" Id.decoder


decoderCodingQuestion : Decode.Decoder CodingQuestion
decoderCodingQuestion =
    Decode.succeed CodingQuestion
        |> required "coding_questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder


decoderQuestion : Decode.Decoder Question
decoderQuestion =
    Decode.succeed Question
        |> required "questionary" Id.decoder


decoderQuestionary : Decode.Decoder Questionary
decoderQuestionary =
    Decode.succeed Questionary
        |> required "name" string


decoderUser : Decode.Decoder User
decoderUser =
    Decode.succeed User
        |> required "infos" (Decode.dict string)



-- Data Structure


type alias Model =
    { answers : Db Answer
    , coders : Db Coder
    , codings : Db Coding
    , coding_answers : Db CodingAnswer
    , coding_frames : Db CodingFrame
    , coding_questionaries : Db CodingQuestionary
    , coding_questions : Db CodingQuestion
    , name : String
    , question : Db Question
    , questionaries : Db Questionary
    , users : Db User
    }


type alias Answer =
    { question : Id Question
    , user : Id User
    , value : String
    }


type alias Coder =
    { name : String
    }


type alias Coding =
    { coder : Id Coder
    }


type alias CodingAnswer =
    { coding_question : Id CodingQuestion
    , coding_frame : Id CodingFrame
    , value : String
    }


type alias CodingFrame =
    { answer : Id Answer
    , coding : Id Coding
    , index : Int
    }


type alias CodingQuestionary =
    { question : Id Question }


type alias CodingQuestion =
    { coding_questionary : Id CodingQuestionary
    , text : String
    , input_type : Form.InputType
    }


type alias Question =
    { questionary : Id Questionary }


type alias Questionary =
    { name : String
    }


type alias User =
    { infos : Dict String String
    }



-- Inits


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        model =
            Model
                (initDictToDb flags.answers)
                (initDictToDb flags.coders)
                (initDictToDb flags.codings)
                (initDictToDb flags.coding_answers)
                (initDictToDb flags.coding_frames)
                (initDictToDb flags.coding_questionaries)
                (initDictToDb flags.coding_questions)
                flags.name
                (initDictToDb flags.questions)
                (initDictToDb flags.questionaries)
                (initDictToDb flags.users)
    in
    ( model, Cmd.none )


initDictToDb : Dict String item -> Db item
initDictToDb values =
    values
        |> Dict.toList
        |> List.map (\( key, value ) -> ( Id.fromString key, value ))
        |> Db.fromList


empty : String -> Model
empty str =
    { answers = Db.empty
    , coders = Db.empty
    , codings = Db.empty
    , coding_answers = Db.empty
    , coding_frames = Db.empty
    , coding_questionaries = Db.empty
    , coding_questions = Db.empty
    , name = str
    , question = Db.empty
    , questionaries = Db.empty
    , users = Db.empty
    }



-- Messages
--... variants for each possible message ...


type Msg
    = Change



-- Updates


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Change ->
            ( model, Cmd.none )



-- Views


view : Model -> Html Msg
view model =
    div []
        [ div [] (List.map viewAnswer (Db.toList model.answers))
        , div [] (List.map viewCoder (Db.toList model.coders))
        , text ("Name: " ++ model.name)
        ]


viewAnswer : ( Id Answer, Answer ) -> Html Msg
viewAnswer ( id, answer ) =
    div []
        [ h3 [] [ text ("Answer: " ++ Id.toString id) ]
        , p [] [ text ("Question: " ++ Id.toString answer.question) ]
        , p [] [ text ("User: " ++ Id.toString answer.user) ]
        , p [] [ text ("Value: " ++ answer.value) ]
        ]


viewCoder : ( Id Coder, Coder ) -> Html Msg
viewCoder ( id, coder ) =
    div []
        [ h3 [] [ text ("Coder: " ++ Id.toString id) ]
        , p [] [ text ("Name: " ++ coder.name) ]
        ]

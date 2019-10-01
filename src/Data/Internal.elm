module Data.Internal exposing (..)

import Db exposing (Db, Row)
import Id exposing (Id)
import Json.Decode as Decode
import Entities.Answer as Answer
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Coding.Answer as CodingAnswer
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Coding.Questionary as CodingQuestionary
import Entities.Question as Question
import Entities.Questionary as Questionary
import Entities.User as User
import Entities.Timestamp as Timestamp
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Dict exposing (Dict)

type Msg
    = Noop

type Object 
    = Answer
    | Coder
    | Coding
    | CodingFrame
    | CodingQuestion
    | CodingQuestionary
    | CodingAnswer
    | Question
    | Questionary
    | User

type ObjectDb
    = AnswerDb (Db Answer.Model)
    | CoderDb (Db Coder.Model)
    | CodingDb (Db Coding.Model)
    | CodingFrameDb (Db CodingFrame.Model)
    | CodingAnswerDb (Db CodingAnswer.Model)
    | UserDb (Db User.Model)
    | QuestionDb (Db Question.Model)
    | QuestionaryDb (Db Questionary.Model)
    | CodingQuestionDb (Db CodingQuestion.Model)
    | CodingQuestionaryDb (Db CodingQuestionary.Model)

type Direction
    = Next
    | Previous 

type alias Flags =
    { answers : Dict String Answer.Model
    , coders : Dict String Coder.Model
    , codings : Dict String Coding.Model
    , coding_answers : Dict String CodingAnswer.Model
    , coding_frames : Dict String CodingFrame.Model
    , coding_questionaries : Dict String CodingQuestionary.Model
    , coding_questions : Dict String CodingQuestion.Model
    , name : String
    , questions : Dict String Question.Model
    , questionaries : Dict String Questionary.Model
    , users : Dict String User.Model
    }



-- Decoders


decoder : Decode.Decoder Flags
decoder =
    Decode.succeed Flags
        |> optional "answers" (Decode.dict Answer.decoder) Dict.empty
        |> optional "coders" (Decode.dict Coder.decoder) Dict.empty
        |> optional "codings" (Decode.dict Coding.decoder) Dict.empty
        |> optional "coding_answers" (Decode.dict CodingAnswer.decoder) Dict.empty
        |> optional "coding_frames" (Decode.dict CodingFrame.decoder) Dict.empty
        |> optional "coding_questionaries" (Decode.dict CodingQuestionary.decoder) Dict.empty
        |> optional "coding_questions" (Decode.dict CodingQuestion.decoder) Dict.empty
        |> optional "name" string ""
        |> optional "questions" (Decode.dict Question.decoder) Dict.empty
        |> optional "questionaries" (Decode.dict Questionary.decoder) Dict.empty
        |> optional "users" (Decode.dict User.decoder) Dict.empty




-- Data Structure


type alias Model =
    { answers : Db Answer.Model
    , coders : Db Coder.Model
    , codings : Db Coding.Model
    , coding_answers : Db CodingAnswer.Model
    , coding_frames : Db CodingFrame.Model
    , coding_questionaries : Db CodingQuestionary.Model
    , coding_questions : Db CodingQuestion.Model
    , name : String
    , questions : Db Question.Model
    , questionaries : Db Questionary.Model
    , users : Db User.Model
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


empty : Model
empty =
    { answers = Db.empty
    , coders = Db.empty
    , codings = Db.empty
    , coding_answers = Db.empty
    , coding_frames = Db.empty
    , coding_questionaries = Db.empty
    , coding_questions = Db.empty
    , name = ""
    , questions = Db.empty
    , questionaries = Db.empty
    , users = Db.empty
    }

{- type DataMegaType
    coder 
    coding 
    coding_frame 
    coding_answer 
    coding_question 
    coding_questionary 
    question 
    questionary 
    answer 
    user
    = CoderType coder
    | CodingType coding
    | CodingAnswerType coding_answer
    | CodingFrameType coding_frame
    | CodingQuestionType coding_question
    | CodingQuestionaryType coding_questionary
    | QuestionType question
    | QuestionaryType questionary
    | AnswerType answer
    | UserType user



type alias DMT = DataMegaType 
                    (Coder.Model)
                    (Coding.Model)
                    (CodingFrame.Model)
                    (CodingAnswer.Model)
                    (CodingQuestion.Model)
                    (CodingQuestionary.Model)
                    (Question.Model)
                    (Questionary.Model)
                    (Answer.Model)
                    (User.Model)

type alias DbDMT = DataMegaType 
                    (Db Coder.Model)
                    (Db Coding.Model)
                    (Db CodingFrame.Model)
                    (Db CodingAnswer.Model)
                    (Db CodingQuestion.Model)
                    (Db CodingQuestionary.Model)
                    (Db Question.Model)
                    (Db Questionary.Model)
                    (Db Answer.Model)
                    (Db User.Model)

type alias IdDMT = DataMegaType 
                    (Id Coder.Model)
                    (Id Coding.Model)
                    (Id CodingFrame.Model)
                    (Id CodingAnswer.Model)
                    (Id CodingQuestion.Model)
                    (Id CodingQuestionary.Model)
                    (Id Question.Model)
                    (Id Questionary.Model)
                    (Id Answer.Model)
                    (Id User.Model)

mappers : DMT -> DMT -> Maybe (IdDMT)
mappers source target =
    case (source, target) of
        (CoderType _, _) -> 
            Nothing

        (CodingType coding, CoderType _) ->
            Just (CoderType coding.coder)
    
        (CodingType _, _) ->
            Nothing
        
        (CodingFrameType frame, CodingType _) ->
            Just (CodingType frame.coding)
        
        (CodingFrameType frame, AnswerType _) ->
            Just (AnswerType frame.answer)
        
        (CodingFrameType _, _) ->
            Nothing
        
        (CodingAnswerType answer, CodingFrameType _) ->
            Just (CodingFrameType answer.coding_frame)
        
        (CodingAnswerType answer, CodingQuestionType _)->
            Just (CodingQuestionType answer.coding_question)
        
        (CodingAnswerType _, _) ->
            Nothing

        (CodingQuestionType question, CodingQuestionaryType _) ->
            Just (CodingQuestionaryType question.coding_questionary)

        (CodingQuestionType _, _) -> 
            Nothing
        
        (CodingQuestionaryType questionary, QuestionType _) ->
            Just (QuestionType questionary.question)

        (CodingQuestionaryType _, _) ->
            Nothing

        (QuestionType question, QuestionaryType _) ->
            Just (QuestionaryType question.questionary)
        
        (QuestionType _, _) ->
            Nothing
        
        (QuestionaryType _, _) ->
            Nothing
        
        (AnswerType answer, UserType _) ->
            Just (UserType answer.user)
        
        (AnswerType answer, QuestionType _) ->
            Just (QuestionType answer.question)
        
        (AnswerType _, _) ->
            Nothing
        
        (UserType _, _) ->
            Nothing
        


accessors : I.Model -> DMT -> DbDMT
accessors model object_type = 
    case object_type of
        CoderType _ ->
            CoderType model.coders
        CodingType _ ->
            CodingType model.codings
        CodingFrameType _ ->
            CodingFrameType model.coding_frames
        CodingAnswerType _ ->
            CodingAnswerType model.coding_answers
        CodingQuestionType _ ->
            CodingQuestionType model.coding_questions
        CodingQuestionaryType _ ->
            CodingQuestionaryType model.coding_questionaries
        QuestionType _ ->
            QuestionType model.questions
        QuestionaryType _ ->
            QuestionaryType model.questionaries
        AnswerType _ ->
            AnswerType model.answers
        UserType _ ->
            UserType model.users

getValue dmt =
    case dmt of
        CoderType value ->
            value
        CodingType value ->
            value
        QuestionType value ->
            value
            

move : I.Model -> DbDMT -> DMT -> Maybe DbDMT
move model source target =
    let
        first = Db.toList (getValue source)
                |> Maybe.map accessors
    in
        first

route : I.Model -> DbDMT -> DbDMT -> DbDMT
route model source dest = 
    case (source, dest) of 
        (CoderType _, CoderType _) -> 
            source
        (CoderType _, _) ->
            source -}
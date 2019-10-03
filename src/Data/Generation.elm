module Data.Generation exposing (..)

import Data.Internal as I
import Data.Access as A
import Data.Navigation as Nav
import Db exposing (Row)
import Entities.Coding.Question as CodingQuestion
import Entities.Coding.Answer as CodingAnswer
import Entities.Coding.Frame as CodingFrame
import Entities.Coding as Coding
import Entities.Timestamp as Timestamp
import Random
import Id exposing (Id)

type Msg
    = NoOp
    | Message

{- generateCodingFrame : I.Model -> Row CodingFrame.Model -> (I.Model, Cmd Msg)
generateCodingFrame model coding_frame = 
    (model, Cmd.none) -}

row : a -> Random.Generator (Row a)
row element = 
    Random.map (\id -> (id,element)) Id.generator

                

coding_frame : I.Model -> Row Coding.Model -> Maybe (Random.Generator CodingFrame.Model)
coding_frame model (cid,coding) =
    let
        current_question = A.current_question model (cid,coding)
        missing_answers = A.missing_answers model (cid,coding)
        missing_questions = A.missing_questions model (cid,coding)
    in
        case (current_question, missing_answers, Maybe.andThen (List.head) missing_answers) of
            (Just (qid,question), Just answers, Just head) ->
                Just (Random.map
                    (\(aid,answer) -> 
                        (CodingFrame.Model aid cid Timestamp.empty))
                    (Random.uniform head (Maybe.withDefault [](List.tail answers))))
            _ ->
                let
                    new_question = missing_questions
                                    |> List.head
                    new_answers = new_question
                                  |> Maybe.map (\x -> Db.fromList [x])
                                  |> Maybe.map (Nav.question2answer model)
                                  |> Maybe.map (Db.toList)
                in
                    case (new_question, new_answers, Maybe.andThen (List.head) new_answers) of
                        (Just question, Just answers, Just head) ->
                            Just (Random.map
                                (\(aid,answer) -> 
                                    (CodingFrame.Model aid cid Timestamp.empty))
                                (Random.uniform head (Maybe.withDefault [](List.tail answers))))
                        _ -> Nothing



row_coding_frame : I.Model -> Row Coding.Model -> Maybe (Random.Generator (Row CodingFrame.Model))
row_coding_frame model coding =
    (coding_frame model coding)
    |> Maybe.map (Random.andThen row)

coding_answer : Row CodingFrame.Model -> Row CodingQuestion.Model -> Random.Generator (Row CodingAnswer.Model)
coding_answer (fid,_) (qid,_) =
    row (CodingAnswer.Model qid fid "" Timestamp.empty)

missing_codingAnswers : I.Model -> Row Coding.Model -> Row CodingFrame.Model -> List (Random.Generator (Row CodingAnswer.Model))
missing_codingAnswers model coding cf = 
    let
        missing_questions = A.missing_coding_questions model coding cf
                              
    in
        Debug.log "generation mapper coding answers"
        missing_questions
        |> List.map (\(qid) -> (coding_answer cf qid))

{- full_coding_frame : I.Model -> Row Coding.Model -> Maybe (Random.Generator (Row CodingFrame.Model, List(Row CodingAnswer.Model)))
full_coding_frame model coding = 
    let
        generated_coding_frame = row_coding_frame model coding
    in
        case generated_coding_frame of
            Nothing ->
                Nothing
            Just generator ->
                generator
                |> Random.andThen (missing_codingAnswers model coding)
                |> (\x -> Just (generator, x)) -}
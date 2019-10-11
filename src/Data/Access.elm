module Data.Access exposing (..)

import Data.Internal as I
import Data.Navigation as Nav
import Db exposing (Row,Db)
import Db.Extra
import List.Extra
import Entities.Answer as Answer
import Entities.Coding as Coding
import Entities.Question as Question
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Timestamp as Timestamp
import Entities.Coding.Answer as CodingAnswer
import Entities.Coder as Coder 


current_question : I.Model -> Row Coding.Model -> Maybe (Row Question.Model)
current_question model coding =
    current_codingFrame model coding
    |> Maybe.map (\x -> Db.fromList [x] )
    |> Maybe.map (Nav.coding_frame2question model)
    |> Maybe.map (Db.toList)
    |> Maybe.andThen (List.head)

next_missing_question_answer_tuple : I.Model -> Row Coding.Model -> Maybe((Row Question.Model, Row Answer.Model))
next_missing_question_answer_tuple model coding =
    let
        mb_question = current_question model coding
        mb_answer = next_missing_answer model coding
        rest_questions = missing_questions model coding
    in
        case (mb_question,mb_answer) of
            (Just question, Just answer)->
                Just (question, answer)
        
            _ ->
                case List.head rest_questions of
                    Just question ->
                        Nav.question2answer model (Db.fromList [question])
                        |> Db.toList
                        |> List.head
                        |> Maybe.map (\x-> (question,x))
                
                    Nothing -> 
                        Nothing

is_done4current_question : I.Model -> Row Coding.Model -> Bool
is_done4current_question model coding = 
    case Maybe.map List.length (missing_answers model coding) of
        Nothing ->
            True
        Just 0 ->
            True
        _ -> 
            False
                             


present_questions : I.Model -> Row Coding.Model -> List (Row Question.Model)
present_questions model coding = 
    Db.fromList [coding]
    |> Nav.coding2coding_frame model
    |> Nav.coding_frame2answer model
    |> Nav.answer2question model
    |> Db.toList

missing_answers : I.Model -> Row Coding.Model -> Maybe (List (Row Answer.Model))
missing_answers model coding =
    let
        all_present_answers = Nav.coding2answer model (Db.fromList [coding])
        question_answers =  current_question model coding
                            |> Maybe.map (\x -> Db.fromList [x])
                            |> Maybe.map (Nav.question2answer model)
    in
        Maybe.map (\x -> Db.Extra.difference x all_present_answers) question_answers
        |> Maybe.map (Db.toList)

next_missing_answer : I.Model -> Row Coding.Model -> Maybe(Row Answer.Model)
next_missing_answer model coding = 
    missing_answers model coding
    |> Maybe.andThen (List.head)

missing_questions : I.Model -> Row Coding.Model -> List (Row Question.Model)
missing_questions model coding =
    let
        present = present_questions model coding
                  |> Db.fromList
        all = Db.fromList [coding]
              |> Nav.coding2question model
    in
        Db.Extra.difference present all
        |> Db.toList


current_codingFrame : I.Model -> Row Coding.Model -> Maybe (Row CodingFrame.Model)
current_codingFrame model coding = 
    Nav.coding2coding_frame model (Db.fromList [coding])
    |> recent_access 


current_codingFrame_index : I.Model -> Row Coding.Model -> Maybe (Int)
current_codingFrame_index model coding =
    current_codingFrame model coding
    |> Maybe.andThen (\x -> List.Extra.elemIndex x (sorted_codingFrames model coding))


previous_codingFrame_index : I.Model -> Row Coding.Model -> Maybe (Int)
previous_codingFrame_index model coding =
    current_codingFrame_index model coding
    |> Maybe.map (\x -> x - 1)


previous_codingFrame : I.Model -> Row Coding.Model -> Maybe (Row CodingFrame.Model)
previous_codingFrame model coding =
    previous_codingFrame_index model coding
    |> Maybe.andThen (\x -> List.Extra.getAt x (sorted_codingFrames model coding))


next_codingFrame_index : I.Model -> Row Coding.Model -> Maybe (Int)
next_codingFrame_index model coding =
    current_codingFrame_index model coding
    |> Maybe.map (\x -> x + 1)


next_codingFrame : I.Model -> Row Coding.Model -> Maybe (Row CodingFrame.Model)
next_codingFrame model coding =
    next_codingFrame_index model coding
    |> Maybe.andThen (\x -> List.Extra.getAt x (sorted_codingFrames model coding))


sorted_codingFrames : I.Model -> Row Coding.Model -> List (Row CodingFrame.Model)
sorted_codingFrames model coding =
    Db.fromList [coding]
    |> Nav.coding2coding_frame model 
    |> Db.toList
    |> List.sortBy (\(_,m) -> m.timestamp.created)


recent_access : Db {a|timestamp : Timestamp.Model} -> Maybe ( Row {a|timestamp : Timestamp.Model})
recent_access all_candidates =
    all_candidates
    |> Db.toList
    |> List.Extra.maximumBy (\(id,m) -> m.timestamp.accessed)

has_next_coding_frame : I.Model -> Row Coding.Model -> Bool
has_next_coding_frame model coding = 
    Debug.log "CodingFrame" 
    ((Maybe.withDefault 0 (current_codingFrame_index model coding))  < (max_coding_frame_index model coding))
    
     

has_previous_coding_frame : I.Model -> Row Coding.Model -> Bool
has_previous_coding_frame model coding =
    case current_codingFrame_index model coding of
        Just 0 ->
            False
        Nothing ->
            False
        Just _ ->
            True

has_previous_question : I.Model -> Row Coding.Model -> Bool
has_previous_question model coding = 
    Debug.todo "" False

present_coding_questions : I.Model -> Row CodingFrame.Model -> List (Row CodingQuestion.Model)
present_coding_questions model coding_frame =
    Debug.log "present2"(
    coding_frame
    |>(\x -> [x])
    |> Db.fromList
    |> Nav.coding_frame2coding_answer model
    |> Nav.coding_answer2coding_question model
    |> Db.toList)

missing_coding_questions : I.Model -> Row Coding.Model-> Row CodingFrame.Model -> List (Row CodingQuestion.Model)
missing_coding_questions model coding cf = 
    let
        present = present_coding_questions model cf
                  |> Db.fromList
        all = cf
              |> (\x-> [x])
              |> (Db.fromList)
              |> (Nav.coding_frame2coding_question model)
    in
        Db.Extra.difference all present
        |> Db.toList

max_coding_frame_index : I.Model -> Row Coding.Model -> Int
max_coding_frame_index model coding = 
    Nav.coding2questionary model (Db.fromList [coding])
            |> Nav.questionary2question model
            |> Nav.question2answer model
            |> Db.toList
            |> List.length
            |> (\x -> ((-) x 1))
        
current_codingAnswers : I.Model -> Row Coding.Model -> List (Row CodingAnswer.Model)
current_codingAnswers model coding =
    let
        coding_questions = current_codingQuestions model coding
        current_coding_frame = current_codingFrame model coding
    in
        case (current_coding_frame) of
            (Just coding_frame) ->
                let
                    filtered_answers = filter_codingAnswer_by_codingFrame coding_frame model.coding_answers
                in
                    coding_questions
                    |> List.map (\x -> (filter_codingAnswer_by_codingQuestion x filtered_answers))
                    |> List.map (Db.toList)
                    |> List.filterMap (List.Extra.maximumBy (\(id,coding_answer) -> coding_answer.timestamp.accessed))
            (_) ->
                []


filter_codingAnswer_by_codingFrame :  Row CodingFrame.Model -> Db CodingAnswer.Model -> (Db CodingAnswer.Model)
filter_codingAnswer_by_codingFrame (cfid,frame) answers =
    Db.filter (\(aid, amodel) -> amodel.coding_frame == cfid) answers

filter_codingAnswer_by_codingQuestion :  Row CodingQuestion.Model -> Db CodingAnswer.Model -> (Db CodingAnswer.Model)
filter_codingAnswer_by_codingQuestion (cqid,question) answers =
    Db.filter (\(aid, amodel) -> amodel.coding_question == cqid) answers


current_codingQuestions : I.Model -> Row Coding.Model -> (List (Row CodingQuestion.Model))
current_codingQuestions model coding =
    case (current_codingFrame model coding) of 
        Nothing ->
            []
        Just frame ->
            Nav.coding_frame2answer model (Db.fromList [frame])
            |> Nav.answer2question model 
            |> Nav.question2coding_questionary model 
            |> Nav.coding_questionary2coding_question model
            |> Db.toList

current_coder : I.Model -> Row Coding.Model -> Maybe (Row Coder.Model)
current_coder model coding = 
    Nav.coding2coder model (Db.fromList [coding])
    |> Db.toList
    |> List.head
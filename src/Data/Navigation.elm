module Data.Navigation exposing (..)

import Data.Internal as I exposing (Object (..), ObjectDb(..))
import Db exposing (Db)
import Id exposing (Id)

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
import Db.Extra
import Graph exposing (Node, Edge,Graph)

{- type ResolveOrder
    = Left
    | Right

resolveNext : ResolveOrder -> ObjectDb -> Maybe Object
resolveNext order cur =
    case (order,cur) of
        (_, CoderDb _) -> 
            Nothing
        (_, UserDb _) -> 
            Nothing
        (_, CodingDb _) -> 
            Nothing
        (_, QuestionaryDb _) -> 
            Nothing
        (Left, CodingFrameDb _) ->
            Just CodingAnswer
        (Right, CodingFrameDb _) ->
            Just Answer
        (Left, AnswerDb _) ->
            Just CodingFrame
        (Right, AnswerDb _) ->
            Just Question
        (Left, QuestionDb _) ->
            Just Answer
        (Right, QuestionDb _) ->
            Just CodingQuestionary
        (Left, CodingQuestionDb _) ->
            Just CodingQuestionary
        (Right, CodingQuestionDb _) ->
            Just CodingAnswer
        (Left, CodingQuestionaryDb _) ->
            Just Question
        (Right, CodingQuestionaryDb _) ->
            Just CodingQuestion
        (Left, CodingAnswerDb _) ->
            Just CodingQuestion
        (Right, CodingAnswerDb _) ->
            Just CodingFrame


route : I.Model -> ObjectDb -> Maybe (ResolveOrder) -> Object -> ObjectDb
route model wrapped_source via dest =
    case (wrapped_source, dest) of
        --Coder
        (CoderDb coder, Coder ) ->
            wrapped_source
        (CoderDb coder, _) -> 
            route model (coder2coding model coder) via dest

        --User
        (UserDb _, User)->
            wrapped_source
        
        (UserDb user, _)->
            route model (user2answer model user) via dest

        (QuestionDb _, Question) ->
            wrapped_source
        
        --Questionary
        (QuestionaryDb _,Questionary)->
            wrapped_source
        (QuestionaryDb questionary, _) ->
            route model (questionary2question model questionary) via dest
        
        --Answer
        (AnswerDb _, Answer)->
            wrapped_source
        
        --Coding
        (CodingDb _, Coding) ->
            wrapped_source
        (CodingDb coding, Coder) ->
            route model (coding2coder model coding) via dest
        (CodingDb coding, _) ->
            route model (coding2coding_frame model coding) via dest
        
        --Coding Frame
        (CodingFrameDb _, CodingFrame) ->
            wrapped_source

        --Coding Answer
        (CodingAnswerDb _, CodingAnswer) ->
            wrapped_source

        (CodingFrameDb frame, CodingAnswer) ->
            case via of 
                Nothing -> 
                    let
                        left = route2coding_answer model wrapped_source (Just Left)
                        right = route2coding_answer model wrapped_source (Just Right)
                    in
                        CodingAnswerDb (Db.Extra.intersection left right)
                Just ro ->
                    case resolveNext ro wrapped_source of
                        Nothing ->
                            CodingAnswerDb (Db.empty)
                    
                        Just next ->
                            direct model wrapped_source next
                            |> Maybe.withDefault (CodingAnswerDb (Db.empty))
                            |> (\x -> route model x via dest)
                                
route_circle : I.Model -> ObjectDb -> Maybe(ResolveOrder) -> (I.Model -> ObjectDb -> Maybe (ResolveOrder) -> (Db a)) -> (Db a -> ObjectDb) -> ObjectDb
route_circle model wrapped_source via route2object toObjectDb = 
    case via of 
        Nothing -> 
            let
                left = route2object model wrapped_source (Just Left)
                right = route2object model wrapped_source (Just Right)
            in
                toObjectDb (Db.Extra.intersection left right)
        Just ro ->
            case resolveNext ro wrapped_source of
                Nothing ->
                    toObjectDb (Db.empty)
            
                Just next ->
                    case direct model wrapped_source next of
                        Just result ->
                            result
                        Nothing ->
                            toObjectDb (Db.empty)


direct : I.Model -> ObjectDb -> Object -> Maybe (ObjectDb)
direct model wrapped_source dest =
    case (wrapped_source, dest) of
        (CoderDb db, Coding) ->
            Just (CodingDb (coder2coding model db))
        (CodingDb db, Coder) ->
            Just (CoderDb (coding2coder model db))
        (CodingDb db, CodingFrame) ->
            Just (coding2coding_frame model db)
        (CodingFrameDb db, Coding) ->
            Just (coding_frame2coding model db)
        (CodingFrameDb db, Answer) ->
            Just (coding_frame2answer model db)
        (CodingFrameDb db, CodingAnswer) ->
            Just (coding_frame2coding_answer model db)
        (AnswerDb db, User) ->
            Just (answer2user model db)
        (AnswerDb db, CodingFrame) ->
            Just (answer2coding_frame model db)
        (AnswerDb db, Question) ->
            Just (answer2question model db)
        (UserDb db, Answer) -> 
            Just (user2answer model db)
        (CodingAnswerDb db, CodingFrame) ->
            Just (coding_answer2coding_frame model db)
        (CodingAnswerDb db, CodingQuestion) ->
            Just (coding_answer2coding_question model db)
        (CodingQuestionDb db, CodingAnswer) ->
            Just (coding_question2coding_answer model db)
        (CodingQuestionDb db, CodingQuestionary) ->
            Just (coding_question2coding_questionary model db)
        (QuestionDb db, CodingQuestionary) ->
            Just (question2coding_questionary model db)
        (QuestionDb db, Questionary) ->
            Just (question2questionary model db)
        (QuestionDb db, Answer) ->
            Just (question2answer model db)   
        (QuestionaryDb db, Question) ->
            Just (questionary2question model db)   
        (CodingQuestionaryDb db, Question) ->
            Just (coding_questionary2question model db)  
        (CodingQuestionaryDb db, CodingQuestion) ->
            Just (coding_questionary2coding_question model db)
        (_,_) -> 
            Nothing

route2coding_answer : I.Model -> ObjectDb -> Maybe (ResolveOrder) -> (Db CodingAnswer.Model)
route2coding_answer model wrapped_source via =
    case route model wrapped_source via CodingAnswer of
        CodingAnswerDb res -> 
            res
        _ -> 
            Db.empty -}

-- Answer
answer2user : {a|users: Db User.Model} -> Db Answer.Model -> Db User.Model
answer2user model answer = 
    Db.Extra.getDB model.users (\c -> c.user) answer

answer2coding_frame : {a|coding_frames: Db CodingFrame.Model} -> Db Answer.Model -> Db CodingFrame.Model
answer2coding_frame model answer =
    Db.Extra.selectFrom model.coding_frames (\c -> c.answer) answer

answer2question : {a|questions: Db Question.Model} -> Db Answer.Model -> Db Question.Model
answer2question model answer =
    Db.Extra.getDB model.questions (\c -> c.question) answer

-- Coding Frame
coding_frame2coding : {a|codings : Db Coding.Model} -> Db CodingFrame.Model -> Db Coding.Model
coding_frame2coding model coding_frame =
    Db.Extra.getDB model.codings (\c -> c.coding) coding_frame

coding_frame2coding_answer : {a|coding_answers: Db CodingAnswer.Model} -> Db CodingFrame.Model -> Db CodingAnswer.Model
coding_frame2coding_answer model coding_frame =
    Db.Extra.selectFrom model.coding_answers (\c -> c.coding_frame) coding_frame

coding_frame2answer : {a|answers : Db Answer.Model} -> Db CodingFrame.Model -> Db Answer.Model
coding_frame2answer model coding_frame =
    Db.Extra.getDB model.answers (\c -> c.answer) coding_frame

-- Coding Answer
coding_answer2coding_frame : {a|coding_frames : Db CodingFrame.Model} -> Db CodingAnswer.Model -> Db CodingFrame.Model
coding_answer2coding_frame model coding_answer =
    Db.Extra.getDB model.coding_frames (\c -> c.coding_frame) coding_answer

coding_answer2coding_question : {a|coding_questions : Db CodingQuestion.Model} -> Db CodingAnswer.Model -> Db CodingQuestion.Model
coding_answer2coding_question model coding_answer =
    Db.Extra.getDB model.coding_questions (\c -> c.coding_question) coding_answer

-- User
user2answer : {a|answers: Db Answer.Model} -> Db User.Model -> Db Answer.Model
user2answer model user =
    Db.Extra.selectFrom model.answers (\c -> c.user) user

-- Coding Question
coding_question2coding_answer : {a|coding_answers : Db CodingAnswer.Model} -> Db CodingQuestion.Model -> Db CodingAnswer.Model
coding_question2coding_answer model coding_question =
    Db.Extra.selectFrom model.coding_answers (\c -> c.coding_question) coding_question

coding_question2coding_questionary : {a|coding_questionaries : Db CodingQuestionary.Model} -> Db CodingQuestion.Model -> Db CodingQuestionary.Model
coding_question2coding_questionary model coding_questionary =
    Db.Extra.getDB model.coding_questionaries (\c -> c.coding_questionary) coding_questionary

-- Coding Questionary
coding_questionary2coding_question : {a|coding_questions : Db CodingQuestion.Model} -> Db CodingQuestionary.Model -> Db CodingQuestion.Model
coding_questionary2coding_question model coding_questionary =
    Db.Extra.selectFrom model.coding_questions (\c -> c.coding_questionary) coding_questionary

coding_questionary2question : {a|questions : Db Question.Model} -> Db CodingQuestionary.Model -> Db Question.Model
coding_questionary2question model coding_questionary =
    Db.Extra.getDB model.questions (\c -> c.question) coding_questionary

-- Questionary
questionary2question : {a|questions: Db Question.Model} -> Db Questionary.Model -> Db Question.Model
questionary2question model questionary =
    Db.Extra.selectFrom model.questions (\c -> c.questionary) questionary

-- Coder
coder2coding : {a|codings: Db Coding.Model} -> Db Coder.Model -> Db Coding.Model
coder2coding model coder =
    Db.Extra.selectFrom model.codings (\c -> c.coder) coder

-- Coding
coding2coder : {a|coders: Db Coder.Model} -> Db Coding.Model -> Db Coder.Model
coding2coder model coding =
    Db.Extra.getDB model.coders (\c -> c.coder) coding

coding2coding_frame : {a|coding_frames : Db CodingFrame.Model} -> Db Coding.Model -> Db CodingFrame.Model
coding2coding_frame model coding =
    Db.Extra.selectFrom model.coding_frames (\c -> c.coding) coding

-- Question
question2answer : {a|answers : Db Answer.Model} -> Db Question.Model -> Db Answer.Model
question2answer model answer = 
    Db.Extra.selectFrom model.answers (\c -> c.question) answer

question2questionary : {a|questionaries : Db Questionary.Model} -> Db Question.Model -> Db Questionary.Model
question2questionary model question =
    Db.Extra.getDB model.questionaries (\c -> c.questionary) question

question2coding_questionary : {a|coding_questionaries : Db CodingQuestionary.Model} -> Db Question.Model -> Db CodingQuestionary.Model
question2coding_questionary model question =
    Db.Extra.selectFrom model.coding_questionaries (\c -> c.question) question

-- Multihop
coding_frame2question : I.Model -> Db CodingFrame.Model -> Db Question.Model
coding_frame2question model coding_frame = 
    let
        left = coding_frame2answer model coding_frame
                |> answer2question model
        right = coding_frame2coding_answer model coding_frame
                |> coding_answer2coding_question model
                |> coding_question2coding_questionary model
                |> coding_questionary2question model
    in
        Db.Extra.union left right

coding2question : I.Model -> Db Coding.Model -> Db Question.Model
coding2question model coding =
    coding2coding_frame model coding
    |> coding_frame2question model

coding2questionary : I.Model -> Db Coding.Model -> Db Questionary.Model
coding2questionary model coding = 
    coding2coding_frame model coding
    |> coding_frame2question model 
    |> question2questionary model

questionary2answer : I.Model -> Db Questionary.Model -> Db Answer.Model
questionary2answer model questionary =
    questionary2question model questionary
    |> question2answer model

question2coding_frame : I.Model -> Db Question.Model -> Db CodingFrame.Model
question2coding_frame model question =
    let
        left = question2answer model question
               |> answer2coding_frame model
        right = question2coding_questionary model question
                |> coding_questionary2coding_question model
                |> coding_question2coding_answer model
                |> coding_answer2coding_frame model
    in
        Db.Extra.union left right

coding2answer : I.Model -> Db Coding.Model -> Db Answer.Model
coding2answer model coding =
    coding2coding_frame model coding
    |> coding_frame2answer model

coding_frame2coding_question : I.Model -> Db CodingFrame.Model -> Db CodingQuestion.Model
coding_frame2coding_question model coding_frame = 
    let
        left = coding_frame2answer model coding_frame
                |> answer2question model
                |> question2coding_questionary model
                |> coding_questionary2coding_question model
        right = coding_frame2coding_answer model coding_frame
                |> coding_answer2coding_question model
    in
        Db.Extra.union left right
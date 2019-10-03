module Data.Validation exposing (..)

import Data.Internal as I
import Data.Navigation as Nav
import Db exposing (Row, Db)

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

is_valid_db : Db a -> Bool
is_valid_db db = 
    db
    |> Db.toList
    |> List.isEmpty
    |> not

validator : I.Model -> Row a -> (I.Model -> Db a -> Db b) -> Maybe (I.Model -> Row b -> Bool) -> Bool
validator model object mapper validate = 
    Db.fromList[object]
    |> mapper model
    |> Db.filter ((Maybe.withDefault (\_ _ -> True) validate) model)
    |> is_valid_db

is_coding_questionary4coding : I.Model -> Row CodingQuestionary.Model -> Bool
is_coding_questionary4coding model coding_question =
    validator model coding_question Nav.coding_questionary2coding_question Nothing

is_question4coding : I.Model -> Row Question.Model -> Bool
is_question4coding model question_ =
    validator model question_ Nav.question2coding_questionary (Just is_coding_questionary4coding)

is_questionary4coding : I.Model -> Row Questionary.Model -> Bool
is_questionary4coding model questionary_ =
    validator model questionary_ Nav.questionary2question (Just is_question4coding)

is_coding_question4input : I.Model -> Row CodingQuestion.Model -> Bool
is_coding_question4input model coding_question =
    validator model coding_question Nav.coding_question2coding_questionary (Just is_coding_questionary4input)

is_coding_questionary4input : I.Model -> Row CodingQuestionary.Model -> Bool
is_coding_questionary4input model coding_questionary_ =
    validator model coding_questionary_ Nav.coding_questionary2question (Just is_question4input)

is_question4input : I.Model -> Row Question.Model -> Bool
is_question4input model question_ =
    validator model question_ Nav.question2answer Nothing

is_questionary4input : I.Model -> Row Questionary.Model -> Bool
is_questionary4input model questionary_ =
    validator model questionary_ Nav.questionary2question (Just is_question4input)

question : I.Model -> Db Question.Model -> Db Question.Model
question model q= 
    q
    |> Db.filter (is_question4coding model)
    |> Db.filter (is_question4input model)

coding_questionary : I.Model -> Db CodingQuestionary.Model -> Db CodingQuestionary.Model
coding_questionary model cq=
    cq
    |> Db.filter (is_coding_questionary4coding model)
    |> Db.filter (is_coding_questionary4input model)

questionary : I.Model -> Db Questionary.Model -> Db Questionary.Model
questionary model q= 
    q
    |> Db.filter (is_questionary4input model)
    |> Db.filter (is_questionary4coding model)

validate_field : (I.Model -> Db a) -> (I.Model -> Db a -> Db a) -> (I.Model -> Db a -> I.Model) ->I.Model -> I.Model
validate_field getter validator_f setter model =
    getter model
    |> validator_f model
    |> setter model

data : I.Model -> I.Model
data model =
    model
    |> (\x -> {x|questionaries = questionary model x.questionaries})
    |> (\x -> {x|coding_questionaries = coding_questionary model x.coding_questionaries})
    |> (\x -> {x|questions = question model x.questions})
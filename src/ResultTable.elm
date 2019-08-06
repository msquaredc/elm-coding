module ResultTable exposing (Model, error, new)

import Array exposing (..)
import Dict exposing (..)
import Questionary exposing (..)
import Table exposing (..)


type alias Model =
    { codings : List Cell }


type Question
    = Question String


type Answer
    = Answer String


type CodingQuestion
    = CodingQuestion String


type CodingAnswer
    = CodingAnwer String


type alias Cell =
    { user : Table.UserRow
    , question : Question
    , answer : Answer
    , coding_question : CodingQuestion
    , coding_answer : CodingAnswer
    }

getByQuestion : Model -> List Cell
getByQuestion model 

getQuestions : Questionary.Model -> List ( Question, CodingQuestion )
getQuestions questionary =
    questionary.coding_questions
        |> Array.toList
        |> List.map .label
        |> List.map CodingQuestion
        |> List.map (Tuple.pair (Question questionary.question))


error =
    Model

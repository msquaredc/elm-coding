module Research exposing (Model, Msg, decode, empty, update, view)

import Array exposing (..)
import Data exposing (..)
import Db exposing (Db)
import Dict exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (..)
import Questionary exposing (..)
import ResultTable exposing (..)
import Table exposing (..)


type Msg
    = DataMsg Data.Msg


type alias Model =
    { database : Data.Model
    }


type alias RawJsonModel =
    { name : String
    , data : List (Dict String String)
    , questionaries : Array Questionary.Model
    }


decodeRawJson : Decode.Decoder RawJsonModel
decodeRawJson =
    Decode.map3 RawJsonModel
        (Decode.field "name" Decode.string)
        (Decode.field "data" (Decode.list (Decode.dict Decode.string)))
        (Decode.field "questionaries"
            (Decode.array Questionary.decode)
        )


decode : Decode.Decoder Model
decode =
    Decode.map Model
        (Decode.map (\( a, b ) -> a) (Decode.map Data.init Data.decoder))


splitDict : List String -> Dict String String -> Table.TableRow
splitDict q row =
    let
        ( researchData, userData ) =
            Dict.partition (\x y -> List.member x q) row
    in
    Table.TableRow userData researchData


view : Model -> Html Msg
view model =
    div []
        [ Html.map DataMsg (Data.view model.database)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        DataMsg dmsg ->
            let
                ( dataNew, dataCmd ) =
                    Data.update dmsg model.database
            in
            ( { model | database = dataNew }
            , Cmd.map DataMsg dataCmd
            )


questions : RawJsonModel -> List String
questions model =
    List.map .question (Array.toList model.questionaries)


empty : String -> Model
empty str =
    { database = Data.empty str
    }

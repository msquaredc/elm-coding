module Research exposing (Model, Msg, decode, error, update, view)

import Array exposing (..)
import Db exposing (Db)
import DataBase exposing (..)
import Dict exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (..)
import Questionary exposing (..)
import ResultTable exposing (..)
import Table exposing (..)


type Msg
    = QuestionaryMsg Int Questionary.Msg
    | TableMsg Table.Msg


type alias Model =
    { name : String
    , database : DataBase.Model
    }

type alias RawJsonModel =
    { name : String
    , data : List (Dict String String)
    , questionaries : Array Questionary.Model
    }


error : String -> Model
error err =
    Model err Table.error (Array.fromList [ Questionary.error ]) ResultTable.error


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
    Decode.map rawToDivided decodeRawJson


rawToDivided : RawJsonModel -> Model
rawToDivided rjmodel =
    let
        tableRows =
            List.map (splitDict (questions rjmodel)) rjmodel.data
    in
    Model rjmodel.name (Table.Model tableRows) rjmodel.questionaries (ResultTable.new tableRows rjmodel.questionaries)


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
        [ h1 [] [ text model.name ]
        , div [] (Array.toList (Array.indexedMap viewQuestionary model.questionaries))
        , Html.map TableMsg (Table.view model.data)
        ]


viewQuestionary index element =
    Html.map (QuestionaryMsg index) <| div [] [ Questionary.view element ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        QuestionaryMsg index fmsg ->
            let
                ( questionaryNew, questionaryCmd ) =
                    updateQuestionary model index fmsg
            in
            ( { model | questionaries = questionaryNew }
            , Cmd.map (QuestionaryMsg index) questionaryCmd
            )

        TableMsg tmsg ->
            let
                ( tableNew, tableCmd ) =
                    Table.update tmsg model.data
            in
            ( { model | data = tableNew }
            , Cmd.map TableMsg tableCmd
            )


updateQuestionary : Model -> Int -> Questionary.Msg -> ( Array Questionary.Model, Cmd Questionary.Msg )
updateQuestionary model index msg =
    case Array.get index model.questionaries of
        Just questionary ->
            let
                ( newValue, questionaryCmd ) =
                    Questionary.update msg questionary
            in
            ( Array.set index newValue model.questionaries, questionaryCmd )

        Nothing ->
            ( model.questionaries, Cmd.none )


questions : RawJsonModel -> List String
questions model =
    List.map .question (Array.toList model.questionaries)

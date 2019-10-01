module Entities.Coding.Frame exposing (Model, Msg(..), decoder, empty, selectFramesFromCodings, toTableRow, update, view, viewRow, viewTable)

import Db exposing (Db, Row)
import Db.Extra
import Entities.Answer as Answer
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Question as Question
import Entities.Questionary as Questionary
import Entities.Timestamp as Timestamp
import Html exposing (Html, div, h3, p, text)
import Html.Attributes exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required,custom)
import Material.DataTable as DataTable exposing (numeric, table, tbody, td, th, thead, tr, trh)
import Time
import List.Extra


type alias Model =
    { answer : Id Answer.Model
    , coding : Id Coding.Model
    , timestamp : Timestamp.Model
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "answer" Id.decoder
        |> required "coding" Id.decoder
        |> custom Timestamp.decoder
        


empty : Model
empty =
    { answer = Id.fromString "empty"
    , coding = Id.fromString "empty"
    , timestamp = Timestamp.empty
    }


type Msg
    = Error String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Error e_msg ->
            ( model, Cmd.none )


viewRow : ( Id Model, Model ) -> Html Msg
viewRow ( id, model ) =
    div []
        [ h3 [] [ text ("Coding Frame: " ++ Id.toString id) ]
        , view model
        ]


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text ("Answer: " ++ Id.toString model.answer) ]
        , p [] [ text ("Coding: " ++ Id.toString model.coding) ]
        , p [] [ text ("Created: " ++ String.fromInt model.timestamp.created) ]
        , p [] [ text ("Modified: " ++ String.fromInt model.timestamp.modified) ]
        ]


viewTable : Db Model -> Html Msg
viewTable model =
    div []
        [ h3 [] [ text "Coding Frame" ]
        , DataTable.view []
            [ table []
                [ thead []
                    [ trh []
                        [ th [] [ text "ID" ]
                        , th [] [ text "Answer" ]
                        , th [] [ text "Coding" ]
                        , th [] [ text "Created" ]
                        , th [] [ text "Modified" ]
                        ]
                    ]
                , tbody []
                    (List.map toTableRow (Db.toList model))
                ]
            ]
        ]


toTableRow : ( Id Model, Model ) -> Html Msg
toTableRow ( id, model ) =
    tr []
        [ td [] [ text (Id.toString id) ]
        , td [] [ text (Id.toString model.answer) ]
        , td [] [ text (Id.toString model.coding) ]
        , td [] [ text (String.fromInt model.timestamp.created) ]
        , td [] [ text (String.fromInt model.timestamp.modified) ]
        ]


selectFramesFromCodings : Db Model -> Result String (Db Coding.Model) -> Result String (Db Model)
selectFramesFromCodings db coders =
    let
        coding_ids =
            Result.map Db.toList coders
                |> Result.map (List.map (\( id, _ ) -> id))
    in
    Result.map (\c -> Db.filter (\( id, value ) -> List.member value.coding c) db) coding_ids

lastFrame : Db Model -> Row Model
lastFrame frames =
    Db.toList frames
    |> List.foldl (\(idf,first) -> (\(ids,second) -> if first.timestamp.modified > second.timestamp.modified then (idf,first) else (ids,second))) (Id.fromString "empty", empty)

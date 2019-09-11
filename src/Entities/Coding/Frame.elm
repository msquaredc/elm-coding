module Entities.Coding.Frame exposing (Model, Msg(..), decoder, toTableRow, update, view, viewRow, viewTable, selectFramesFromCodings)

import Db exposing (Db, Row)
import Entities.Answer as Answer
import Entities.Coding as Coding
import Html exposing (Html, div, h3, p, text)
import Html.Attributes exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Material.DataTable as DataTable exposing (numeric, table, tbody, td, th, thead, tr, trh)


type alias Model =
    { answer : Id Answer.Model
    , coding : Id Coding.Model
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "answer" Id.decoder
        |> required "coding" Id.decoder


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
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
        ]

selectFramesFromCodings : Db Model -> Result String (Db Coding.Model) -> Result String (Db Model)
selectFramesFromCodings db coders =
    let
        coding_ids =
            Result.map Db.toList coders
                |> Result.map (List.map (\( id, _ ) -> id))
    in
    Result.map (\c -> Db.filter (\( id, value ) -> List.member value.coding c) db) coding_ids


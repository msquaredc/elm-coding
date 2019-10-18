module Entities.Coding exposing (Model, Msg(..), encoder, decoder, selectCodings, toTableRow, update, view, viewRow, viewTable)

import Db exposing (Db, Row)
import Db.Extra exposing (..)
import Entities.Coder as Coder
import Html exposing (Html, div, h3, p, text)
import Html.Attributes as Attributes
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode exposing (Value)
import Material.DataTable as DataTable exposing (numeric, table, tbody, td, th, thead, tr, trh)
import Result exposing (andThen)


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "coder" Id.decoder


encoder : Model -> Value
encoder model =
    Encode.object
        [ ( "coder", Id.encode model.coder ) ]


type alias Model =
    { coder : Id Coder.Model
    }


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
        [ h3 [] [ text ("Coding: " ++ Id.toString id) ]
        , view model
        ]


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text ("Question: " ++ Id.toString model.coder) ]
        ]


viewTable : Db Model -> Html Msg
viewTable model =
    div []
        [ h3 [] [ text "Coding" ]
        , DataTable.view []
            [ table []
                [ thead []
                    [ trh []
                        [ th [] [ text "ID" ]
                        , th [] [ text "Coder" ]
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
        , td [] [ text (Id.toString model.coder) ]
        ]


selectCodings : Db Model -> Result String (Db Coder.Model) -> Result String (Db Model)
selectCodings db coders =
    let
        coder_ids =
            Result.map Db.toList coders
                |> Result.map (List.map (\( id, _ ) -> id))
    in
    Result.map (\c -> Db.filter (\( id, value ) -> List.member value.coder c) db) coder_ids


selectCodings2 : Db Model -> Result String (Db Coder.Model) -> Result String (Db Model)
selectCodings2 db coders =
    Result.map (Db.Extra.selectFrom db (\c -> c.coder)) coders

module Entities.Question exposing (Model, Msg(..), decoder, encoder, toTableRow, update, view, viewRow, viewTable)

import Db exposing (Db, Row)
import Dict exposing (..)
import Entities.Questionary as Questionary
import Form exposing (..)
import Html exposing (Html, div, h3, p, text)
import Html.Attributes as Attributes
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode exposing (Value)
import Material.DataTable as DataTable exposing (numeric, table, tbody, td, th, thead, tr, trh)


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder


encoder : Model -> Value
encoder model =
    Encode.object
        [ ( "questionary", Id.encode model.questionary )
        , ( "text", Encode.string model.text )
        , ( "input_type", Form.encode model.input_type )
        ]


type alias Model =
    { questionary : Id Questionary.Model
    , text : String
    , input_type : Form.InputType
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
        [ h3 [] [ text ("Question: " ++ Id.toString id) ]
        , view model
        ]


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text ("Questionary: " ++ Id.toString model.questionary) ]
        , p [] [ text ("Text: " ++ model.text) ]
        , p [] [ text ("Input Type: " ++ "TODO") ]
        ]


viewTable : Db Model -> Html Msg
viewTable model =
    div []
        [ h3 [] [ text "Answers" ]
        , DataTable.view
            []
            [ table []
                [ thead []
                    [ trh []
                        [ th [] [ text "ID" ]
                        , th [] [ text "Questionary" ]
                        , th [] [ text "Text" ]
                        , th [] [ text "Input Type" ]
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
        , td [] [ text (Id.toString model.questionary) ]
        , td [] [ text model.text ]
        , td [] [ text "TODO" ]
        ]

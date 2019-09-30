module Entities.Coding.Question exposing (Model, Msg(..), decoder, toTableRow, update, view, viewRow, viewTable)

import Db exposing (Db, Row)
import Entities.Coding.Questionary as CodingQuestionary
import Form exposing (..)
import Html exposing (Html, div, h3, p, text)
import Html.Attributes exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Material.DataTable as DataTable exposing (numeric, table, tbody, td, th, thead, tr, trh)


type alias Model =
    { coding_questionary : Id CodingQuestionary.Model
    , text : String
    , input_type : Form.InputType
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "coding_questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder


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
        [ h3 [] [ text ("Coding Question: " ++ Id.toString id) ]
        , view model
        ]


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text ("Questionary: " ++ Id.toString model.coding_questionary) ]
        , p [] [ text ("Text: " ++ model.text) ]
        , p [] [ text ("Input Type: " ++ "TODO") ]
        ]


viewTable : Db Model -> Html Msg
viewTable model =
    div []
        [ h3 [] [ text "Coding Question" ]
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
        , td [] [ text (Id.toString model.coding_questionary) ]
        , td [] [ text model.text ]
        , td [] [ text "TODO" ]
        ]


module Entities.Question exposing (..)

import Db exposing (Db, Row)
import Dict exposing (..)
import Entities.Questionary as Questionary
import Form exposing (..)
import Html exposing (Html,text,h3,div,p)
import Html.Attributes exposing (..)
import Material.DataTable as DataTable exposing(table, thead, tbody, tr, trh, th, td, numeric)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)

decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder

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
        , p [] [ text ("Text: " ++  model.text) ]
        , p [] [ text ("Input Type: " ++ "TODO") ]
        ]

viewTable : Db Model -> Html Msg
viewTable model = 
    div [] [h3 [][text "Answers"],
        DataTable.view 
        []
        [table []
            [
                thead [][
                    trh []
                    [ th [][text "ID"]
                    , th [][text "Questionary"]
                    , th [][text "Text"]
                    , th [][text "Input Type"]
                    ]
                    ],
                tbody [] 
                    (List.map toTableRow (Db.toList model))
                
        ]
        ]
    ]

toTableRow : (Id Model, Model) -> Html Msg
toTableRow (id,model) = 
    tr [] 
        [ td [][text (Id.toString id)]
        , td [][text (Id.toString model.questionary)]
        , td [][text (model.text)]
        , td [][text ("TODO")]
        ]


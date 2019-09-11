module Entities.Answer exposing (..)


import Db exposing (Db, Row)
import Entities.Question as Question
import Entities.User as User
import Html exposing (Html,text,h3,div,p)
import Html.Attributes exposing (..)
import Material.DataTable as DataTable exposing(table, thead, tbody, tr, trh, th, td, numeric)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)

type alias Model =
    { question : Id Question.Model
    , user : Id User.Model
    , value : String
    }

decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "question" Id.decoder
        |> required "user" Id.decoder
        |> optional "value" string ""

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
        [ h3 [] [ text ("Answer: " ++ Id.toString id) ]
        , view model
        ]

view : Model -> Html Msg
view model = 
    div []
        [ p [] [ text ("Question: " ++ Id.toString model.question) ]
        , p [] [ text ("User: " ++ Id.toString model.user) ]
        , p [] [ text ("Value: " ++ model.value) ]
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
                    , th [][text "Question"]
                    , th [][text "User"]
                    , th [][text "Value"]
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
        , td [][text (Id.toString model.question)]
        , td [][text (Id.toString model.user)]
        , td [][text (model.value)]
        ]
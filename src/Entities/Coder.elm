module Entities.Coder exposing (..)


import Db exposing (Db, Row)
import Entities.Question exposing (..)
import Entities.User exposing (..)
import Html exposing (Html,text,h3,div,p)
import Html.Attributes exposing (..)
import Material.DataTable as DataTable exposing(table, thead, tbody, tr, trh, th, td, numeric)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)

decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "name" string

type alias Model =
    { name : String
    }

type Name = 
    String

type Msg
    = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

viewRow : ( Id Model, Model ) -> Html Msg
viewRow ( id, answer ) =
    div []
        [ h3 [] [ text ("Coder: " ++ Id.toString id) ]
        , view answer
        ]

view : Model -> Html Msg
view model = 
    div []
        [ p [] [ text ("Name: " ++ model.name) ]
        ]

viewTable : Db Model -> Html Msg
viewTable model = 
    div [] [h3 [][text "Coder"],
        DataTable.view [] [table []
            [
                thead [][
                    trh []
                    [ th [][text "ID"]
                    , th [][text "Name"]
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
        , td [][text (model.name)]
        ]

selectCoder : Db Model -> String -> Result String (Db Model)
selectCoder db name =
    let 
        result = Db.filter (\(id,value) -> value.name == name) db
        result_length = List.length (Db.toList result)
    in 
        case result_length of
            1 -> Ok result
            0 -> Err ("No match for " ++ name ++ ".")
            _ -> Err ("Too many matches for " ++ name ++ ".")

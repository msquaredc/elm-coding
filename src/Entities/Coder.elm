module Entities.Coder exposing (Model, definition, decoder, encoder, selectCoder, toTableRow, update, view, viewRow, viewTable)


import Db exposing (Db, Row)
import Entities.Internal as EI exposing (Entity, Datatype,string,init)
import Entities.Question exposing (..)
import Entities.User exposing (..)
import Html exposing (Html, div, h3, p, text)
import Html.Attributes as Attributes
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode exposing (Value)
import Material.DataTable as DataTable exposing (numeric, table, tbody, td, th, thead, tr, trh)
import Validate exposing (..)

definition : Entity Model Model Field msg ctype
definition =
    { 
        name = "Coder",
        decoder = decoder,
        encoder = encoder,
        init = EI.init,
        default = default,
        field_types = fieldTypes,
        validator = validator
    }


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "name" Decode.string

encoder : Model -> Value
encoder model =
    Encode.object
        [ ( "name", Encode.string model.name ) ]

default : Model 
default = 
    {name = ""}


fieldTypes : Model -> Field -> Datatype m
fieldTypes model field =
    case field of
        Name ->
           EI.string model.name

validator : Validator (Field, String) Model
validator =
    Validate.all 
        [
            ifBlank .name (Name, "Please enter a name.")
        ]


type alias Model =
    { name : String
    }

type Field = 
    Name





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
    div []
        [ h3 [] [ text "Coder" ]
        , DataTable.view []
            [ table []
                [ thead []
                    [ trh []
                        [ th [] [ text "ID" ]
                        , th [] [ text "Name" ]
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
        , td [] [ text model.name ]
        ]


selectCoder : Db Model -> String -> Result String (Db Model)
selectCoder db name =
    let
        result =
            Db.filter (\( id, value ) -> value.name == name) db

        result_length =
            List.length (Db.toList result)
    in
    case result_length of
        1 ->
            Ok result

        0 ->
            Err ("No match for " ++ name ++ ".")

        _ ->
            Err ("Too many matches for " ++ name ++ ".")

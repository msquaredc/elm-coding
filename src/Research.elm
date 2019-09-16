module Research exposing (Model, Msg, init, decode, empty, update, view, Flags)

import Html exposing (text)
import Browser exposing (Document)
import Material
import Material.List as Lists
import Array exposing (..)
import Coding exposing (..)
import Data exposing (..)
import Entities.Coder as Coder
import Db exposing (Db)
import Dict exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Questionary exposing (..)
import ResultTable exposing (..)
import Table exposing (..)


type Msg
    = DataMsg Data.Msg
    | Mdc (Material.Msg Msg)


type alias Model =
    { database : Data.Model,
    coder : String,
    questionary : String,
    mdc : Material.Model Msg
    }


type alias Flags =
    { name : String
    , data : Data.Flags
    , coder : String
    , questionary : String
    }

init : Flags -> (Model, Cmd Msg)
init flags = 
    let
        (database, db_cmd) = Data.init flags.data
    in
        ({database = database,
          mdc = Material.defaultModel,
          coder = flags.coder,
          questionary = flags.questionary}, Cmd.none)

{-decodeRawJson : Decode.Decoder Flags
decodeRawJson =
    Decode.succeed Flags
        |> required "name" Decode.string
        |> required "data" (Decode.list (Decode.dict Decode.string))
        |> required "questionaries" (Decode.array Questionary.decode)
{-   Decode.map3 RawJsonModel
        (Decode.field "name" Decode.string)
        (Decode.field "data" (Decode.list (Decode.dict Decode.string)))
        (Decode.field "questionaries"
            (Decode.array Questionary.decode)
        )
-}-}

decode : Decode.Decoder Flags
decode =
 {-   Decode.map3 Model
        (Decode.map (\( a, b ) -> a) (Decode.map Data.init Data.decoder))
        (Decode.string)
        (Decode.string)
-}  
    Decode.succeed Flags
    |> required "name" Decode.string
    |> required "data" Data.decoder
    |> optional "coder" Decode.string ""
    |> optional "questionary" Decode.string ""


splitDict : List String -> Dict String String -> Table.TableRow
splitDict q row =
    let
        ( researchData, userData ) =
            Dict.partition (\x y -> List.member x q) row
    in
    Table.TableRow userData researchData


view : Model -> Document Msg
view model =
    {title = "Research",body=
    
        [ Html.h2 [] [text "Research:"]]

--        ,   Html.map DataMsg (Data.view model.database)
        
    }
viewCoder : Db Coder.Model -> Material.Model Msg -> Html Msg
viewCoder coder mdc = 
    
    Lists.ul Mdc "my-list" mdc
        [ Lists.twoLine
        , Lists.avatarList
        ]
        [ Lists.li []
              [ Lists.graphicIcon [] "folder"
              , Lists.text []
                    [ Lists.primaryText []
                          [ text "Photos"
                          ]
                    , Lists.secondaryText []
                          [ text "Jan 9, 2014"
                          ]
                    ]
              , Lists.metaIcon [] "info"
              ]
        , Lists.li []
              [ Lists.graphicIcon [] "folder"
              , Lists.text []
                    [ Lists.primaryText []
                          [ text "Recipes"
                          ]
                    , Lists.secondaryText []
                          [ text "Jan 17, 2014"
                          ]
                    ]
              , Lists.metaIcon [] "info"
              ]
        , Lists.li []
              [ Lists.graphicIcon [] "folder"
              , Lists.text []
                    [ Lists.primaryText []
                          [ text "Work"
                          ]
                    , Lists.secondaryText []
                          [ text "Jan 28, 2014"
                          ]
                    ]
              , Lists.metaIcon [] "info"
              ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        DataMsg dmsg ->
            let
                ( dataNew, dataCmd ) =
                    Data.update dmsg model.database
            in
            ( { model | database = dataNew }
            , Cmd.map DataMsg dataCmd
            )
        Mdc msg_ ->
            Material.update Mdc msg_ model


{-questions : Flags -> List String
questions model =
    List.map .question (Array.toList model.questionaries)
-}

empty : String -> Model
empty str =
    { database = Data.empty str,
    coder = "",
    questionary = "",
    mdc = Material.defaultModel
    }

module Research exposing (Model, Msg, decode, error, view, update)

import Array exposing (..)
import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)
import Questionary exposing (..)


type Msg
    = QuestionaryMsg Int Questionary.Msg


type alias Model =
    { name : String
    , questionaries : Array Questionary.Model
    }


error err =
    Model err (Array.fromList [ Questionary.error ])


decode : Decode.Decoder Model
decode =
    Decode.map2 Model
        (Decode.field "name" Decode.string)
        (Decode.field "questionaries"
            (Decode.array Questionary.decode)
        )


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text model.name ]
        ,div [] (Array.toList (Array.indexedMap viewQuestionary model.questionaries))
        ]

viewQuestionary index element = 
    Html.map (QuestionaryMsg index) <| div [] [Questionary.view element]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        QuestionaryMsg index fmsg ->
            let
                ( formsNew, formsCmd ) =
                    updateQuestionary model index fmsg
            in
                ( { model | questionaries = formsNew}
                , Cmd.map (QuestionaryMsg index) formsCmd
                )

updateQuestionary : Model -> Int -> Questionary.Msg -> (Array Questionary.Model, Cmd Questionary.Msg)
updateQuestionary model index msg = 
    case Array.get index model.questionaries of
        Just questionary ->
            let 
                (newValue, questionaryCmd) = Questionary.update msg questionary
            in 
                (Array.set index newValue model.questionaries, questionaryCmd)
        Nothing ->
            (model.questionaries, Cmd.none)
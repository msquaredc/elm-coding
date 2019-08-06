module Questionary exposing (Model, Msg, decode, error, update, view)

import Array exposing (..)
import Form exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)


type alias Model =
    { question : String
    , coding_questions : Array Form.Model
    }


type Msg
    = FormMsg Int Form.Msg


error =
    Model "error" (Array.fromList [ Form.error ])


decode : Decode.Decoder Model
decode =
    Decode.map2 Model
        (Decode.field "question" Decode.string)
        (Decode.field "coding_questions"
            (Decode.array
                Form.decode
            )
        )


view : Model -> Html Msg
view model =
    div [] [ text model.question, div [] (Array.toList (Array.indexedMap viewForm model.coding_questions)) ]


viewForm index element =
    Html.map (FormMsg index) <| div [] [ Form.view element ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FormMsg index fmsg ->
            let
                ( formsNew, formsCmd ) =
                    updateForms model index fmsg
            in
            ( { model | coding_questions = formsNew }
            , Cmd.map (FormMsg index) formsCmd
            )


updateForms model index msg =
    case Array.get index model.coding_questions of
        Just form ->
            let
                ( newValue, formCmd ) =
                    Form.update msg form
            in
            ( Array.set index newValue model.coding_questions, formCmd )

        Nothing ->
            ( model.coding_questions, Cmd.none )

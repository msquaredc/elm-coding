port module Main exposing (Msg(..), activeUsers)

import Browser exposing (..)
import Form exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)
import Json.Encode as E


type Msg
    = Searched String
    | Changed E.Value
    | FormMsg Form.Msg


type alias Model =
    { form : Form.Model
    }


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : Value -> ( Model, Cmd msg )
init flags =
    case Decode.decodeValue Form.decoder flags of
        Ok model ->
            ( Model model, Cmd.none )

        Err err ->
            ( Model (Form.Model "blupp" [Form.Form (Decode.errorToString err) Form.InputString "ERROR"]), Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Searched str ->
            ( model, Cmd.none )

        Changed v ->
            ( model, Cmd.none )

        FormMsg fmsg ->
            let
                ( formModel, formCmd ) =
                    Form.update fmsg model.form
            in
            ( { model | form = formModel }
            , Cmd.map FormMsg formCmd
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.map FormMsg (Form.view model.form)
        ]


port activeUsers : (E.Value -> msg) -> Sub msg

port module Main exposing (Msg(..), activeUsers)

import Browser exposing (..)
import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)
import Json.Encode as E
import Research exposing (..)


type Msg
    = Searched String
    | Changed E.Value
    | ResearchMsg Research.Msg


type alias Model =
    { research : Research.Model
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
    case Decode.decodeValue Research.decode flags of
        Ok model ->
            ( Model model, Cmd.none )

        Err err ->
            ( Model (Research.empty (Debug.toString err)), Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Searched str ->
            ( model, Cmd.none )

        Changed v ->
            ( model, Cmd.none )

        ResearchMsg fmsg ->
            let
                ( researchModel, researchCmd ) =
                    Research.update fmsg model.research
            in
            ( { model | research = researchModel }
            , Cmd.map ResearchMsg researchCmd
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.map ResearchMsg (Research.view model.research)
        ]


port activeUsers : (E.Value -> msg) -> Sub msg

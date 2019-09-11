port module Main exposing (Msg(..), activeUsers)

import Browser exposing (..)
import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)
import Json.Encode as E
import Research exposing (..)
import Material


type Msg
    = Searched String
    | Changed E.Value
    | ResearchMsg Research.Msg
    | Mdc (Material.Msg Msg)


type alias Model =
    { research : Research.Model,
    mdc : Material.Model Msg
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
            ( Model model Material.defaultModel, Cmd.none )

        Err err ->
            ( Model (Research.empty (Debug.toString err)) Material.defaultModel, Cmd.none )


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
        
        Mdc msg_ ->
            Material.update Mdc msg_ model


subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model

view : Model -> Html Msg
view model =
    Html.div []
        [ Html.text "it works!"
            ,Html.map ResearchMsg (Research.view model.research)
        ]


port activeUsers : (E.Value -> msg) -> Sub msg

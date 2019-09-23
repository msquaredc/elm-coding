module Coding exposing (Model, Msg, empty, init, subscriptions, update, view)

import Data exposing (..)
import Html exposing (..)


type alias Model =
    { data : Data.Model
    }


type Msg
    = Msg1
    | Msg2


empty : Model
empty =
    Model (Data.empty)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Msg1 ->
            ( model, Cmd.none )

        Msg2 ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ text "New Html Program" ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


init : Data.Model -> ( Model, Cmd Msg )
init db =
    ( Model db, Cmd.none )

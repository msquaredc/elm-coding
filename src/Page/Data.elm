module Page.Data exposing (..)

import Browser exposing (Document)
import Html exposing (Html, h2, text)
import Data exposing (Model)

type Msg 
    = GotDataMsg Data.Msg

view : Model -> Document Msg
view model =
    {title = "Data",body=
        List.map (Html.map GotDataMsg)
        [ Data.view model]}
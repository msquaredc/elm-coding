module Page.Error exposing (Msg(..),view)

import Json.Decode as Decode
import Browser exposing (Document)
import Html exposing (Html, h2, text)


type Msg
    = Noop

view : Decode.Error -> Document Msg
view error =
    {title = "Error",body=
    
        [ Html.h2 [] [text "Error:"], text (Decode.errorToString error)]}

viewError : Decode.Error -> Html Msg
viewError error = 
    case error of
        option1 ->
            text "hi"
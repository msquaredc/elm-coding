module Page.Error exposing (Msg(..), view)

import Browser exposing (Document)
import Html exposing (Html, div, h2, text)
import Json.Decode as Decode
import Material
import Data


type Msg
    = Noop


view : Material.Model msg -> Data.Model -> Decode.Error -> { title : String, content : Html (Msg) }
view mdc data error =
    { title = "Error"
    , content =
        div []
            [ Html.h2 [] [ text "Error:" ], text (Decode.errorToString error) ]
    }


viewError : Decode.Error -> Html Msg
viewError error =
    case error of
        option1 ->
            text "hi"

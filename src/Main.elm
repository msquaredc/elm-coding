port module Main exposing (Msg(..), activeUsers)

import Browser exposing (..)
import Browser.Navigation
import Url exposing (..)
import Dict exposing (..)
import Html exposing (..)
import Page exposing (..)
import Page.Error
import Page.Data
import Data
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string,Value)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as E
import Research exposing (..)
import Material


type Msg
    = Searched String
    | Changed E.Value
    | GotResearchMsg Research.Msg
    | GotErrorMsg Page.Error.Msg
    | GotDataMsg Page.Data.Msg
    | Mdc (Material.Msg Msg)
    | Noop

type DefaultModel 
    = MdcModel {mdc : (Material.Model Msg)}
    | Data Data.Model
    | Error Decode.Error

type alias Model =
    { data : Data.Model,
    mdc : Material.Model Msg,
    title : String,
    body : List (Html Msg)
    }

type alias Flags =
    { research : Research.Flags}

main : Program Value Model Msg
main =
    Browser.application
        { init = init
        , onUrlChange = onUrlChange
        , onUrlRequest = onUrlRequest
        , update = update
        , subscriptions = subscriptions
        , view = view
        }

onUrlChange : Url -> Msg
onUrlChange url = Noop

onUrlRequest : UrlRequest -> Msg
onUrlRequest a = Noop

{-
decode : Decoder Flags
decode = 
    Decode.succeed Flags
    |> required "research" Research.decode
-}

init : Value -> Url.Url -> Browser.Navigation.Key -> ( Model, Cmd msg )
init flags url key =
    let 
        result_flags = Decode.decodeValue Data.decoder flags
    in
        case result_flags of
            Ok flag_value ->
                let
                    (data, rcmd) = Data.init flag_value
                in 
                    ({title = "", body = [], mdc = Material.defaultModel,data = data}, Cmd.none)
            Err error ->
                ({title = "Error", body = [text (Decode.errorToString error)], mdc = Material.defaultModel, data = Data.empty}, Cmd.none)
        


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case (msg, model) of
{-      (GotResearchMsg rMsg, Research research) ->
            let
                ( researchModel, researchCmd ) =
                    Research.update rMsg research
            in
                ( Research researchModel 
                , Cmd.map GotResearchMsg researchCmd
                )
-}        
        (_,_) -> 
            (model, Cmd.none)


subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model
    

view : Model -> Document Msg
view model =
    viewPage Page.Data GotDataMsg model 

viewPage : Page -> (msg -> Msg) -> Model -> Document Msg
viewPage page pMsg model = 
    {title = model.title,
    body = [Page.view page model Mdc]}


port activeUsers : (E.Value -> msg) -> Sub msg

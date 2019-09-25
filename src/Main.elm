port module Main exposing (Msg(..), activeUsers)

import Browser
import Browser.Navigation as Nav
import Data
import Dict
import Html
import Json.Decode as Decode exposing (Decoder, Value, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as E
import Material
import Page
import Page.Data
import Page.Error
import Page.Login
import Research
import Url


type Msg
    = GotPageMsg Page.Msg
    | GotDataMsg Data.Msg
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | Noop


type alias Model =
    { data : Data.Model
    , page : Page.Model
    , key : Nav.Key
    }


type alias Flags =
    { research : Research.Flags }


main : Program Value Model Msg
main =
    Browser.application
        { init = init
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


onUrlChange : Url.Url -> Msg
onUrlChange url =
    Noop


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest a =
    case a of
        Browser.Internal i ->
            Noop

        Browser.External e ->
            Noop



{-
   decode : Decoder Flags
   decode =
       Decode.succeed Flags
       |> required "research" Research.decode
-}


init : Value -> Url.Url -> Nav.Key -> ( Model, Cmd msg )
init flags url key =
    let
        result_flags =
            Decode.decodeValue Data.decoder flags
    in
    case result_flags of
        Ok flag_value ->
            let
                ( data, rcmd ) =
                    Data.init flag_value
            in
            ( { data = data
              , page = Page.defaultModel
              , key = key
              }
            , Cmd.none
            )

        Err error ->
            ( { page = Page.defaultModel
              , data = Data.empty
              , key = key
              }
            , Cmd.none
            )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotPageMsg msg_ ->
            let
                ( page, effect ) =
                    Page.update msg_ model.page model.data
            in
            ( { model | page = page }, Cmd.map GotPageMsg effect )

        Noop ->
            ( model, Cmd.none )

        GotDataMsg msg_ ->
            let
                ( data, effect ) =
                    Data.update msg_ model.data
            in
            ( { model | data = data }, Cmd.map GotDataMsg effect )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            let
                ( page, effect ) =
                    Page.update (Page.UrlChanged url) model.page model.data
            in
                ( { model | page = page }, Cmd.map GotPageMsg effect )
            


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.map GotPageMsg (Page.subscriptions model.page)


view : Model -> Browser.Document Msg
view model =
    let
        { title, body } =
            Page.view model.page model.data
    in
    { title = title
    , body = List.map (Html.map GotPageMsg) body
    }



{- let
       viewPage page mapper viewer page_model =
           let
               { title, body } =
                   Page.view model.mdc page (viewer page_model model.mdc Mdc model.data)
           in
           { title = title
           , body = List.map (Html.map mapper) body
           }
   in
   case model.page of
       Page.Data data ->
           viewPage Page.Data GotDataMsg Page.Data.view data

       Page.Error err ->
           { title = "None"
           , body = [Html.text "nothing"]
           }
-}
--            viewPage Page.Error GotErrorMsg Page.Error.view err
{- Redirect _ ->
       Page.view viewer Page.Other Blank.view

   NotFound _ ->
       Page.view viewer Page.Other NotFound.view

   Settings settings ->
       viewPage Page.Other GotSettingsMsg (Settings.view settings)

   Home home ->
       viewPage Page.Home GotHomeMsg (Home.view home)

   Login login ->
       viewPage Page.Other GotLoginMsg (Login.view login)

   Register register ->
       viewPage Page.Other GotRegisterMsg (Register.view register)

   Profile username profile ->
       viewPage (Page.Profile username) GotProfileMsg (Profile.view profile)

   Article article ->
       viewPage Page.Other GotArticleMsg (Article.view article)

   Editor Nothing editor ->
       viewPage Page.NewArticle GotEditorMsg (Editor.view editor)

   Editor (Just _) editor ->
       viewPage Page.Other GotEditorMsg (Editor.view editor)
-}


port activeUsers : (E.Value -> msg) -> Sub msg

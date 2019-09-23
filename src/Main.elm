port module Main exposing (Msg(..), activeUsers)

import Browser exposing (..)
import Browser.Navigation
import Data
import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (Decoder, Value, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as E
import Material
import Page
import Page.Data
import Page.Error
import Research exposing (..)
import Url exposing (..)


type Msg
    = Searched String
    | Changed E.Value
    | GotResearchMsg Research.Msg
    | GotErrorMsg Page.Error.Msg
    | GotDataMsg (Page.Data.Msg Msg)
    | Mdc (Material.Msg Msg)
    | Noop


type alias Model =
    { mdc : Material.Model Msg
    , data : Data.Model
    , page : PageModel
    }


type PageModel
    = Data Page.Data.Model
    | Error Decode.Error


type alias Flags =
    { research : Research.Flags }


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
onUrlChange url =
    Noop


onUrlRequest : UrlRequest -> Msg
onUrlRequest a =
    Noop



{-
   decode : Decoder Flags
   decode =
       Decode.succeed Flags
       |> required "research" Research.decode
-}


init : Value -> Url.Url -> Browser.Navigation.Key -> ( Model, Cmd msg )
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
            ( { mdc = Material.defaultModel, data = data, page = Data {} }, Cmd.none )

        Err error ->
            ( { page = Error error, mdc = Material.defaultModel, data = Data.empty }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        {- (GotResearchMsg rMsg, Research research) ->
           let
               ( researchModel, researchCmd ) =
                   Research.update rMsg research
           in
               ( Research researchModel
               , Cmd.map GotResearchMsg researchCmd
               )
        -}
        ( _, _ ) ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model


view : Model -> Document Msg
view model =
    let
        viewPage page mapper viewer page_model =
            let
                { title, content } =
                    Page.view Mdc model.mdc page (viewer page_model model.mdc Mdc model.data)
            in
            { title = title
            , body = List.map (Html.map mapper) content 
            }
    in
    case model.page of
        Data data ->
            viewPage Page.Data GotDataMsg Page.Data.view data
        Error err -> 
            {title = "None",
            body = text "nothing"}
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

module Page exposing (Model, Msg(..),OutMsg(..), Page, defaultModel, subscriptions, update, view)

import Browser exposing (Document)
import Data
import Html exposing (Html, a, button, div, footer, i, img, li, nav, p, span, text, ul)
import Html.Attributes exposing (class, classList, href, style)
import Json.Decode as Decode
import Material
import Material.LayoutGrid as LayoutGrid
import Material.Options as Options
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Material.SimplifiedList as SL
import Material.LinearProgress as LinearProgress
import Page.Internal
import Page.Data
import Page.Error
import Page.Login
import Page.Url
import Page.Home
import Page.Code
import Url
import Entities.Coder
import Entities.Coding
import Entities.Coding.Answer as CodingAnswer
import Entities.Coding.Question as CodingQuestion
import Db exposing (Db, Row)
import List.Extra
import Id exposing (Id)


type alias Page =
    { error : Page.Error.Model Msg
    , data : Page.Data.Model Msg
    , login : Page.Login.Model Msg
    , home : Page.Home.Model Msg
    , code : Page.Code.Model Msg
    }


type GotPageMsg
    = GotErrorMsg (Page.Error.Msg Msg)
    | GotDataMsg (Page.Data.Msg Msg)
    | GotLoginMsg (Page.Login.Msg Msg)
    | GotHomeMsg (Page.Home.Msg Msg)
    | GotCodeMsg (Page.Code.Msg Msg)


type Msg
    = Mdc (Material.Msg Msg)
    | PageMsg GotPageMsg
    | UrlChanged Url.Url
    | Internal (Page.Internal.Msg Msg)

type OutMsg
    = GenerateFrame (Row Entities.Coding.Model)
    | SelectCoding (Row Entities.Coding.Model)
    | Change (Id CodingAnswer.Model) String

type alias Model =
    { mdc : Material.Model Msg
    , page : Page
    , url : Page.Url.Url
    , user : Maybe (Row Entities.Coder.Model)
    , coding : Maybe (Row Entities.Coding.Model)
    , internal : Page.Internal.Model Msg
    }


init : Url.Url -> Maybe Decode.Error -> Model
init url dc =
    { mdc = Material.defaultModel
    , page = defaultPage
    , url = Page.Url.fromUrl url
    , user = Nothing
    , coding = Nothing
    , internal = Page.Internal.defaultModel
    }


defaultModel : Model
defaultModel =
    { mdc = Material.defaultModel
    , page = defaultPage
    , url = Page.Url.defaultUrl
    , user = Nothing
    , coding = Nothing
    , internal = Page.Internal.defaultModel
    }


defaultPage : Page
defaultPage =
    { error = Page.Error.defaultModel
    , data = Page.Data.defaultModel
    , login = Page.Login.defaultModel
    , home = Page.Home.defaultModel
    , code = Page.Code.defaultModel
    }


update : Msg -> Data.Model -> Model  -> ( Model, Cmd Msg, Maybe OutMsg )
update msg data model =
    case msg of
        Mdc msg_ ->
            let
                (mdc, effect) = Material.update Mdc msg_ model
            in
                (mdc, effect, Nothing)

        PageMsg m ->
            case m of 
                GotLoginMsg (Page.Login.Select index) ->
                    let 
                        list = Page.Login.getFilteredList data.coders model.page.login.field
                        mb_row = List.Extra.getAt index list
                    in
                        ({model | user = mb_row},Cmd.none,Nothing)
                _ ->
                    let
                        ( page, effects, pmsg ) =
                            updatePage m model.page data
                    in
                        ( { model | page = page }, effects, pmsg)
        UrlChanged url -> 
            ({model | url = Page.Url.fromUrl url}, Cmd.none, Nothing)
        Internal msg_ ->
            let
                (internal, effects ) =
                    Page.Internal.update Internal msg_ model.internal
            in 
                ({model | internal = internal},effects, Nothing)



updatePage : GotPageMsg -> Page -> Data.Model -> ( Page, Cmd Msg, Maybe OutMsg )
updatePage msg model data =
    case msg of
        GotLoginMsg msg_ ->
            let
                ( login, effects ) =
                    Page.Login.update (PageMsg << GotLoginMsg) msg_ model.login data
            in
                ( { model | login = login }, effects, Nothing )

        GotErrorMsg msg_ ->
            let
                ( error, effects ) =
                    Page.Error.update (PageMsg << GotErrorMsg) msg_ model.error
            in
            ( { model | error = error }, effects, Nothing )

        GotDataMsg msg_ ->
            let
                ( datam, effects ) =
                    Page.Data.update (PageMsg << GotDataMsg) msg_ model.data
            in
            ( { model | data = datam }, effects, Nothing )
        GotHomeMsg msg_ ->
            let
                ( homem, effects, mb) =
                    Page.Home.update (PageMsg << GotHomeMsg) msg_ model.home
                outmessage = case mb of
                    Nothing ->
                        Nothing
                    Just om ->
                        Just 
                            (case om of
                                Page.Home.GotSelection coding ->
                                    SelectCoding coding
                            )
            in
                ( { model | home = homem }, effects, outmessage)
        GotCodeMsg msg_ -> 
            let
                ( codem, effects, mb ) =
                    Page.Code.update (PageMsg << GotCodeMsg) msg_ model.code
                outmessage = case mb of 
                    Nothing -> 
                        Nothing
                    Just om -> 
                        Just 
                            (case om of
                                Page.Code.ChangedAnswer caid value ->
                                    Change caid value
                                    )
            in
            ( { model | code = codem }, effects, outmessage )


view : Model -> Data.Model -> Document Msg
view model data =
    let 
        viewLoggedIn viewf msg page = 
            case model.user of
                Just user ->
                    Page.Internal.view Internal model.internal (viewf (PageMsg << msg) page data user)
                Nothing ->
                    Page.Internal.view Internal model.internal (Page.Login.view (PageMsg << GotLoginMsg) model.page.login data model.user)
    in
        case model.url of
            Page.Url.Data ->
                viewLoggedIn Page.Data.view GotDataMsg model.page.data

            Page.Url.Error ->
                viewLoggedIn Page.Error.view GotErrorMsg model.page.error

            Page.Url.StartPage ->
                viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home

            Page.Url.Error404 _ ->
                viewLoggedIn Page.Error.view GotErrorMsg model.page.error
            
            Page.Url.Home -> 
                viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home

            Page.Url.Code ->
                case model.coding of
                    Just coding ->
                        Page.Internal.view Internal model.internal (Page.Code.view (PageMsg << GotCodeMsg) model.page.code data coding)
                
                    Nothing ->
                        viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home
                



subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model

            


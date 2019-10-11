module Page exposing (Model, Msg(..), OutMsg(..), Page, defaultModel, onUrlChange, subscriptions, update, view)

import Browser exposing (Document)
import Data
import Data.Internal as I
import Db exposing (Db, Row)
import Entities.Coder
import Entities.Coding as Coding
import Entities.Coding.Answer as CodingAnswer
import Entities.Coding.Question as CodingQuestion
import Html exposing (Html, a, button, div, footer, i, img, li, nav, p, span, text, ul)
import Html.Attributes exposing (class, classList, href, style)
import Id exposing (Id)
import Json.Decode as Decode
import List.Extra
import Material
import Material.LayoutGrid as LayoutGrid
import Material.LinearProgress as LinearProgress
import Material.Options as Options
import Material.SimplifiedList as SL
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Page.Code
import Page.Data
import Page.Error
import Page.Home
import Page.Internal
import Page.Internal.Drawer as Drawer
import Page.Login
import Page.StartPage
import Page.Url
import Url


type alias Page =
    { error : Page.Error.Model Msg
    , data : Page.Data.Model Msg
    , login : Page.Login.Model Msg
    , home : Page.Home.Model Msg
    , code : Page.Code.Model Msg
    , start_page : Page.StartPage.Model Msg
    }


type GotPageMsg
    = GotErrorMsg (Page.Error.Msg Msg)
    | GotDataMsg (Page.Data.Msg Msg)
    | GotLoginMsg (Page.Login.Msg Msg)
    | GotHomeMsg (Page.Home.Msg Msg)
    | GotCodeMsg (Page.Code.Msg Msg)
    | GotStartPageMsg (Page.StartPage.Msg Msg)


type Msg
    = Mdc (Material.Msg Msg)
    | PageMsg GotPageMsg
    | Internal (Page.Internal.Msg Msg)
    | OnUrlChange Page.Url.Url


type OutMsg
    = GenerateFrame (Row Coding.Model)
    | SelectCoding (Row Coding.Model)
    | Change (Id CodingAnswer.Model) String
    | Move Data.Direction Data.Object (Row Coding.Model)


type alias Model =
    { mdc : Material.Model Msg
    , page : Page
    , url : Page.Url.Url
    , user : Maybe (Row Entities.Coder.Model)
    , coding : Maybe (Row Coding.Model)
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
    , start_page = Page.StartPage.defaultModel
    }


update : Msg -> I.Model -> Model -> ( Model, Cmd Msg, Maybe OutMsg )
update msg data model =
    case msg of
        Mdc msg_ ->
            let
                ( mdc, effect ) =
                    Material.update Mdc msg_ model
            in
            ( mdc, effect, Nothing )

        PageMsg m ->
            case m of
                GotLoginMsg (Page.Login.Select index) ->
                    let
                        list =
                            Page.Login.getFilteredList data.coders model.page.login.field

                        mb_row =
                            List.Extra.getAt index list
                    in
                    ( { model | user = mb_row }, Cmd.none, Nothing )

                _ ->
                    let
                        ( page, effects, pmsg ) =
                            updatePage m model.page data
                    in
                    ( { model | page = page }, effects, pmsg )

        Internal msg_ ->
            let
                ( internal, effects ) =
                    Page.Internal.update Internal msg_ model.internal
            in
            ( { model | internal = internal }, effects, Nothing )

        OnUrlChange url ->
            ( { model | url = url }, Cmd.none, Nothing )


updatePage : GotPageMsg -> Page -> I.Model -> ( Page, Cmd Msg, Maybe OutMsg )
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
                ( homem, effects, mb ) =
                    Page.Home.update (PageMsg << GotHomeMsg) msg_ model.home

                outmessage =
                    case mb of
                        Nothing ->
                            Nothing

                        Just om ->
                            Just
                                (case om of
                                    Page.Home.GotSelection coding ->
                                        SelectCoding coding
                                )
            in
            ( { model | home = homem }, effects, outmessage )

        GotCodeMsg msg_ ->
            let
                ( codem, effects, mb ) =
                    Page.Code.update (PageMsg << GotCodeMsg) msg_ model.code

                outmessage =
                    case mb of
                        Nothing ->
                            Nothing

                        Just om ->
                            Just
                                (case om of
                                    Page.Code.ChangedAnswer caid value ->
                                        Change caid value

                                    Page.Code.Move direction object coding ->
                                        Move direction object coding
                                )
            in
            ( { model | code = codem }, effects, outmessage )
        GotStartPageMsg msg_ ->
            let
                (startpage, effect) = 
                    Page.StartPage.update (PageMsg << GotStartPageMsg) msg_ model.start_page
            in
                ({model|start_page = startpage},effect,Nothing)


view : Model -> I.Model -> Document Msg
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
            Page.Internal.view Internal model.internal (Page.Error.view (PageMsg << GotErrorMsg) model.page.error data)

        Page.Url.StartPage ->
            Page.Internal.view Internal model.internal (Page.StartPage.view (PageMsg << GotStartPageMsg) model.mdc)

        Page.Url.Error404 _ ->
            Page.Internal.view Internal model.internal (Page.Error.view (PageMsg << GotErrorMsg) model.page.error data) 

        Page.Url.Home ->
            viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home

        Page.Url.Code ->
            case model.coding of
                Just coding ->
                    Page.Internal.view Internal model.internal (Page.Code.view (PageMsg << GotCodeMsg) model.page.code data coding) 

                Nothing ->
                    viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home


onUrlChange : Url.Url -> Msg
onUrlChange url =
    OnUrlChange (Page.Url.fromUrl url)


subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model

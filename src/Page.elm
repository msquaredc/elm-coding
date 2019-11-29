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
import Page.Upload
import Page.Url
import Url


type alias Page =
    { error : Page.Error.Model Msg
    , data : Page.Data.Model Msg
    , login : Page.Login.Model Msg
    , home : Page.Home.Model Msg
    , code : Page.Code.Model Msg
    , start_page : Page.StartPage.Model Msg
    , upload : Page.Upload.Model Msg
    }


type GotPageMsg
    = GotErrorMsg (Page.Error.Msg Msg)
    | GotDataMsg (Page.Data.Msg Msg)
    | GotLoginMsg (Page.Login.Msg Msg)
    | GotHomeMsg (Page.Home.Msg Msg)
    | GotCodeMsg (Page.Code.Msg Msg)
    | GotStartPageMsg (Page.StartPage.Msg Msg)
    | GotUploadMsg (Page.Upload.Msg Msg)


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
    | UpdateDB


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
    , upload = Page.Upload.defaultModel
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
{-                 GotHomeMsg Page.Home.UploadButtonClicked ->
                    update (OnUrlChange Page.Url.Upload) data {model|url = Page.Url.Upload} -}
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
            let
                ( newmodel, effects, outmsg ) =
                    update (Internal (Page.Internal.DrawerMsg Drawer.CloseDrawer)) data model
            in
            ( { newmodel | url = url }, effects, outmsg )


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
                ( homem, effects, outmsg ) =
                    Page.Home.update (PageMsg << GotHomeMsg) msg_ model.home
            in
            ( { model | home = homem }, effects, Maybe.map matchHomeOutMsg outmsg )

        GotCodeMsg msg_ ->
            let
                ( codem, effects, outmsg ) =
                    Page.Code.update (PageMsg << GotCodeMsg) msg_ model.code
            in
            ( { model | code = codem }, effects, Maybe.map matchCodeOutMsg outmsg )

        GotStartPageMsg msg_ ->
            let
                ( startpage, effect ) =
                    Page.StartPage.update (PageMsg << GotStartPageMsg) msg_ model.start_page
            in
            ( { model | start_page = startpage }, effect, Nothing )

        GotUploadMsg msg_ ->
            let
                ( upload, effect, upmsg ) =
                    Page.Upload.update (PageMsg << GotUploadMsg) msg_ model.upload
            in
            ( { model | upload = upload }, effect, Maybe.map matchUploadOutMsg upmsg )


matchUploadOutMsg : Page.Upload.OutMsg -> OutMsg
matchUploadOutMsg msg =
    case msg of
        Page.Upload.Found ->
            UpdateDB


matchCodeOutMsg : Page.Code.OutMsg -> OutMsg
matchCodeOutMsg msg =
    case msg of
        Page.Code.ChangedAnswer caid value ->
            Change caid value

        Page.Code.Move direction object coding ->
            Move direction object coding


matchHomeOutMsg : Page.Home.OutMsg -> OutMsg
matchHomeOutMsg msg =
    case msg of
        Page.Home.GotSelection coding ->
            SelectCoding coding

        Page.Home.Upload ->
            UpdateDB


view : Model -> I.Model -> Document Msg
view model data =
    let
        viewLoggedIn viewf msg page =
            case model.user of
                Just user ->
                    Page.Internal.view Internal model.internal (viewf (PageMsg << msg) page data user) (drawerConfig model)

                Nothing ->
                    Page.Internal.view Internal model.internal (Page.Login.view (PageMsg << GotLoginMsg) model.page.login data model.user) (drawerConfig model)
    in
    case model.url of
        Page.Url.Data ->
            viewLoggedIn Page.Data.view GotDataMsg model.page.data

        Page.Url.Error ->
            Page.Internal.view Internal model.internal (Page.Error.view (PageMsg << GotErrorMsg) model.page.error data) (drawerConfig model)

        Page.Url.StartPage ->
            Page.Internal.view Internal model.internal (Page.StartPage.view (PageMsg << GotStartPageMsg) model.mdc) (drawerConfig model)

        Page.Url.Error404 _ ->
            Page.Internal.view Internal model.internal (Page.Error.view (PageMsg << GotErrorMsg) model.page.error data) (drawerConfig model)

        Page.Url.Home ->
            viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home

        Page.Url.Code ->
            case model.coding of
                Just coding ->
                    Page.Internal.view Internal model.internal (Page.Code.view (PageMsg << GotCodeMsg) model.page.code data coding) (drawerConfig model)

                Nothing ->
                    viewLoggedIn (Page.Home.view model.coding) GotHomeMsg model.page.home

        Page.Url.Upload ->
            Page.Internal.view Internal model.internal (Page.Upload.view (PageMsg << GotUploadMsg) model.page.upload data) (drawerConfig model)


onUrlChange : Url.Url -> Msg
onUrlChange url =
    OnUrlChange (Page.Url.fromUrl url)


subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model


drawerConfig : Model -> Drawer.Config m
drawerConfig model =
    { header = Maybe.map Drawer.headerFromCoder model.user
    , favourites = []
    , locations = List.map (\x -> Drawer.locationFromUrl x (x == model.url)) Page.Url.navigatableUrl
    }

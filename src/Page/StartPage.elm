module Page.StartPage exposing (Model, Msg(..), defaultModel, getDrawer, update, view)

import Html exposing (Html, text)
import Material
import Material.Button as Button
import Material.Options as Options
import Page.Internal exposing (Document)
import Page.Internal.Drawer as Drawer
import Page.Internal.AppBar as AppBar


type Msg m
    = Mdc (Material.Msg m)
    | Click


type alias Model m =
    { mdc : Material.Model m }


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel }


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        Click ->
            ( model, Cmd.none )


view : (Msg m -> m) -> Material.Model m -> Document m
view lift mdc =
    { title = "Start Page"
    , body = [ longBody ]
    , appbar = getAppBar lift mdc
    , navigation = Nothing
    , progress = Nothing
    }


getDrawer : (Msg m -> m) -> Material.Model m -> Drawer.Header m
getDrawer lift mdc =
    { title =
        Button.view (lift << Mdc)
            "login-button"
            mdc
            [ Button.ripple
            , Options.onClick (lift Click)
            ]
            [ text "Log in"
            ]
    , subtitle = Html.map lift (text "")
    }

getAppBar : (Msg m -> m) -> Material.Model m -> AppBar.Config m
getAppBar lift mdc =
    {title = text "Start Page",
    action_items = [("person",[])],
    other = [
        {- Button.view (lift << Mdc)
            "login-button2"
            mdc
            [ Button.ripple
            , Options.onClick (lift Click)
            , Button.dense
            , Button.raised
            ]
            [ text "Log in"
            ] -}
    ]}

longBody : Html m 
longBody = 
    Html.div [][
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"],
        Html.p [][text "Line"]
        
    ]
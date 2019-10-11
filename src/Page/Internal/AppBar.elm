module Page.Internal.AppBar exposing (Config, Model, Msg(..), defaultModel, update, view)

import Html exposing (Html, text)
import Material
import Material.Options as Options
import Material.TopAppBar as TopAppBar
import Material.Icon as Icon
import Page.Internal.Drawer as Drawer
import Dict exposing (Dict)


type Msg m
    = Mdc (Material.Msg m)
    | DrawerMsg (Drawer.Msg m)
    | OpenOverflow


type alias Model m =
    { mdc : Material.Model m
    , overflow : Bool
    }


type alias Config m =
    { title : Html m,
    action_items : List (String, List (Icon.Property m)),
    other : List (Html m)}


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    , overflow = False
    }


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        DrawerMsg msg_ ->
            ( model, Cmd.none )

        OpenOverflow ->
            ( { model | overflow = True }, Cmd.none )


view : (Msg m -> m) -> Model m -> Config m -> m -> Html m
view lift model config drawer_callback =
    TopAppBar.view (lift << Mdc)
        "my-top-app-bar"
        model.mdc
        [ 
 --           Options.css "background-image" "url('../static/images/start_page.jpg')"
--        , Options.css "background-position" "center"
        ]
        [ TopAppBar.section [ TopAppBar.alignStart ]
            [ TopAppBar.navigationIcon (lift << Mdc)
                "my-menu"
                model.mdc
                --                []
                [ Options.onClick drawer_callback ]
                "menu"
            ]
        , TopAppBar.section []
            [TopAppBar.title [] [config.title]]
        , TopAppBar.section [ TopAppBar.alignEnd ]
            {- [ TopAppBar.actionItem [] "file_download"
               , TopAppBar.actionItem [] "print"
               , TopAppBar.actionItem [] "bookmark"
               ]
            -}
            --[ TopAppBar.actionItem (lift << Mdc) "options" model.mdc [ Options.onClick (lift OpenOverflow) ] "more_vert" ]
            (List.concat [(viewActionItems lift model config), config.other])
        ]

viewActionItems : (Msg m -> m) -> Model m -> Config m -> List (Html m)
viewActionItems lift model config =
    List.map (\(name,properties) -> TopAppBar.actionItem (lift<<Mdc) ("my"++name) model.mdc properties name) config.action_items
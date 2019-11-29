module Page.Internal.AppBar exposing (ActionItem, Config, Model, Msg(..), defaultModel, update, view)

import Dict exposing (Dict)
import Html exposing (Html, text)
import Material
import Material.Icon as Icon
import Material.Options as Options
import Material.TopAppBar as TopAppBar
import Page.Internal.Drawer as Drawer


type Msg m
    = Mdc (Material.Msg m)
    | DrawerMsg (Drawer.Msg m)
    | OpenOverflow


type alias Model m =
    { mdc : Material.Model m
    , overflow : Bool
    }


type alias ActionItem m =
    { icon : String
    , configs : List (Icon.Property m)
    }


type alias Config m =
    { title : Html m
    , action_items : List (ActionItem m)
    , other : List (Html m)
    }


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
        [--           Options.css "background-image" "url('../static/images/start_page.jpg')"
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
            [ TopAppBar.title [] [ config.title ] ]
        , TopAppBar.section [ TopAppBar.alignEnd ]
            {- [ TopAppBar.actionItem [] "file_download"
               , TopAppBar.actionItem [] "print"
               , TopAppBar.actionItem [] "bookmark"
               ]
            -}
            --[ TopAppBar.actionItem (lift << Mdc) "options" model.mdc [ Options.onClick (lift OpenOverflow) ] "more_vert" ]
            (List.concat [ viewActionItems lift model config, config.other ])
        ]


viewActionItems : (Msg m -> m) -> Model m -> Config m -> List (Html m)
viewActionItems lift model config =
    List.map (\item -> TopAppBar.actionItem (lift << Mdc) ("my" ++ item.icon) model.mdc item.configs item.icon) config.action_items

module Page.Home exposing (..)

import Page.Internal exposing (Document)
import Data
import Db exposing (Db, Row)
import Db.Extra
import Entities.Coder as Coder
import Entities.Coding as Coding
import Html exposing (Html, div, h2, text)
import Id exposing (Id)
import Json.Decode as Decode
import Material
import Material.List as Lists
import Material.SimplifiedList as SL
import Material.SimplifiedCard as SC



type Msg m
    = Mdc (Material.Msg m)
    | ListMsg (SL.Msg m (Row Coding.Model))
    | CardMsg (SC.Msg m)


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        ListMsg (SL.Select coding) -> 
            (model, Cmd.none)

        ListMsg (SL.Mdc msg_) -> 
            Material.update (lift << Mdc) msg_ model
        
        ListMsg SL.Noop -> 
            (model, Cmd.none)
            
        CardMsg (SC.Mdc msg_) -> 
            Material.update (lift << Mdc) msg_ model

type Error
    = DecodeError Decode.Error


type alias Model m =
    { mdc : Material.Model m
    }


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    }


view : (Msg m -> m) -> Model m -> Data.Model -> Row Coder.Model -> Document m
view lift model data user =
    { title = "Home"
    , body =
        text "My codings in Process:" :: viewCodings lift model data user :: []
    , progress = Page.Internal.HideProgress
    , navigation = Page.Internal.HideNavigation
    }


viewCodings : (Msg m -> m) -> Model m -> Data.Model -> Row Coder.Model -> Html m
viewCodings lift model data coder =
    Db.Extra.selectFrom data.codings (\c -> c.coder) (Db.fromList [ coder ])
        |> Db.toList
        |> SL.view (lift<<ListMsg) model.mdc (codingRowToListItem data)


codingRowToListItem : Data.Model -> Row Coding.Model -> SL.Item
codingRowToListItem data ( id, model ) =
    let
        ( qid, questionary ) =
            Data.selectQuestionaryFromCoding data ( id, model )
    in
    { icon = "person"
    , primary = questionary.name
    , secondary = Id.toString id
    }


viewCoding : Data.Model -> ( Id Coding.Model, Coding.Model ) -> Lists.ListItem m
viewCoding data ( id, model ) =
    let
        ( qid, questionary ) =
            Data.selectQuestionaryFromCoding data ( id, model )
    in
    Lists.li []
        [ Lists.graphicIcon [] "person"
        , Lists.text []
            [ Lists.primaryText []
                [ text questionary.name
                ]
            , Lists.secondaryText []
                [ text (Id.toString id)
                ]
            ]
        , Lists.metaIcon [] "info"
        ]


module Page.Home exposing (..)

import Page.Internal exposing (Document)
import Data.Navigation as Nav
import Data
import Data.Internal as I
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
import Material.LayoutGrid as LayoutGrid



type Msg m
    = Mdc (Material.Msg m)
    | ListMsg (SL.Msg m (Row Coding.Model))
    | CardMsg (SC.Msg m (Row Coding.Model))

type OutMsg 
    = GotSelection (Row Coding.Model)



update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m, Maybe OutMsg )
update lift msg model =
    case msg of
        Mdc msg_ ->
            let 
                (md,effect) = 
                    Material.update (lift << Mdc) msg_ model
            in
                (md,effect,Nothing)
        ListMsg lmsg_ -> 
            case lmsg_ of
                SL.Select coding -> 
                    (model, Cmd.none, Just(GotSelection coding))
                SL.Mdc mdcmsg_ -> 
                    update lift (Mdc mdcmsg_) model
                SL.Noop ->
                    (model, Cmd.none, Nothing)
        CardMsg (SC.Mdc msg_) -> 
            update lift (Mdc msg_) model
        CardMsg (SC.Select coding) ->
            (model, Cmd.none, Just(GotSelection coding))
    
type Error
    = DecodeError Decode.Error


type alias Model m =
    { mdc : Material.Model m
    }


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    }


view : Maybe (Row Coding.Model) -> (Msg m -> m) -> Model m -> I.Model-> Row Coder.Model -> Document m
view coding lift model data user =
    { title = "Home"
    , body = [viewBody lift model data user coding]
    , progress = Nothing
    , navigation = Nothing
    , appbar = {title = text "Home",
                action_items = [],
                other = [] }
    }

viewBody : (Msg m -> m) -> Model m -> I.Model -> Row Coder.Model -> Maybe (Row Coding.Model) -> Html m
viewBody lift model data user coding =
    LayoutGrid.view []
        (List.concat [[
        LayoutGrid.cell [LayoutGrid.span12][
            text "My codings in Process:"
        ]]
        ,(viewCodingsCards lift model data user)
        ,[LayoutGrid.cell [LayoutGrid.span12][
            viewMaybe coding
        ]]])
    

viewMaybe coding = 
    case coding of
        Just (id,value) ->
            text (Id.toString id)
    
        option2 ->
            text "NoCoding"

viewCodings : (Msg m -> m) -> Model m -> I.Model-> Row Coder.Model -> Html m
viewCodings lift model data coder =
    Db.Extra.selectFrom data.codings (\c -> c.coder) (Db.fromList [ coder ])
        |> Db.toList
        |> SL.view (lift<<ListMsg) model.mdc (codingRowToListItem data)

viewCodingsCards : (Msg m -> m) -> Model m -> I.Model -> Row Coder.Model -> List (Html m)
viewCodingsCards lift model data coder = 
    let
        cards =
            Db.Extra.selectFrom data.codings (\c -> c.coder) (Db.fromList [ coder ])
                |> Db.toList
                |> List.map coding2card
                |> List.map (SC.view (lift<<CardMsg) model.mdc)
                |> List.map (\x -> LayoutGrid.cell [LayoutGrid.span4][x])
    in
        cards

coding2card : Row Coding.Model -> SC.Card (Row Coding.Model)
coding2card (id, value) = 
    {title = Id.toString id,
    subtitle = Nothing,
    description = Nothing,
    return_value = (id, value)}

codingRowToListItem : I.Model-> Row Coding.Model -> SL.Item
codingRowToListItem data (id,coding) =
    let
        row = [(id,coding)]
              |> Db.fromList
              |> Nav.coding2questionary data
              |> Db.toList
              |> List.head
    in
        case row of
            Just ( qid, questionary ) ->
                { icon = "person"
                , primary = questionary.name
                , secondary = Id.toString id
                }
        
            Nothing ->
                { icon = "error"
                , primary = "Invalid Questionary"
                , secondary = Id.toString id
                }
    


viewCoding : I.Model-> Row Coding.Model -> Lists.ListItem m
viewCoding data ( id, coding ) =
    let
        row = [(id,coding)]
              |> Db.fromList
              |> Nav.coding2questionary data
              |> Db.toList
              |> List.head
    in
        case row of
            Just ( qid, questionary ) ->
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
        
            Nothing ->
                Lists.li []
                    [ Lists.graphicIcon [] "person"
                    , Lists.text []
                        [ Lists.primaryText []
                            [ text "Invalid Questionary"
                            ]
                        , Lists.secondaryText []
                            [ text (Id.toString id)
                            ]
                        ]
                    , Lists.metaIcon [] "info"
                    ]


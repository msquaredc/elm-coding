module Page.Home exposing (Error(..), Model, Msg(..), OutMsg(..), coding2card, codingRowToListItem, defaultModel, update, view, viewActionItems, viewBody, viewCoding, viewCodings, viewCodingsCards, viewMaybe)

import Data
import Data.Internal as I
import Data.Navigation as Nav
import Db exposing (Db, Row)
import Db.Extra
import Entities.Coder as Coder
import Entities.Coding as Coding
import File exposing (File)
import File.Select as Select
import Html exposing (Html, div, h2, text)
import Id exposing (Id)
import Json.Decode as Decode
import Material
import Material.LayoutGrid as LayoutGrid
import Material.List as Lists
import Material.Options as Options
import Material.SimplifiedCard as SC
import Material.SimplifiedList as SL
import Page.Internal exposing (Document)
import Page.Internal.AppBar exposing (ActionItem)


type Msg m
    = Mdc (Material.Msg m)
    | ListMsg (SL.Msg m (Row Coding.Model))
    | CardMsg (SC.Msg m (Row Coding.Model))
    | GotFile File
    | Pick


type OutMsg
    = GotSelection (Row Coding.Model)
    | Upload


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m, Maybe OutMsg )
update lift msg model =
    case msg of
        Mdc msg_ ->
            let
                ( md, effect ) =
                    Material.update (lift << Mdc) msg_ model
            in
            ( md, effect, Nothing )

        ListMsg lmsg_ ->
            case lmsg_ of
                SL.Select coding ->
                    ( model, Cmd.none, Just (GotSelection coding) )

                SL.Mdc mdcmsg_ ->
                    update lift (Mdc mdcmsg_) model

                SL.Noop ->
                    ( model, Cmd.none, Nothing )

        CardMsg (SC.Mdc msg_) ->
            update lift (Mdc msg_) model

        CardMsg (SC.Select coding) ->
            ( model, Cmd.none, Just (GotSelection coding) )
        Pick ->
            ( model
            , Cmd.map lift (Select.file ["text/csv"] GotFile)
            , Nothing
            )
        GotFile file ->
            (model,Cmd.none, Nothing)



{- UploadButtonClicked ->
   (model, Cmd.none, Just Upload)
-}


type Error
    = DecodeError Decode.Error


type alias Model m =
    { mdc : Material.Model m
    }


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    }


view : Maybe (Row Coding.Model) -> (Msg m -> m) -> Model m -> I.Model -> Row Coder.Model -> Document m
view coding lift model data user =
    { title = "Home"
    , body = [ viewBody lift model data user coding ]
    , progress = Nothing
    , navigation = Nothing
    , appbar =
        { title = text "Home"
        , action_items = viewActionItems lift model data
        , other = []
        }
    }


viewActionItems : (Msg m -> m) -> Model m -> I.Model -> List (ActionItem m)
viewActionItems lift model data =
    [ { icon = "publish"
      , configs = [ Options.onClick (lift Pick) ]
      }
    ]


viewBody : (Msg m -> m) -> Model m -> I.Model -> Row Coder.Model -> Maybe (Row Coding.Model) -> Html m
viewBody lift model data user coding =
    LayoutGrid.view []
        (List.concat
            [ [ LayoutGrid.cell [ LayoutGrid.span12 ]
                    [ text "My codings in Process:"
                    ]
              ]
            , viewCodingsCards lift model data user
            , [ LayoutGrid.cell [ LayoutGrid.span12 ]
                    [ viewMaybe coding
                    ]
              ]
            ]
        )


viewMaybe coding =
    case coding of
        Just ( id, value ) ->
            text (Id.toString id)

        option2 ->
            text "NoCoding"


viewCodings : (Msg m -> m) -> Model m -> I.Model -> Row Coder.Model -> Html m
viewCodings lift model data coder =
    Db.Extra.selectFrom data.codings (\c -> c.coder) (Db.fromList [ coder ])
        |> Db.toList
        |> SL.view (lift << ListMsg) model.mdc (codingRowToListItem data)


viewCodingsCards : (Msg m -> m) -> Model m -> I.Model -> Row Coder.Model -> List (Html m)
viewCodingsCards lift model data coder =
    let
        cards =
            Db.Extra.selectFrom data.codings (\c -> c.coder) (Db.fromList [ coder ])
                |> Db.toList
                |> List.map coding2card
                |> List.map (SC.view (lift << CardMsg) model.mdc)
                |> List.map (\x -> LayoutGrid.cell [ LayoutGrid.span4 ] [ x ])
    in
    cards


coding2card : Row Coding.Model -> SC.Card (Row Coding.Model)
coding2card ( id, value ) =
    { title = Id.toString id
    , subtitle = Nothing
    , description = Nothing
    , return_value = ( id, value )
    }


codingRowToListItem : I.Model -> Row Coding.Model -> SL.Item
codingRowToListItem data ( id, coding ) =
    let
        row =
            [ ( id, coding ) ]
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


viewCoding : I.Model -> Row Coding.Model -> Lists.ListItem m
viewCoding data ( id, coding ) =
    let
        row =
            [ ( id, coding ) ]
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

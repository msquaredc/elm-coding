module Page.Home exposing (..)

import Browser exposing (Document)
import Data
import Html exposing (Html, div, h2, text)
import Json.Decode as Decode
import Material
import Material.List as Lists
import Entities.Coder as Coder
import Entities.Coding as Coding
import Db exposing (Db,Row)
import Id exposing (Id)
import Db.Extra
import Html exposing (text)
{- import Material.Button as Button
import Material.Card as Card
import Material.IconButton as IconButton
import Material.Options as Options exposing (styled, css)
import Material.Typography as Typography -}



type Msg m
    = Mdc (Material.Msg m)
    | Select Int


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model
        Select index -> 
            (model, Cmd.none)

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
    }


viewCodings : (Msg m -> m) -> Model m -> Data.Model -> Row Coder.Model -> Html m
viewCodings lift model data coder = 
    Db.Extra.selectFrom data.codings (\c -> c.coder) (Db.fromList [coder])
    |> Db.toList
    |> List.map (viewCoding data)
    |> viewCodingList lift model

viewCoding : Data.Model -> (Id Coding.Model, Coding.Model) -> Lists.ListItem m
viewCoding data (id, model) =
    let
        (qid,questionary) = Data.selectQuestionaryFromCoding data (id, model)
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

viewCodingCards : (Msg m -> m) -> Model m -> List (Lists.ListItem m)-> Html m
viewCodingCards lift model codings = 
    Card.view
        [ css "width" "350px"
        ]
        [ Card.media
              [ Card.aspect16To9
              , Card.backgroundImage "images/16-9.jpg"
              ]
              []
        , styled Html.div
              [ css "padding" "1rem"
              ]
              [ styled Html.h2
                [ Typography.title
                , css "margin" "0"
                ]
                [ text "Our Changing Planet"
                ]
              , styled Html.h3
                [ Typography.subheading1
                , css "margin" "0"
                ]
                [ text "by Kurt Wagner"
                ]
              ]
        , styled Html.div
              [ css "padding" "0 1rem 8px 1rem"
              , css "color" "rgba(0, 0, 0, 0.54)"
              , Typography.body1
              ]
              [ text """
    Visit ten places on our planet that are undergoing the
    biggest changes today."""
              ]
        , Card.actions []
              [ Card.actionButtons []
                    [ Button.view Mdc "my-read-action" model.mdc
                          [ Card.actionButton
                          , Button.ripple
                          ]
                          [ text "Read"
                          ]
                    ]
              , Card.actionIcons []
                    [ IconButton.view Mdc "my-favorite-action" model.mdc
                          [ Card.actionIcon
                          , IconButton.icon
                            { on = "favorite"
                            , off = "favorite_border"
                            }
                          , IconButton.label
                            { on = "Remove from favorites"
                            , off = "Add to favorites"
                            }
                          ]
                          []
                    ]
              ]
        ]

viewCodingList :(Msg m -> m) -> Model m -> List (Lists.ListItem m)-> Html m
viewCodingList lift model codings = 
    Lists.ul (lift<<Mdc) "my-list" model.mdc
        [ Lists.twoLine
        , Lists.avatarList
        , Lists.onSelectListItem (lift << Select)
        ]
        codings

viewError : Error -> Html m
viewError error =
    case error of
        DecodeError err ->
            text (Decode.errorToString err)

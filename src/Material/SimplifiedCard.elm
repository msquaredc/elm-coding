module Material.SimplifiedCard exposing (..)

import Html exposing (text,Html)
import Material
import Material.Button as Button
import Material.Card as Card
import Material.IconButton as IconButton
import Material.Options as Options exposing (styled, css)
import Material.Typography as Typography

type alias Model m
    = {mdc : Material.Model m}

type Msg m a
    = Mdc (Material.Msg m)
    | Select a

type alias Card a
      = {title : String
      , subtitle : Maybe String
      , description : Maybe String
      , return_value : a}

view : (Msg m a -> m) -> Material.Model m -> Card a -> Html m
view lift mdc card =
    Card.view
        [ 
--              css "width" "350px"
            Card.stroked
            , Card.fullBleed 
        ]
        [ Card.primaryAction [Options.onClick ((lift << Select) card.return_value) ] [
            Card.media
                  [ Card.aspect16To9
                  , Card.backgroundImage "images/16-9.jpg"
                  ]
                  []
            , styled Html.div
                  [ 
                        css "padding" "1rem"
                  ]
                  [ styled Html.h2
                  [ Typography.title
                  , css "margin" "0"
                  ]
                  [ text card.title
                  ]
                  , viewSubtitle card]
            , styled Html.div
                  [ css "padding" "0 1rem 8px 1rem"
                  , css "color" "rgba(0, 0, 0, 0.54)"
                  , Typography.body1
                  ]
                  [ text """
      Visit ten places on our planet that are undergoing the
      biggest changes today."""
                  ]
            ]
        , Card.actions []
              [ Card.actionButtons []
                    [ Button.view (lift << Mdc) "my-read-action" mdc
                          [ Card.actionButton
                          , Button.ripple
                          ]
                          [ text "Read"
                          ]
                    ]
              , Card.actionIcons []
                    [ IconButton.view (lift << Mdc) "my-favorite-action" mdc
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

viewSubtitle : Card a -> Html m
viewSubtitle card = 
      case card.subtitle of
          Nothing ->
            Html.div [][]
          Just subtitle->
              styled Html.h3
                [ Typography.subheading1
                , css "margin" "0"
                ]
                [ text "by Kurt Wagner"
                ]
              
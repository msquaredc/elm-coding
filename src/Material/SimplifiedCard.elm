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

type Msg m 
    = Mdc (Material.Msg m)

view : (Msg m -> m) -> Model m -> Html m
view lift model =
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
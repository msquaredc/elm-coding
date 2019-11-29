module Page.Upload exposing (Model, Msg(..), OutMsg(..), defaultModel, update, view, viewBody)

import Html exposing (Html, text)
import Html.Attributes exposing (style)
import Html.Events exposing (preventDefaultOn)
import File exposing (File)
import File.Select as Select
import Json.Decode as D
import Material
import Material.LayoutGrid as LayoutGrid
import Page.Internal exposing (Document)


type Msg m
    = Mdc (Material.Msg m)
    | Pick
    | DragEnter
    | DragLeave
    | GotFiles File (List File)


type alias Model m =
    { mdc : Material.Model m
    , hover : Bool
    , files : List File
    }


type OutMsg
    = Found


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    , hover = False
    , files = []
    }


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m, Maybe OutMsg )
update lift msg model =
    case msg of
        Mdc msg_ ->
            let
                ( newmodel, effect ) =
                    Material.update (lift << Mdc) msg_ model
            in
            ( newmodel, effect, Nothing )
        Pick ->
            ( model
            , Cmd.map lift (Select.files ["text/csv"] GotFiles)
            , Nothing
            )

        DragEnter ->
            ( { model | hover = True }
            , Cmd.none
            , Nothing
            )

        DragLeave ->
            ( { model | hover = False }
            , Cmd.none
            , Nothing
            )

        GotFiles file files ->
            ( { model
                    | files = file :: files
                    , hover = False
                }
            , Cmd.none
            , Nothing
            )


view : (Msg m -> m) -> Model m -> a -> Document m
view lift model data =
    { title = "Nö"
    , body = viewBody lift model.mdc model
    , appbar =
        { action_items = []
        , other = []
        , title = text "hi"
        }
    , progress = Nothing
    , navigation = Nothing
    }


viewBody : (Msg m -> m) -> Material.Model m -> Model m -> List (Html m)
viewBody lift mdc model =
    [ LayoutGrid.view []
        [ LayoutGrid.cell
            [ LayoutGrid.span12Desktop
            , LayoutGrid.span8Tablet
            , LayoutGrid.span4Phone
            ]
            [ Html.div
                [ style "border"
                    (if model.hover then
                        "6px dashed purple"

                     else
                        "6px dashed #ccc"
                    )
                , style "border-radius" "20px"
                , style "height" "100px"
                , style "margin" "100px auto"
                , style "padding" "20px"
                , style "display" "flex"
                , style "flex-direction" "column"
                , style "justify-content" "center"
                , style "align-items" "center"
                , hijackOn "dragenter" (D.succeed (lift DragEnter))
                , hijackOn "dragover" (D.succeed (lift DragEnter))
                , hijackOn "dragleave" (D.succeed (lift DragLeave))
                , hijackOn "drop" (dropDecoder lift)
                ]
                [ Html.button [ Html.Events.onClick (lift Pick) ] [ text "Upload Images" ]
                ]
            ]
        ]
    ]

dropDecoder : (Msg m -> m ) -> D.Decoder m
dropDecoder lift =
    D.at ["dataTransfer","files"] (D.oneOrMore (GotFiles) File.decoder)
    |> D.map lift


hijackOn : String -> D.Decoder msg -> Html.Attribute msg
hijackOn event decoder =
  preventDefaultOn event (D.map hijack decoder)


hijack : msg -> (msg, Bool)
hijack msg =
  (msg, True)
module Page.Login exposing (Model, Msg(..), defaultModel, update, view)

import Browser exposing (Document)
import Data
import Db exposing (Db)
import Id exposing (Id)
import Entities.Coder as Coder
import Html exposing (Html, text,div, button,p,input)
import Html.Events exposing (onClick,onInput)
import Html.Attributes exposing (value,placeholder)
import Material
import Material.Options as Options
import Material.TextField as TextField
import Material.List as Lists
import StringDistance


type alias Model m =
    { user : Maybe (Db.Row Coder.Model)
    , field : String
    , var : Int
    , mdc : Material.Model m
    }


type Msg m
    = UpdateTextField String
    | Mdc (Material.Msg m)
    | Decrement
    | Increment


defaultModel : Model m
defaultModel =
    { user = Nothing
    , field = ""
    , mdc = Material.defaultModel
    , var = 0
    }



{- update : Msg-> Model -> ( Model, Cmd Msg )
   update msg model =
       case msg of
           UpdateTextField txt ->
               ( {model | field = txt}, Cmd.none )
           Mdc mmsg ->
               Material.update Mdc mmsg model
-}


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        UpdateTextField txt ->
            ( { model | field = txt }, Cmd.none )
        Increment ->
            ( { model | var = model.var+1 }, Cmd.none )

        Decrement ->
            ( { model | var = model.var-1 }, Cmd.none )


view : (Msg m -> m) -> Model m -> Data.Model -> Document m
view lift model data =
    case model.user of
        Nothing ->
           viewSearch lift model data

        Just row ->
            { title = "Already logged in as"
            , body = [ text "You're already logged in as" ]
            }

viewSearch :  (Msg m -> m) -> Model m -> Data.Model -> Document m
viewSearch lift model data = 
    { title = "Please log in."
    , body = [ text "You're not logged in yet."
             , p[][ask lift model data]
             , p[][showResults lift model.field data.coders model]]
            }

ask : (Msg m -> m) -> Model m -> Data.Model -> Html m
ask lift model data =
    TextField.view (lift << Mdc)
        "my-text-field"
        model.mdc
        [ TextField.label "Text field"
        , Options.onInput (lift << UpdateTextField)
        , TextField.outlined
        , Options.cs "demo-text-field-outlined-shaped"
        ]
        []

showResults : (Msg m -> m) -> String -> Db Coder.Model -> Model m -> Html m
showResults lift name db model = 
    let
        rows = db
                |> Db.toList
                |> List.filter (\(i, m) -> String.startsWith name m.name)
                |> toPersonList lift model
    in
        rows

myDistance : String -> String -> Float
myDistance fullname seq =
    let 
        names = String.split " " fullname
        maymax =  List.map (StringDistance.sift3Distance seq) names
                    |> List.maximum 
    in
        case maymax of
            Just value ->
                value
            Nothing ->
                0.0

viewCoderRow : (Id Coder.Model, Coder.Model) -> Lists.ListItem m
viewCoderRow (id,model) = 
    Lists.li []
        [ Lists.graphicIcon [] "person"
        , Lists.text []
            [ Lists.primaryText []
                    [ text model.name
                    ]
            , Lists.secondaryText []
                    [ text (Id.toString id)
                    ]
            ]
        , Lists.metaIcon [] "info"
        ]


ask2 : (Msg m -> m) -> Model m -> Data.Model -> Html m
ask2 lift model data =
    Html.map lift (
        div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model.var) ]
        , button [ onClick Increment ] [ text "+" ]
    ])

toPersonList : (Msg m -> m) -> Model m -> List(Db.Row Coder.Model) -> Html m
toPersonList lift model persons  = 
    Lists.ul (lift<<Mdc) "my-list" model.mdc
        [ Lists.twoLine
        , Lists.avatarList
        ]
        (List.map viewCoderRow persons)
        



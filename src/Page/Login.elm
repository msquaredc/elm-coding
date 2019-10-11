module Page.Login exposing (Model, Msg(..), defaultModel, update, view, getFilteredList)

--import Browser exposing (Document)
import Data
import Data.Internal as I
import Db exposing (Db, Row)
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
import List.Extra
import Page.Url exposing (..)
import Page.Internal exposing (Document)
import Entities.Coder as Coder

type alias Model m =
    {field : String
    , var : Int
    , mdc : Material.Model m
    , next : Page.Url.Url
    }


type Msg m
    = UpdateTextField String
    | Mdc (Material.Msg m)
    | Select Int


defaultModel : Model m
defaultModel =
    { field = ""
    , mdc = Material.defaultModel
    , var = 0
    , next = Page.Url.Home
    }



{- update : Msg-> Model -> ( Model, Cmd Msg )
   update msg model =
       case msg of
           UpdateTextField txt ->
               ( {model | field = txt}, Cmd.none )
           Mdc mmsg ->
               Material.update Mdc mmsg model
-}


update : (Msg m -> m) -> Msg m -> Model m -> I.Model -> ( Model m, Cmd m )
update lift msg model data =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        UpdateTextField txt ->
            ( { model | field = txt }, Cmd.none )
        
        Select index -> 
            ( model, Cmd.none)
        
getFilteredList : Db Coder.Model -> String -> List (Db.Row Coder.Model)
getFilteredList db name = 
    db
    |> Db.toList
    |> List.filter (\(i, m) -> String.startsWith (String.toLower name) (String.toLower m.name))


view : (Msg m -> m) -> Model m -> I.Model-> Maybe (Row Coder.Model)-> Document m
view lift model data user =
    case user of
        Nothing ->
           viewSearch lift model data

        Just row ->
            { title = "Already logged in as"
            , body = [ text "You're already logged in as" ]
            , progress = Just (Page.Internal.Progress 1.0)
            , navigation = Nothing
            , drawer = { header = Nothing, locations = [], favourites = [] }
            , appbar = {title = text "Login",
                action_items = [],
                other = [] }
            }

viewSearch :  (Msg m -> m) -> Model m -> I.Model-> Document m
viewSearch lift model data = 
    { title = "Please log in."
    , body = [ text "You're not logged in yet."
             , p[][ask lift model data]
             , p[][showResults lift model.field data.coders model]]
    , progress = Nothing
    , drawer = { header = Nothing, locations = [], favourites = [] }
    , appbar = {title = text "Login",
                action_items = [],
                other = [] }
    , navigation = Nothing}

ask : (Msg m -> m) -> Model m -> I.Model-> Html m
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
    toPersonList lift model (getFilteredList db name)
    

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


{- ask2 : (Msg m -> m) -> Model m -> I.Model-> Html m
ask2 lift model data =
    Html.map lift (
        div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model.var) ]
        , button [ onClick Increment ] [ text "+" ]
    ]) -}

toPersonList : (Msg m -> m) -> Model m -> List(Db.Row Coder.Model) -> Html m
toPersonList lift model persons  = 
    Lists.ul (lift<<Mdc) "my-list" model.mdc
        [ Lists.twoLine
        , Lists.avatarList
        , Lists.onSelectListItem (lift <<Select)
        ]
        (List.map viewCoderRow persons)
        



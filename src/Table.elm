module Table exposing (Model, Msg(..), ResearchRow, TableRow, UserRow, error, getAllUser, update, view)

import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (..)
import Maybe.Extra exposing (..)


type Msg
    = Noop


type alias Model =
    { rows : List TableRow
    }


type alias TableRow =
    { user : UserRow
    , research : ResearchRow
    }


type alias UserRow =
    Dict String String


type alias ResearchRow =
    Dict String String


errorResearchRow : ResearchRow
errorResearchRow =
    Dict.fromList [ ( "error", "error" ) ]


errorUserRow : UserRow
errorUserRow =
    Dict.fromList [ ( "error", "error" ) ]


error : Model
error =
    Model [ TableRow errorUserRow errorResearchRow ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )


getAllUser : Model -> List UserRow
getAllUser model =
    List.map .user model.rows


getTableHeader : Model -> List String
getTableHeader model =
    getUserHeader model ++ getResearchHeader model


getUserHeader : Model -> List String
getUserHeader model =
    case List.head model.rows of
        Just row ->
            Dict.keys row.user

        Nothing ->
            []


getResearchHeader : Model -> List String
getResearchHeader model =
    case List.head model.rows of
        Just row ->
            Dict.keys row.research

        Nothing ->
            []


view : Model -> Html Msg
view model =
    Html.table [] ([ viewHeader model ] ++ List.indexedMap (viewRow model) model.rows)


viewHeader : Model -> Html Msg
viewHeader model =
    Html.thead [] (List.map viewHeaderCell (getTableHeader model))


viewRow : Model -> Int -> TableRow -> Html Msg
viewRow model index row =
    let
        userCells =
            Maybe.Extra.values (List.map (\x -> Dict.get x row.user) (getUserHeader model))

        researchCells =
            Maybe.Extra.values (List.map (\x -> Dict.get x row.research) (getResearchHeader model))
    in
    Html.tr [] (List.map viewCell userCells ++ List.map viewCell researchCells)


viewCell : String -> Html Msg
viewCell value =
    Html.td [] [ text value ]


viewHeaderCell : String -> Html Msg
viewHeaderCell value =
    Html.th [] [ text value ]

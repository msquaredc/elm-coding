module Form exposing (InputType(..), Model, Msg, decoder, update, view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode exposing (..)
import Number.Bounded as Bounded exposing (..)


type InputType
    = InputString
    | InputNumber (Maybe (Bounded Int))
    | InputChoice


type Msg
    = Change Int String
    | Message


type alias Model =
    { forms : List Form }


type alias Form =
    { label : String
    , formtype : InputType
    , content : String
    }


decoder =
    Decode.list
        (Decode.map3 Form
            (Decode.field "label" Decode.string)
            (Decode.field "formtype" inputTypeDecoder)
            (Decode.succeed "")
        )


inputTypeDecoder =
    Decode.string
        |> Decode.andThen
            (\str ->
                case str of
                    "String" ->
                        Decode.succeed InputString

                    "Number" ->
                        Decode.succeed (InputNumber (Just (Bounded.between 1 10)))

                    somethingElse ->
                        Decode.fail <| "Unknown Type: " ++ somethingElse
            )


view : Model -> Html Msg
view model =
    List.indexedMap viewForm model.forms


viewForm : Int -> Form -> Html Msg
viewForm index form =
    case form.formtype of
        InputString ->
            viewInputString index form

        InputNumber n ->
            viewInputNumber index form n

        InputChoice ->
            viewInputChoice index form


viewInputString : Int -> Form -> Html Msg
viewInputString index model =
    Html.div
        []
        [ text model.label
        , Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value model.content
            , Html.Events.onInput (Change index)
            ]
            []
        , text model.content
        ]


viewInputNumber : Int -> Form -> Maybe (Bounded Int) -> Html Msg
viewInputNumber index model bounds =
    Html.div
        []
        [ text model.label
        , Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value model.content
            , Html.Events.onInput (Change index)
            ]
            []
        , text model.content
        ]


viewInputChoice : Int -> Form -> Html Msg
viewInputChoice index model =
    Html.div
        []
        [ text model.label
        , Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value model.content
            , Html.Events.onInput (Change index)
            ]
            []
        , text model.content
        ]


updateElement list id value =
    let
        alter idx form =
            if id == idx then
                { form | content = value }

            else
                form
    in
    List.indexedMap alter list


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Change index newContent ->
            let
                forms_ =
                    model.forms
            in
            ( { model | forms = forms_ }, Cmd.none )

        Message ->
            ( model, Cmd.none )

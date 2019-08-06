module Form exposing (InputType(..), Model, Msg, decoder, error, update, view, inputTypeDecoder)

import Dict exposing (..)
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
    = Change String


type alias Model =
    { label : String
    , formtype : InputType
    , content : String
    }


error =
    Model "Error" InputString "Error"


decoder : Decode.Decoder Model
decoder =
    Decode.map3 Model
        (Decode.field "label" Decode.string)
        (Decode.field "formtype" inputTypeDecoder)
        (Decode.succeed "")


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
    case model.formtype of
        InputString ->
            viewInputString model

        InputNumber n ->
            viewInputNumber model n

        InputChoice ->
            viewInputChoice model


viewInputString : Model -> Html Msg
viewInputString model =
    Html.div
        []
        [ text model.label
        , Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value model.content
            , Html.Events.onInput Change
            ]
            []
        , text model.content
        ]


viewInputNumber : Model -> Maybe (Bounded Int) -> Html Msg
viewInputNumber model bounds =
    Html.div
        []
        [ text model.label
        , Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value model.content
            , Html.Events.onInput Change
            ]
            []
        , text model.content
        ]


viewInputChoice : Model -> Html Msg
viewInputChoice model =
    Html.div
        []
        [ text model.label
        , Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value model.content
            , Html.Events.onInput Change
            ]
            []
        , text model.content
        ]



{- updateCodingQuestion : Dict String Questionary -> String -> String -> Dict String Questionary
   updateCodingQuestion question key value =
       Dict.update key (Maybe.map (\x -> x)) question

   updateElement list id value =
       let
           alter idx form =
               if id == idx then
                   { form | content = value }

               else
                   form
       in
       List.indexedMap alter list

   updateForm : Questionary -> Int -> String -> Questionary
   updateForm questionary index value =
       let newforms = updateElement questionary.coding_questions index value
       in ({questionary | coding_questions = newforms})
-}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Change newContent ->
            ( { model | content = newContent }, Cmd.none )

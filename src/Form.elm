module Form exposing (InputType(..), Model, Msg(..), decoder,inputTypeToComparable, error, inputTypeDecoder, update, view)

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

inputTypeToComparable : InputType -> String
inputTypeToComparable input_type = 
    case input_type of
        InputString ->
            "String"
    
        InputNumber _ ->
            "Number"

        InputChoice ->
            "Choice"


view : InputType -> String -> Html Msg
view formtype value =
    case formtype of
        InputString ->
            viewInputString value

        InputNumber n ->
            viewInputNumber value n

        InputChoice ->
            viewInputChoice value


viewInputString : String -> Html Msg
viewInputString value =
    Html.div
        []
        [ Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value value
            , Html.Events.onInput Change
            ]
            []
        , text value
        ]

viewInputNumber : String -> Maybe (Bounded Int) -> Html Msg
viewInputNumber value bounds =
    Html.div
        []
        [ Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value value
            , Html.Events.onInput Change
            ]
            []
        , text value
        ]


viewInputChoice : String -> Html Msg
viewInputChoice value =
    Html.div
        []
        [ Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value value
            , Html.Events.onInput Change
            ]
            []
        , text value]



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

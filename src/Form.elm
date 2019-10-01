module Form exposing (InputType(..), Model, Msg(..), inputTypeToComparable, inputTypeDecoder, update, view)

import Dict exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode exposing (..)
import Number.Bounded as Bounded exposing (..)
import Material.TextField as TextField
import Material


type InputType
    = InputString
    | InputNumber (Maybe (Bounded Int))
    | InputChoice


type Msg m
    = Change String
    | Mdc (Material.Msg m)


type alias Model m=
    { mdc : Material.Model m
    }


{- error =
    Model "Error" InputString "Error" -}


{- decoder : Decode.Decoder (Model m)
decoder =
    Decode.map3 Model
        (Decode.field "label" Decode.string)
        (Decode.field "formtype" inputTypeDecoder)
        (Decode.succeed "") -}


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


view : (Msg m -> m) -> Material.Model m -> InputType -> String -> Html m
view lift mdc formtype value =
    case formtype of
        InputString ->
            viewInputString lift mdc value

        InputNumber n ->
            viewInputNumber lift mdc value n

        InputChoice ->
            viewInputChoice lift mdc value


viewInputString : (Msg m -> m) -> Material.Model m -> String -> Html m
viewInputString lift mdc value =
    TextField.view (lift << Mdc)
        "my-text-field"
        mdc
        [ TextField.label "Text field"
        --, Options.onInput (lift << UpdateTextField)
        , TextField.outlined
        --, Options.cs "demo-text-field-outlined-shaped"
        ]
        []


viewInputNumber : (Msg m -> m) -> Material.Model m -> String -> Maybe (Bounded Int) -> Html m
viewInputNumber lift mdc value bounds =
    Html.div
        []
        [ Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value value
            , Html.Events.onInput (lift << Change)
            ]
            []
        , text value
        ]


viewInputChoice : (Msg m -> m) -> Material.Model m -> String -> Html m
viewInputChoice lift mdc value =
    Html.div
        []
        [ Html.input
            [ Html.Attributes.placeholder "Your answer"
            , Html.Attributes.value value
            , Html.Events.onInput (lift << Change)
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


update : (Msg m -> m) -> Msg m -> Model m-> ( Model m, Cmd m)
update lift msg model =
    case msg of
        Change newContent ->
            ( model, Cmd.none )
        Mdc msg_ -> 
            Material.update (lift<<Mdc) msg_ model

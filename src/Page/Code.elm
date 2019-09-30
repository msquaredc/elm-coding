module Page.Code exposing (Model, Msg(..), OutMsg(..), defaultModel, getCurrentIndex, getMaxCodingFrameIndex, msgAdapt, update, view, viewAnswer, viewBody, viewCoding, viewCodingForm, viewFormElement, viewFormElements, viewQuestion)

import Data
import Db exposing (Db, Row)
import Db.Extra
import Entities.Answer as Answer
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Coding.Answer as CodingAnswer
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Question as Question
import Form
import Html exposing (Html, div, h2, p, text)
import Id exposing (Id)
import Json.Decode as Decode
import List.Extra
import Material
import Material.LayoutGrid as LayoutGrid
import Material.LinearProgress as LinearProgress
import Material.List as Lists
import Material.Options as Options
import Material.SimplifiedList as SL
import Material.Typography as Typography
import Maybe.Extra
import Page.Internal exposing (Document)
import Set


type alias Model m =
    { mdc : Material.Model m
    }


type OutMsg
    = ChangedAnswer (Id CodingAnswer.Model) String


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    }


type Msg m
    = Mdc (Material.Msg m)
    | Change (Id CodingAnswer.Model) String


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m, Maybe OutMsg )
update lift msg model =
    case msg of
        Mdc msg_ ->
            let
                ( mdcmodel, mdccmd ) =
                    Material.update (lift << Mdc) msg_ model
            in
            ( mdcmodel, mdccmd, Nothing )

        Change caid value ->
            Debug.log "Change triggered"
            ( model, Cmd.none, Just (ChangedAnswer caid value) )


view : (Msg m -> m) -> Model m -> Data.Model -> Row Coding.Model -> Document m
view lift model data coding =
    let
        all_coding_frames =
            Db.Extra.selectFrom data.coding_frames (\c -> c.coding) (Db.fromList [ coding ])

        mb_current =
            Db.toList all_coding_frames
                |> List.Extra.maximumBy (\( id, m ) -> m.timestamp.accessed)
    in
    { title = "Coding"
    , body =
        viewBody lift data mb_current
    , progress = Page.Internal.Progress 0.78
    , navigation = Page.Internal.Paginate 0 (Data.maxCodingFrameIndex data coding)
    }


viewBody : (Msg m -> m) -> Data.Model -> Maybe ( Id CodingFrame.Model, CodingFrame.Model ) -> List (Html m)
viewBody lift data mb_current =
    case mb_current of
        Just current ->
            viewCoding lift data current :: []

        Nothing ->
            [ text "An Error occured while loadeng your Coding Frame" ]


viewCoding : (Msg m -> m) -> Data.Model -> Row CodingFrame.Model -> Html m
viewCoding lift data current =
    let
        answer =
            Db.Extra.get data.answers (\x -> x.answer) current

        question =
            Result.andThen (Db.Extra.get data.questions (\x -> x.question)) answer
    in
    LayoutGrid.view []
        [ LayoutGrid.cell
            [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
            ]
            [ viewQuestion question ]
        , LayoutGrid.cell
            [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
            ]
            [ viewAnswer answer ]
        , LayoutGrid.cell
            [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
            ]
            (viewCodingForm lift (Data.getCodingAnswers data.coding_answers current) data.coding_questions)
        ]


viewQuestion : Result x (Row Question.Model) -> Html m
viewQuestion question =
    let
        text_ =
            case question of
                Ok ( id, value ) ->
                    value.text

                Err error ->
                    "error"
    in
    Options.styled div
        [ Typography.typography
        , Options.css "text-align" "center"
        ]
        [ Options.styled div
            [ Typography.headline6
            ]
            [ Html.text text_
            ]
        ]


viewAnswer : Result x (Row Answer.Model) -> Html m
viewAnswer answer =
    let
        text_ =
            case answer of
                Ok ( id, value ) ->
                    value.value

                Err error ->
                    "error"
    in
    Options.styled div
        [ Typography.typography
        , Options.css "text-align" "center"
        ]
        [ Options.styled div
            [ Typography.headline4
            ]
            [ Html.text text_
            ]
        ]


viewCodingForm : (Msg m -> m) -> List (Row CodingAnswer.Model) -> Db CodingQuestion.Model -> List (Html m)
viewCodingForm lift answers questions =
    let
        f ( a, b ) =
            case a of
                Just value ->
                    Just ( value, b )

                Nothing ->
                    Nothing

        res =
            answers
                |> List.map (\d -> ( Db.Extra.get questions (\c -> c.coding_question) d, d ))
                |> List.map (\( a, b ) -> ( Result.toMaybe a, b ))
                |> List.map f
                |> Maybe.Extra.values

        types =
            List.map (\( a, b ) -> Form.inputTypeToComparable a) (List.map (\( ( id, a ), b ) -> ( a.input_type, b )) res)
                |> List.Extra.unique
    in
    types
        |> List.map (\x -> List.filter (\( ( id, a ), _ ) -> Form.inputTypeToComparable a.input_type == x) res)
        |> List.map (viewFormElements lift)


viewFormElements : (Msg m -> m) -> List ( Row CodingQuestion.Model, Row CodingAnswer.Model ) -> Html m
viewFormElements lift list =
    div []
        (List.map (\( a, b ) -> viewFormElement lift a b) list)


viewFormElement : (Msg m -> m) -> Row CodingQuestion.Model -> Row CodingAnswer.Model -> Html m
viewFormElement lift ( qid, question ) ( aid, answer ) =
    LayoutGrid.view []
        [ LayoutGrid.cell
            [ LayoutGrid.span2Phone
            , LayoutGrid.span4Tablet
            , LayoutGrid.span6Desktop
            ]
            [ text question.text ]
        , LayoutGrid.cell
            [ LayoutGrid.span2Phone
            , LayoutGrid.span4Tablet
            , LayoutGrid.span6Desktop
            ]
            [ Html.map (lift << msgAdapt aid) (Form.view question.input_type answer.value) ]
        ]


msgAdapt : Id CodingAnswer.Model -> Form.Msg -> Msg m
msgAdapt aid msg =
    case msg of
        Form.Change str ->
            Change aid str


getCurrentIndex : Row CodingFrame.Model -> Data.Model -> Int
getCurrentIndex frame data =
    1


getMaxCodingFrameIndex : Row Coding.Model -> Data.Model -> Int
getMaxCodingFrameIndex coding data =
    Data.maxCodingFrameIndex data coding

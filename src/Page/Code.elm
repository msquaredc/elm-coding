module Page.Code exposing (Model, Msg(..), OutMsg(..), defaultModel, getMaxCodingFrameIndex, msgAdapt, update, view, viewAnswer, viewBody, viewCoding, viewCodingForm, viewFormElement, viewFormElements, viewQuestion)

import Data exposing (Direction(..))
import Data.Internal as I
import Data.Access as A
import Data.Validation as Validate
import Data.Navigation as Nav
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
import Material.Button as Button
import Material.Icon as Icon
import Maybe.Extra
import Page.Internal exposing (Document)
import Set


type alias Model m =
    { mdc : Material.Model m
    }


type OutMsg
    = ChangedAnswer (Id CodingAnswer.Model) String
    | Move Data.Direction Data.Object (Row Coding.Model)


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    }


type Msg m
    = Mdc (Material.Msg m)
    | Change (Id CodingAnswer.Model) String
    | Click Data.Direction Data.Object (Row Coding.Model)

type EventSource
    = NextQuestion
    | PreviousQuestion
    | NextAnswer
    | PreviousAnswer

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
            ( model, Cmd.none, Just (ChangedAnswer caid value) )
        Click direction object coding ->
            ( model, Cmd.none, Just (Move direction object coding) )


view : (Msg m -> m) -> Model m -> I.Model-> Row Coding.Model -> Document m
view lift model data coding =
    let
       {-  all_coding_frames =
            Db.Extra.selectFrom data.coding_frames (\c -> c.coding) (Db.fromList [ coding ]) -}

        mb_current = A.current_codingFrame data coding
            {- Db.toList all_coding_frames
                |> List.Extra.maximumBy (\( id, m ) -> m.timestamp.accessed) -}
    in
    { title = "Coding"
    , body =
        viewBody lift model data mb_current coding
    , progress = Just(Page.Internal.Progress 0.78)
    , navigation = Maybe.map (\x -> Page.Internal.Paginate x (Data.maxCodingFrameIndex data coding)) (A.current_codingFrame_index data coding)
    }


viewBody : (Msg m -> m) -> Model m ->  I.Model-> Maybe ( Id CodingFrame.Model, CodingFrame.Model ) -> Row Coding.Model -> List (Html m)
viewBody lift mdc data mb_current coding =
    case mb_current of
        Just current ->
            viewCoding lift mdc data current coding :: [viewDebug data coding]

        Nothing ->
            [ text "An Error occured while loadeng your Coding Frame" ]


viewCoding : (Msg m -> m) -> Model m -> I.Model-> Row CodingFrame.Model -> Row Coding.Model -> Html m
viewCoding lift model data current coding =
    let
        answer =
            Db.Extra.get data.answers (\x -> x.answer) current

        question =
            Result.andThen (Db.Extra.get data.questions (\x -> x.question)) answer
    in
    LayoutGrid.inner []
        [
            LayoutGrid.inner 
                [ LayoutGrid.span4Phone
                    , LayoutGrid.span8Tablet
                    , LayoutGrid.span12Desktop
                ]
                
                [ LayoutGrid.cell
                    [ LayoutGrid.span1Tablet
                    , LayoutGrid.span1Desktop
                    , LayoutGrid.alignMiddle
                    ]
                    [ viewPreviousQuestion lift model.mdc coding 4 10]
                , LayoutGrid.cell
                    [ LayoutGrid.span6Tablet
                    , LayoutGrid.span10Desktop
                    , LayoutGrid.alignMiddle
                    ]
                    [ viewQuestion question ]
                , LayoutGrid.cell
                    [ LayoutGrid.span1Tablet
                    , LayoutGrid.span1Desktop
                    , LayoutGrid.alignMiddle
                    ]
                    [ viewNextQuestion lift model.mdc coding 4 10]
                ]
        ,LayoutGrid.inner 
                [ LayoutGrid.span4Phone
                    , LayoutGrid.span8Tablet
                    , LayoutGrid.span12Desktop
                ]
                [
                    LayoutGrid.cell
                        [ LayoutGrid.span1Tablet
                        , LayoutGrid.span1Desktop
                        , LayoutGrid.alignMiddle
                        ]
                        [ viewPreviousAnswer lift model.mdc data coding 4 10]
                    , LayoutGrid.inner [
                        LayoutGrid.span6Tablet
                        , LayoutGrid.span10Desktop
                        , LayoutGrid.alignMiddle
                        ]
                        [ LayoutGrid.cell
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
                            (viewCodingForm lift model (Data.getCodingAnswers data.coding_answers current) data.coding_questions)
                        ]
                    , LayoutGrid.cell
                        [ LayoutGrid.span1Tablet
                        , LayoutGrid.span1Desktop
                        , LayoutGrid.alignMiddle
                        ]
                        [ viewNextAnswer lift model.mdc data coding 4 10]
                ]
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


viewCodingForm : (Msg m -> m) -> Model m ->List (Row CodingAnswer.Model) -> Db CodingQuestion.Model -> List (Html m)
viewCodingForm lift mdc answers questions =
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
        |> List.map (viewFormElements lift mdc)


viewFormElements : (Msg m -> m) -> Model m -> List ( Row CodingQuestion.Model, Row CodingAnswer.Model ) -> Html m
viewFormElements lift mdc list =
    div []
        (List.map (\( a, b ) -> viewFormElement lift mdc a b) list)


viewFormElement : (Msg m -> m) -> Model m ->  Row CodingQuestion.Model -> Row CodingAnswer.Model -> Html m
viewFormElement lift model ( qid, question ) ( aid, answer ) =
    LayoutGrid.inner []
        [ LayoutGrid.cell
            [ LayoutGrid.span2Phone
            , LayoutGrid.span4Tablet
            , LayoutGrid.span6Desktop
            , LayoutGrid.alignRight
            , LayoutGrid.alignMiddle
            ]
            [ text question.text ]
        , LayoutGrid.cell
            [ LayoutGrid.span2Phone
            , LayoutGrid.span4Tablet
            , LayoutGrid.span6Desktop
            , LayoutGrid.alignLeft
            ]
            [ (Form.view (lift << (msgAdapt aid)) model.mdc question.input_type answer.value) ]
        ]


msgAdapt : Id CodingAnswer.Model -> Form.Msg m -> Msg m
msgAdapt aid msg =
    case msg of
        Form.Change str ->
            Change aid str
        Form.Mdc msg_ -> 
            Mdc msg_


getMaxCodingFrameIndex : Row Coding.Model -> I.Model-> Int
getMaxCodingFrameIndex coding data =
    Data.maxCodingFrameIndex data coding

viewPreviousQuestion : (Msg m -> m) -> Material.Model m -> Row Coding.Model -> Int -> Int -> (Html m)
viewPreviousQuestion lift mdc (id,coding) cur max =
    case cur of
        0 ->
            div [][]
        _ ->
            (Button.view 
                    (lift << Mdc) 
                    "navigation-side-prev-question"
                    mdc
                    [Options.css "height" "48px"
                    , Options.css "width" "48px"
                    , Button.ripple
--                    , Button.outlined
                    , Options.css "border-radius" "24px"
                    , Button.onClick ((lift << (Click Previous (Data.Question Nothing)))  (id,coding))
                    ]
                    
                    [Icon.view [Icon.size24] "navigate_before"]
            )

viewPreviousAnswer : (Msg m -> m) -> Material.Model m -> I.Model -> Row Coding.Model -> Int -> Int -> (Html m)
viewPreviousAnswer lift mdc data (id,coding) cur max =
    case A.has_previous_coding_frame data (id,coding) of
        False ->
            div [][]
        True ->
            (Button.view 
                    (lift << Mdc) 
                    "navigation-side-prev-answer"
                    mdc
                    [Button.ripple
                    , Options.css "height" "64px"
                    , Options.css "width" "64px"
                    , Button.outlined
                    , Options.css "border-radius" "32px"
                    , Button.onClick ((lift << (Click Previous (Data.Answer Nothing))) (id,coding))
                    ]
                    
                    [Icon.view [Icon.size48] "navigate_before"]
            )

viewNextQuestion : (Msg m -> m) -> Material.Model m -> Row Coding.Model -> Int -> Int -> (Html m)
viewNextQuestion lift mdc (id,coding) cur max =
    case cur == max of
        True ->
            div [][]
        False ->
            (Button.view 
                    (lift << Mdc) 
                    "navigation-side-next-question"
                    mdc
                    [Options.css "height" "48px"
                    , Options.css "width" "48px"
--                    , Button.ripple
--                    , Button.outlined
                    , Options.css "border-radius" "24px"
                    , Button.onClick ((lift << (Click Next (Data.Question Nothing)))  (id,coding))
                    ]
                    
                    [Icon.view [Icon.size24] "navigate_next"]
            )

viewNextAnswer : (Msg m -> m) -> Material.Model m -> I.Model -> Row Coding.Model -> Int -> Int -> (Html m)
viewNextAnswer lift mdc data (id,coding) cur max =
    case A.has_next_coding_frame data (id,coding) of
        False ->
            div [][]
        True ->
            (Button.view 
                    (lift << Mdc) 
                    "navigation-side-next-answer"
                    mdc
                    [Button.ripple
                    , Options.css "height" "64px"
                    , Options.css "width" "64px"
                    , Button.outlined
                    , Options.css "border-radius" "32px"
                    , Button.onClick ((lift << (Click Next (Data.Answer Nothing))) (id,coding))
                    ]
                    
                    [Icon.view [Icon.size48] "navigate_next"]
            )
viewDebug : I.Model -> Row Coding.Model -> Html m
viewDebug model (cid,cmodel) =
    let
        coding = (cid, cmodel)
        index = Maybe.withDefault 0 (A.current_codingFrame_index model coding)
        (cfid,cfmodel) = Maybe.withDefault (Id.fromString "Nothing", CodingFrame.empty) (A.current_codingFrame model coding)
        coding_frames = A.sorted_codingFrames model coding
                        |> List.map (\(id,_)-> Id.toString id)
                        |> String.join ", "
        coding_answers = A.current_codingAnswers model coding
                        |> List.map (\(id,_)-> Id.toString id)
                        |> String.join ", "
        coding_questions = A.current_codingQuestions model coding
                            |> List.map (\(id,_)-> Id.toString id)
                            |> String.join ", "
    in
        div []
            [ p[][text ("Current index: " ++ (String.fromInt (index)))]
            , p[][text ("Current coding id: " ++ (Id.toString cid))]
            , p[][text ("Current coding frame: "++ (Id.toString cfid))]
            , p[][text ("All relevant coding frames :"++ coding_frames)]
            , p[][text ("Max CodingFrame index: " ++ String.fromInt (A.max_coding_frame_index model coding))]
            , p[][text ("Current coding answers: " ++ coding_answers)]
            , p[][text ("Current coding questions: "++ coding_questions)]
            ]
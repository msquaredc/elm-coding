module Page.Code exposing (..)

import Page.Internal exposing (Document)
import Data
import Db exposing (Db, Row)
import Db.Extra
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Coding.Answer as CodingAnswer
import Entities.Question as Question
import Entities.Answer as Answer
import Html exposing (Html, div, h2, text,p)
import Id exposing (Id)
import Json.Decode as Decode
import Material
import Material.List as Lists
import Material.SimplifiedList as SL
import Material.LinearProgress as LinearProgress
import Material.LayoutGrid as LayoutGrid
import Material.Typography as Typography
import Material.Options as Options
import List.Extra
import Maybe.Extra
import Set
import Form

type alias Model m =
    { mdc : Material.Model m
    }


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    }

type Msg m
    = Mdc (Material.Msg m)
    | ListMsg (SL.Msg m (Row Coding.Model))
    | DataMsg (Data.Msg)


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        ListMsg (SL.Select coding) -> 
            (model, Cmd.none)

        ListMsg (SL.Mdc msg_) -> 
            Material.update (lift << Mdc) msg_ model
        
        ListMsg SL.Noop -> 
            (model, Cmd.none)

        DataMsg _ -> 
            (model, Cmd.none)


view : (Msg m -> m) -> Model m -> Data.Model -> Row Coding.Model-> Document m
view lift model data coding = 
    let
        all_coding_frames = Db.Extra.selectFrom data.coding_frames (\c -> c.coding) (Db.fromList [coding])
        mb_current = Db.toList all_coding_frames
                     |> List.Extra.maximumBy (\(id,m) -> m.timestamp.accessed)
    in
        { title = "Coding"
        , body =
            viewBody data mb_current
        , progress = Page.Internal.Progress 0.78
        , navigation = Page.Internal.Paginate 0 10
        }
        
viewBody : Data.Model -> Maybe (Id CodingFrame.Model, CodingFrame.Model) -> List(Html m)
viewBody data mb_current = 
    case mb_current of
        Just current ->
            viewCoding data current :: []
    
        Nothing ->
            [text "An Error occured while loadeng your Coding Frame"]
    

viewCoding : Data.Model -> Row CodingFrame.Model -> Html m
viewCoding data current = 
    let
        answer = Db.Extra.get data.answers (\x -> x.answer) current
        question = Result.andThen (Db.Extra.get data.questions (\x -> x.question)) answer
    in
        LayoutGrid.view []
            [ LayoutGrid.cell
                [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
                ]
                [viewQuestion question]
            , LayoutGrid.cell
                [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
                ]
                [viewAnswer answer]
            , LayoutGrid.cell
                [ LayoutGrid.span4Phone
            , LayoutGrid.span8Tablet
            , LayoutGrid.span12Desktop
                ]
                (viewCodingForm (Data.getCodingAnswers data.coding_answers current) data.coding_questions)
            ]
        

viewQuestion : Result x (Row Question.Model) -> Html m
viewQuestion question =
    let
        text_ =
            case question of
            Ok (id,value) ->
                value.text
        
            Err error ->
                "error"
    in
        Options.styled div [Typography.typography,
                            Options.css "text-align" "center"]
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
                Ok (id,value) ->
                    value.value
            
                Err error ->
                    "error"
    in
        Options.styled div [Typography.typography,
                            Options.css "text-align" "center"]
                            [ Options.styled div
                                [ Typography.headline4
                                ]
                                [ Html.text text_
                                ]
        ]


viewCodingForm : List(Row CodingAnswer.Model) -> Db CodingQuestion.Model -> List(Html m)
viewCodingForm answers questions =
    let 
        f (a,b) = 
            case a of
                Just value ->
                    Just (value,b)
                Nothing ->
                    Nothing
        res = answers
            |> List.map (\d -> ((Db.Extra.get questions) (\c -> c.coding_question) d, d))
            |> List.map (\(a,b) -> (Result.toMaybe a,b))
            |> List.map f
            |> Maybe.Extra.values 
            |> List.map (\((id,a),b)-> (a.input_type, b))
        types = List.map (\(a, b)-> Form.inputTypeToComparable a) res
                |> List.Extra.unique
    in
        types
        |> List.map (\x -> (List.filter (\(a,_)-> (Form.inputTypeToComparable a)==x) res))
        |> List.map viewFormElements

viewFormElements : List (Form.InputType, Row CodingAnswer.Model) -> Html m
viewFormElements list =
    div []
            (List.map (\(_,(_,value)) -> text value.value) list)

getCurrentIndex : Row CodingFrame.Model -> Data.Model -> Int
getCurrentIndex frame data = 1

getMaxCodingFrameIndex : Row Coding.Model -> Data.Model -> Int
getMaxCodingFrameIndex coding data = 7
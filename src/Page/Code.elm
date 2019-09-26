module Page.Code exposing (..)

import Browser exposing (Document)
import Data
import Db exposing (Db, Row)
import Db.Extra
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Coding.Frame as CodingFrame
import Entities.Question as Question
import Entities.Answer as Answer
import Html exposing (Html, div, h2, text,p)
import Id exposing (Id)
import Json.Decode as Decode
import Material
import Material.List as Lists
import Material.SimplifiedList as SL
import Material.LinearProgress as LinearProgress
import List.Extra

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
        }
                
        
viewBody : Data.Model -> Maybe (Id CodingFrame.Model, CodingFrame.Model) -> List(Html m)
viewBody data mb_current = 
    case mb_current of
        Just current ->
            viewProgress :: viewCoding data current ++ [viewNavigation]
    
        Nothing ->
            [text "An Error occured while loadeng your Coding Frame"]
    

viewCoding : Data.Model -> Row CodingFrame.Model -> List (Html m)
viewCoding data current = 
    let
        answer = Db.Extra.get data.answers (\x -> x.answer) current
        question = Result.andThen (Db.Extra.get data.questions (\x -> x.question)) answer
    in
        viewQuestion question :: viewAnswer answer :: viewCodingQuestionForm

viewQuestion : Result x (Row Question.Model) -> Html m
viewQuestion question = 
    case question of
        Ok (id,value) ->
            p[][text value.text]
    
        Err error ->
            p [][text "error"]
            

viewAnswer : Result x (Row Answer.Model) -> Html m
viewAnswer answer = 
    case answer of
        Ok (id,value) ->
            p[][text value.value]
    
        Err error ->
            p [][text "error"]

viewProgress : Html m
viewProgress = 
    text "Progress"


viewNavigation : Html m
viewNavigation = 
    text "Navigation"

viewCodingQuestionForm : List(Html m)
viewCodingQuestionForm =
    [text "Form"]
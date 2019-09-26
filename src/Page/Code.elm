module Page.Code exposing (..)

import Browser exposing (Document)
import Data
import Db exposing (Db, Row)
import Db.Extra
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Coding.Frame as CodingFrame
import Html exposing (Html, div, h2, text)
import Id exposing (Id)
import Json.Decode as Decode
import Material
import Material.List as Lists
import Material.SimplifiedList as SL
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
            viewBody mb_current
        }
                
        
viewBody : Maybe (Id CodingFrame.Model, CodingFrame.Model) -> List(Html m)
viewBody mb = 
    viewProgress :: viewCoding ++ [viewNavigation]

viewCoding : List (Html m)
viewCoding = 
    viewQuestion :: viewAnswer :: viewCodingQuestionForm

viewQuestion : Html m
viewQuestion = 
    text "Question"

viewAnswer : Html m
viewAnswer = 
    text "Answer"

viewProgress : Html m
viewProgress = 
    text "Progress"

viewNavigation : Html m
viewNavigation = 
    text "Navigation"

viewCodingQuestionForm : List(Html m)
viewCodingQuestionForm =
    [text "Form"]
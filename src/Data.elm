module Data exposing
    ( Model
    , Msg(..)
    , decoder
    , empty
    , init
    , update
    , view
    , Flags
    , coding2questionary
    , getCodingAnswers
    , GenerateMsg(..)
    , GenerationType(..)
    , maxCodingFrameIndex
    )

import Db exposing (Db, Row)
import Db.Extra exposing (..)
import Dict exposing (..)
import Entities.Answer as Answer
import Entities.Coder as Coder
import Entities.Coding as Coding
import Entities.Coding.Answer as CodingAnswer
import Entities.Coding.Frame as CodingFrame
import Entities.Coding.Question as CodingQuestion
import Entities.Coding.Questionary as CodingQuestionary
import Entities.Question as Question
import Entities.Questionary as Questionary
import Entities.User as User
import Entities.Timestamp as Timestamp
import Form exposing (..)
import Html exposing (..)
import Id exposing (Id)
import List.Extra
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Material
import Material.Options as Options
import Material.TabBar as TabBar
import Random exposing (Seed)
import Set
import Time
import Task



-- JSON-Representations
-- ...a record that directly corresponds to the JSON page data...


type alias Flags =
    { answers : Dict String Answer.Model
    , coders : Dict String Coder.Model
    , codings : Dict String Coding.Model
    , coding_answers : Dict String CodingAnswer.Model
    , coding_frames : Dict String CodingFrame.Model
    , coding_questionaries : Dict String CodingQuestionary.Model
    , coding_questions : Dict String CodingQuestion.Model
    , name : String
    , questions : Dict String Question.Model
    , questionaries : Dict String Questionary.Model
    , users : Dict String User.Model
    , seed : Seed
    , mdc : Material.Model Msg
    , current_tab : Int
    }



-- Decoders


decoder : Decode.Decoder Flags
decoder =
    Decode.succeed Flags
        |> optional "answers" (Decode.dict Answer.decoder) Dict.empty
        |> optional "coders" (Decode.dict Coder.decoder) Dict.empty
        |> optional "codings" (Decode.dict Coding.decoder) Dict.empty
        |> optional "coding_answers" (Decode.dict CodingAnswer.decoder) Dict.empty
        |> optional "coding_frames" (Decode.dict CodingFrame.decoder) Dict.empty
        |> optional "coding_questionaries" (Decode.dict CodingQuestionary.decoder) Dict.empty
        |> optional "coding_questions" (Decode.dict CodingQuestion.decoder) Dict.empty
        |> optional "name" string ""
        |> optional "questions" (Decode.dict Question.decoder) Dict.empty
        |> optional "questionaries" (Decode.dict Questionary.decoder) Dict.empty
        |> optional "users" (Decode.dict User.decoder) Dict.empty
        |> hardcoded (Random.initialSeed 0)
        |> hardcoded Material.defaultModel
        |> hardcoded 0



-- Data Structure


type alias Model =
    { answers : Db Answer.Model
    , coders : Db Coder.Model
    , codings : Db Coding.Model
    , coding_answers : Db CodingAnswer.Model
    , coding_frames : Db CodingFrame.Model
    , coding_questionaries : Db CodingQuestionary.Model
    , coding_questions : Db CodingQuestion.Model
    , name : String
    , questions : Db Question.Model
    , questionaries : Db Questionary.Model
    , users : Db User.Model
    , seed : Seed
    , mdc : Material.Model Msg
    , current_tab : Int
    }



-- Inits


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        model =
            Model
                (initDictToDb flags.answers)
                (initDictToDb flags.coders)
                (initDictToDb flags.codings)
                (initDictToDb flags.coding_answers)
                (initDictToDb flags.coding_frames)
                (initDictToDb flags.coding_questionaries)
                (initDictToDb flags.coding_questions)
                flags.name
                (initDictToDb flags.questions)
                (initDictToDb flags.questionaries)
                (initDictToDb flags.users)
                flags.seed
                flags.mdc
                flags.current_tab
    in
    ( model, Cmd.none )


initDictToDb : Dict String item -> Db item
initDictToDb values =
    values
        |> Dict.toList
        |> List.map (\( key, value ) -> ( Id.fromString key, value ))
        |> Db.fromList


empty : Model
empty =
    { answers = Db.empty
    , coders = Db.empty
    , codings = Db.empty
    , coding_answers = Db.empty
    , coding_frames = Db.empty
    , coding_questionaries = Db.empty
    , coding_questions = Db.empty
    , name = ""
    , questions = Db.empty
    , questionaries = Db.empty
    , users = Db.empty
    , seed = Random.initialSeed 0
    , mdc = Material.defaultModel
    , current_tab = 0
    }



-- Messages
--... variants for each possible message ...


type Msg
    = Entity EntityMsg
    | Generate GenerateMsg
    | SetTime TimedEntity Timestamp.Msg
    | Mdc (Material.Msg Msg)
    | Click Int

type TimedEntity
    = TimedCodingFrame (Id CodingFrame.Model)
    | TimedCodingAnswer (Id CodingAnswer.Model)


type GenerateMsg 
    = GenerateCodingFrame GenerationType (Row Coding.Model) (Maybe (Row Questionary.Model))
    | GenerateCodingAnswers (Row CodingFrame.Model)
--    | GenerateCodingAnswer (Row CodingFrame.Model) (Row CodingQuestion.Model)

type GenerationType
    = New
    | Any

type Error
    = NoResult

type EntityMsg
    = AnswerMsg (Maybe (Id Answer.Model)) Answer.Msg
    | CoderMsg (Maybe (Id Coder.Model)) Coder.Msg
    | CodingMsg (Maybe (Id Coding.Model)) Coding.Msg
    | CodingFrameMsg (Maybe (Id CodingFrame.Model)) CodingFrame.Msg
    | QuestionMsg (Maybe (Id Question.Model)) Question.Msg
    | QuestionaryMsg (Maybe (Id Questionary.Model)) Questionary.Msg
    | CodingQuestionMsg (Maybe (Id CodingQuestion.Model)) CodingQuestion.Msg


type CreationMsg
    = CreateCoder String
    | CreateCoding (Db Coder.Model)


type ErrorMsg
    = TooFewCoders String
    | TooMuchCoders String
    | TooFewQuestionaries String
    | TooMuchQuestionaries String
    | AbsentAnswer (Id CodingFrame.Model)



-- Updates


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Entity emsg ->
            updateEntity emsg model

        Mdc msg_ ->
            Material.update Mdc msg_ model

        Click tab ->
            ( { model | current_tab = tab }, Cmd.none )
        Generate msg_ -> 
            Debug.todo "Look at me. I'm the generator now"
            updateGeneration msg_ model
        SetTime entity tmsg ->
            case entity of
                TimedCodingAnswer id ->
                    let
                        new_coding_answers = Db.update id (Maybe.map (Timestamp.updateTimestamp tmsg)) model.coding_answers
                    in 
                    ({model | coding_answers = new_coding_answers}, Cmd.none)   
                TimedCodingFrame id ->
                    let
                        new_coding_frames = Db.update id (Maybe.map (Timestamp.updateTimestamp tmsg)) model.coding_frames
                    in 
                    ({model | coding_frames = new_coding_frames}, Cmd.none)


updateGeneration : GenerateMsg -> Model -> (Model, Cmd Msg)
updateGeneration msg model = 
    case msg of
        GenerateCodingFrame gentype coding questionary ->
            let
                current_frame = getCurrentFrame model coding
            in
                case (gentype, current_frame) of
                    (Any, Ok frame) ->
                        update (Generate (GenerateCodingAnswers frame)) model
                
                    _ ->
                        (model,Cmd.none)
                        
        GenerateCodingAnswers coding_frame ->
            generateCodingAnswers model coding_frame


generateCodingAnswer : Model -> Row CodingFrame.Model -> Row CodingQuestion.Model -> (Model, Cmd Msg)
generateCodingAnswer model coding_frame coding_question =
    let
        candidate = getCodingAnswer model coding_frame coding_question
    in
        case candidate of
            Ok value ->
                (model,Cmd.none)
        
            Err NoResult ->
                let
                    (cid,cm) = coding_frame
                    (qid,qm) = coding_question
                    new_coding_answer = {coding_frame = cid, 
                                        coding_question = qid,
                                        value = "",
                                        timestamp = Timestamp.empty
                                        }
                    (new_coding_answer_id,new_seed) = Random.step Id.generator model.seed
                    new_coding_answers = Db.insert (new_coding_answer_id,new_coding_answer) model.coding_answers
                    new_model = {model|coding_answers = new_coding_answers}
                    new_model2 = {new_model|seed = new_seed}
                in
                    (new_model2,
                    Task.perform (\x -> (SetTime (TimedCodingAnswer new_coding_answer_id) (Timestamp.All x))) Time.now)        

generateCodingAnswers : Model -> Row CodingFrame.Model -> (Model, Cmd Msg)
generateCodingAnswers model coding_frame =
    let
        missing_questions = getMissingQuestions model coding_frame
                            
    in
        case missing_questions of
            Ok missing_db ->
                Db.toList missing_db
                |> List.map (\y -> (\x->(generateCodingAnswer x coding_frame y)))
                |> updateFolder model
        
            Err error ->
                (model, Cmd.none)
                
        

updateFolder : Model -> List (Model -> (Model, Cmd Msg)) -> (Model, Cmd Msg)
updateFolder model updaters = 
    case List.head updaters of
        Nothing ->
            (model,Cmd.none)
    
        Just update_f ->
            let
                (newmodel,neweffect) =
                    update_f model       
            in
                case List.tail updaters of
                    Nothing ->
                        (newmodel,neweffect)
                
                    Just tail ->
                        let 
                            (restmodel, resteffect)=
                                updateFolder newmodel tail
                        in
                            (restmodel,Cmd.batch [neweffect,resteffect])


updateEntity : EntityMsg -> Model -> ( Model, Cmd Msg )
updateEntity umsg model =
    case umsg of
        AnswerMsg id msg ->
            ( { model | answers = optionalUpdate id model.answers (Answer.update msg) }, Cmd.none )

        CoderMsg id msg ->
            ( { model | coders = optionalUpdate id model.coders (Coder.update msg) }, Cmd.none )

        CodingMsg id msg ->
            ( { model | codings = optionalUpdate id model.codings (Coding.update msg) }, Cmd.none )

        CodingFrameMsg id msg ->
            ( { model | coding_frames = optionalUpdate id model.coding_frames (CodingFrame.update msg) }, Cmd.none )

        QuestionaryMsg id msg ->
            ( { model | questionaries = optionalUpdate id model.questionaries (Questionary.update msg) }, Cmd.none )

        QuestionMsg id msg ->
            ( { model | questions = optionalUpdate id model.questions (Question.update msg) }, Cmd.none )

        CodingQuestionMsg id msg ->
            ( { model | coding_questions = optionalUpdate id model.coding_questions (CodingQuestion.update msg) }, Cmd.none )


optionalUpdate : Maybe (Id m) -> Db m -> (m -> ( m, Cmd n )) -> Db m
optionalUpdate id database updater =
    case id of
        Just id_value ->
            case Db.get database id_value of
                Just value ->
                    let
                        ( newValue, newCmd ) =
                            updater value
                    in
                    Db.insert ( id_value, newValue ) database

                Nothing ->
                    database

        Nothing ->
            database


updateCreation : CreationMsg -> Model -> ( Model, Cmd Msg )
updateCreation msg model =
    case msg of
        CreateCoder name ->
            ( model, Cmd.none )

        CreateCoding coder ->
            ( model, Cmd.none )



-- Views


viewTabBar : Model -> Html Msg
viewTabBar model =
    TabBar.view Mdc
        "my-tab-bar"
        model.mdc
        [ TabBar.activeTab model.current_tab
        ]
        [ TabBar.tab [ Options.onClick (Click 0) ] [ text "Answer" ]
        , TabBar.tab [ Options.onClick (Click 1) ] [ text "Coder" ]
        , TabBar.tab [ Options.onClick (Click 2) ] [ text "Coding" ]
        , TabBar.tab [ Options.onClick (Click 3) ] [ text "Coding Frame" ]
        , TabBar.tab [ Options.onClick (Click 4) ] [ text "Question" ]
        , TabBar.tab [ Options.onClick (Click 5) ] [ text "Questionary" ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ text ("Name: " ++ model.name)
        , viewAnswers model "Jerome Bergmann" "First Questionary"
        , viewContent3 model "Jerome Bergmann" "First Questionary"
        , text "Before"
--        , div [] (List.map (viewCodingQuestions model) (unwrap (selectCodingFrames model "Jerome Bergmann" "First Questionary")))
        , text "After"
        , viewTabBar model
        , viewTabContent model
        ]


unwrap : Result Error (Db a) -> List (Row a)
unwrap res =
    case res of
        Ok value ->
            Db.toList value

        Err _ ->
            []

viewContent : Model -> String -> String -> Html Msg
viewContent model coder_name questionary_name =
    let
        coder_result =
            Coder.selectCoder model.coders coder_name

        codings_result =
            Coding.selectCodings model.codings coder_result

        coding_frame_result1 =
            CodingFrame.selectFramesFromCodings model.coding_frames codings_result

        coding_frame_result =
            case coding_frame_result1 of
                Ok coding_frames ->
                    Ok
                        (Db.filter
                            (\( cf_id, cf_value ) ->
                                Db.get model.answers cf_value.answer
                                    |> Maybe.andThen (\c -> Db.get model.questions c.question)
                                    |> Maybe.andThen (\c -> Db.get model.questionaries c.questionary)
                                    |> Maybe.map (\c -> c.name == questionary_name)
                                    |> Maybe.withDefault False
                            )
                            coding_frames
                        )

                Err msg ->
                    Err msg
    in
    case coding_frame_result of
        Ok coding ->
            Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable coding)

        Err msg ->
            text msg


viewContent2 : Model -> String -> String -> Html Msg
viewContent2 model coder_name questionary_name =
    let
        coder_frames =
            Coder.selectCoder model.coders coder_name
                |> Result.map (Db.Extra.selectFrom model.codings (\c -> c.coder))
                |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.coding))

        questionary_frames =
            Db.Extra.selectBy model.questionaries (\c -> c.name) (\c -> c == questionary_name)
                |> Result.map (Db.Extra.selectFrom model.questions (\c -> c.questionary))
                |> Result.map (Db.Extra.selectFrom model.answers (\c -> c.question))
                |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.answer))
    in
    case coder_frames of
        Ok coding ->
            div []
                [ Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable coding)
--               , Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable questionary_frames)
                ]

        Err msg ->
            text msg


viewContent3 : Model -> String -> String -> Html Msg
viewContent3 model coder questionary =
    case selectCodingFrames model coder questionary of
        Ok value ->
            Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable value)

        Err error ->
            text "An error occured."


viewAnswers : Model -> String -> String -> Html Msg
viewAnswers model coder questionary =
    case selectMissingAnswers model coder questionary of
        Ok value ->
            Html.map (Entity << AnswerMsg Nothing) (Answer.viewTable value)

        Err error ->
            text "An error occured."


viewCodingQuestions : Model -> Row CodingFrame.Model -> Html Msg
viewCodingQuestions model frame =
    case getCodingQuestionsViaAnswer model frame of
        Ok value ->
            Html.map (Entity << CodingQuestionMsg Nothing) (CodingQuestion.viewTable value)

        Err _ ->
            text "An error occured."


viewTabContent : Model -> Html Msg
viewTabContent model =
    case model.current_tab of
        0 ->
            Html.map (Entity << AnswerMsg Nothing) (Answer.viewTable model.answers)

        1 ->
            Html.map (Entity << CoderMsg Nothing) (Coder.viewTable model.coders)

        2 ->
            Html.map (Entity << CodingMsg Nothing) (Coding.viewTable model.codings)

        3 ->
            Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable model.coding_frames)

        4 ->
            Html.map (Entity << QuestionMsg Nothing) (Question.viewTable model.questions)

        5 ->
            Html.map (Entity << QuestionaryMsg Nothing) (Questionary.viewTable model.questionaries)

        _ ->
            text "Tab not Found!"

-- Getters
-- Coding.Frame
getCurrentFrames : Model -> Row Coding.Model -> List(Row CodingFrame.Model)
getCurrentFrames model coding = 
    Db.Extra.selectFromRow model.coding_frames (\(value)-> value.coding) coding
    |> Db.toList 
    |> List.filter (hasValidFrameQuestionPath model)

getCurrentFrame : Model -> Row Coding.Model -> Result Error (Row CodingFrame.Model)
getCurrentFrame model coding =
    getCurrentFrames model coding
    |> List.Extra.maximumBy (\(id,m) -> m.timestamp.accessed)
    |> Result.fromMaybe NoResult

-- Coding.Answer
getCodingAnswer : Model -> Row CodingFrame.Model -> Row CodingQuestion.Model -> Result Error (Row CodingAnswer.Model)
getCodingAnswer model (fid,frame) (qid,question) = 
    model.coding_answers
    |> Db.filter (\(_,x) -> x.coding_frame == fid)
    |> Db.filter (\(_,x) -> x.coding_question == qid)
    |> Db.toList
    |> List.Extra.maximumBy (\(id,m) -> m.timestamp.modified)
    |> Result.fromMaybe NoResult

getCodingAnswers : Db CodingAnswer.Model -> Row CodingFrame.Model -> List (Row CodingAnswer.Model)
getCodingAnswers answers frame = 
   
        frame
        |> Db.Extra.selectFromRow answers (\c -> c.coding_frame)
        |> Db.toList

getCodingQuestionsViaAnswer : Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
getCodingQuestionsViaAnswer model frame =
    frame
        |> Db.Extra.get model.answers (\c -> c.answer)
        |> Result.andThen (Db.Extra.get model.questions (\c -> c.question))
        |> Result.map (\c -> Db.insert c Db.empty)
        |> Result.map (Db.Extra.selectFrom model.coding_questionaries (\c -> c.question))
        |> Result.map (Db.Extra.selectFrom model.coding_questions (\c -> c.coding_questionary))

getCodingQuestionsViaCodingAnswer : Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
getCodingQuestionsViaCodingAnswer model coding_frame =
    let 
        all =
            coding_frame
            |> Db.Extra.selectFromRow model.coding_answers (\c -> c.coding_frame)
    in
        all
        |> Db.toList
        |> List.map (\(id,answer) -> answer.coding_question)
        |> List.map Id.toString
        |> List.Extra.unique
        |> List.map Id.fromString
        |> Db.getMany model.coding_questions
        |> Db.filterMissing
        |> Db.fromList
        |> Ok
                

getMissingQuestions : Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
getMissingQuestions model frame =
    let
        all = getCodingQuestionsViaAnswer model frame 
        present = getCodingQuestionsViaCodingAnswer model frame
    in
        Result.map2 (Db.Extra.difference) all present

hasValidFrameQuestionPath : Model -> Row (CodingFrame.Model) -> Bool
hasValidFrameQuestionPath model frame = 
    case getCodingQuestionsViaAnswer model frame of 
        Ok value ->
            True
        Err error -> 
            False

selectFramesFromCoderName : Model -> String -> Result Db.Extra.Error (Db CodingFrame.Model)
selectFramesFromCoderName model name =
    Db.Extra.selectBy model.coders (\c -> c.name) (\c -> c == name)
        |> Result.andThen (Db.Extra.assertSizeLeq 1 name)
        |> Result.andThen (Db.Extra.assertSizeGeq 1 name)
        |> Result.map (Db.Extra.selectFrom model.codings (\c -> c.coder))
        |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.coding))


coding2questionary : Model -> Row Coding.Model -> Maybe(Row Questionary.Model)
coding2questionary model coding =
            Db.Extra.selectFrom model.coding_frames (\c -> c.coding) (Db.fromList [coding])
            |> Db.toList
            |> List.filterMap (coding_frame2questionary model)
            |> List.head


coding_frame2questionary : Model -> Row CodingFrame.Model -> Maybe (Row Questionary.Model)
coding_frame2questionary model coding_frame =
    coding_frame
    |> Db.Extra.get model.answers (\c -> c.answer)
    |> Result.andThen (Db.Extra.get model.questions (\c -> c.question))
    |> Result.andThen (Db.Extra.get model.questionaries (\c -> c.questionary))
    |> Result.toMaybe
                

selectFramesFromQuestionaryName : Model -> String -> Result Db.Extra.Error (Db CodingFrame.Model)
selectFramesFromQuestionaryName model name =
    Db.Extra.selectBy model.questionaries (\c -> c.name) (\c -> c == name)
        |> Result.andThen (Db.Extra.assertSizeLeq 1 name)
        |> Result.andThen (Db.Extra.assertSizeGeq 1 name)
        |> Result.map (Db.Extra.selectFrom model.questions (\c -> c.questionary))
        |> Result.map (Db.Extra.selectFrom model.answers (\c -> c.question))
        |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.answer))

selectCodingFrames : Model -> String -> String -> Result Db.Extra.Error (Db CodingFrame.Model)
selectCodingFrames model coder questionary =
    let
        coder_frames =
            selectFramesFromCoderName model coder

        questionary_frames =
            selectFramesFromQuestionaryName model questionary
    in
    Result.map2 Db.Extra.intersection coder_frames questionary_frames



selectAllAnswers : Model -> String -> Result Db.Extra.Error (Db Answer.Model)
selectAllAnswers model questionary =
    Db.Extra.selectBy model.questionaries (\c -> c.name) (\c -> c == questionary)
        |> Result.map (Db.Extra.selectFrom model.questions (\c -> c.questionary))
        |> Result.map (Db.Extra.selectFrom model.answers (\c -> c.question))


selectMissingAnswers : Model -> String -> String -> Result Db.Extra.Error (Db Answer.Model)
selectMissingAnswers model coder questionary =
    let
        frame_answers =
            selectCodingFrames model coder questionary
                |> Result.map Db.toList
                |> Result.map (List.map (\( id, value ) -> value.answer))
                |> Result.map (Db.getMany model.answers)
                |> Result.map Db.filterMissing
                |> Result.map Db.fromList

        result_answers =
            Result.map2 (Db.Extra.difference) (selectAllAnswers model questionary) frame_answers
    in
    result_answers

maxCodingFrameIndex : Model -> Row Coding.Model -> Int
maxCodingFrameIndex model coding = 
    let
        questionary = coding2questionary model coding
        answers = Maybe.map (\x -> questionary2answers x model.questions model.answers) questionary
    in
        case answers of
            Nothing ->
                0
        
            Just db ->
                db 
                |> Db.toList
                |> List.length


                
    
questionary2answers : Row Questionary.Model -> Db Question.Model -> Db Answer.Model -> Db Answer.Model
questionary2answers questionary questions answers =
    questionary
    |> Db.Extra.selectFromRow questions (\c -> c.questionary)
    |> Db.Extra.selectFrom answers (\c-> c.question)

{-selectCurrentCodingQuestions : Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
selectCurrentCodingQuestions model (id,frame) =
    let
        current_answers = Db.Extra.selectBy model.coding_answers (\c -> c.coding_frame) (\c -> c == id)
        coding_question = case current_answers of
                            Ok value -> value
    in
        current_answers
-}
selectMissingCodingQuestions : Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
selectMissingCodingQuestions model (id,frame) = 
    let
        frame_questions = Db.Extra.selectBy model.coding_answers (\c -> c.coding_frame) (\c -> c == id)
                            |> Result.map (Db.Extra.getMulti model.coding_questions (\c -> c.coding_question))
        all_questions = getCodingQuestionsViaAnswer model (id,frame)
    in
        Result.map2 (\c -> Db.Extra.difference c) frame_questions all_questions 

newCoder : Seed -> String -> ( Row Coder.Model, Seed )
newCoder seed name =
    let
        ( id, nextSeed ) =
            Random.step Id.generator seed
    in
    ( ( id, Coder.Model name )
    , nextSeed
    )


newCoding : Seed -> Id Coder.Model -> ( Row Coding.Model, Seed )
newCoding seed cid =
    let
        ( id, nextSeed ) =
            Random.step Id.generator seed
    in
    ( ( id, Coding.Model cid )
    , nextSeed
    )

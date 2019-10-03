module Data exposing
    ( Msg(..)
    , update
    , view
    , getCodingAnswers
--    , GenerateMsg(..)
--    , GenerationType(..)
    , maxCodingFrameIndex
    , Object(..)
    , Direction(..)
    )

import Data.Navigation as Nav
import Data.Internal as I exposing (..)
import Data.Access as A
import Data.Generation as G
import Data.Validation as Validate
import Db exposing (Db, Row)
import Db.Extra exposing (..)
import Dict exposing (..)
import Form exposing (..)
import Html exposing (..)
import Id exposing (Id)
import List.Extra
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





-- Messages
--... variants for each possible message ...


type Msg
    = Entity EntityMsg
    | Generate Object (Row Coding.Model) (Maybe (Row CodingFrame.Model))
    | SetTime TimedEntity Timestamp.Msg
    | Move Direction Object (Row Coding.Model)
    | New Object

type TimedEntity
    = TimedCodingFrame (Id CodingFrame.Model)
    | TimedCodingAnswer (Id CodingAnswer.Model)

{- type GenerateMsg 
    = GenerateCodingFrame (Row Coding.Model) (Maybe (Row Questionary.Model))
    | GenerateCodingAnswers (Row CodingFrame.Model)
--    | GenerateCodingAnswer (Row CodingFrame.Model) (Row CodingQuestion.Model) -}

type Object 
    = Answer (Maybe (Row Answer.Model))
    | Coder ()
    | Coding
    | CodingFrame (Maybe (Row CodingFrame.Model))
    | CodingQuestion (Maybe (Row CodingQuestion.Model))
    | CodingAnswer (Maybe (Row CodingAnswer.Model))
    | Question (Maybe (Row Question.Model))

type Direction
    = Next
    | Previous 


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


update : Msg -> I.Model -> ( I.Model, Cmd Msg )
update msg model =
    case msg of
        Entity emsg ->
            updateEntity emsg model

        Generate object coding coding_frame -> 
            case (object,coding_frame) of
                (CodingFrame _, _) ->
                    generateCodingFrame model coding
        
                (CodingAnswer _, Just frame) -> 
                    (model, generateMissingCodingAnswers model coding frame)

                _ ->
                    (model, Cmd.none)
        SetTime entity tmsg ->
            case entity of
                TimedCodingAnswer id ->
                    let
                        new_coding_answers = Db.update id (Maybe.map (Timestamp.updateTimestamp tmsg)) model.coding_answers
                    in 
                    ({model | coding_answers = new_coding_answers}, Cmd.none)   
                TimedCodingFrame id ->
                    let
                        mb_old_coding_frame = Db.get model.coding_frames id
                        new_coding_frames = Db.update id (Maybe.map (Timestamp.updateTimestamp tmsg)) model.coding_frames
                        coding = Maybe.andThen (\x -> Db.Extra.chainable_get model.codings x.coding) mb_old_coding_frame
                        missing_cmd = Maybe.map2 (generateMissingCodingAnswers model) coding (Db.Extra.chainable_get model.coding_frames id)
                    in 
                        ({model | coding_frames = new_coding_frames}, Maybe.withDefault Cmd.none missing_cmd)
        Move direction object coding -> 
            case (object) of

                Question _ -> 
                    Debug.log "moving Question"
                    moveQuestion model direction coding
                
                Answer _ ->
                    Debug.log "moving CodingFrame"
                    moveCodingFrame model direction coding
                
                (_) ->
                    (model, Cmd.none)
        New object -> 
            case object of
                CodingFrame (Just coding_frame) ->
                    Debug.log "new CodingFrame"
                    ({model | coding_frames = Db.insert coding_frame model.coding_frames},
                    updateTimestamp object Timestamp.All)

                CodingAnswer (Just (id,ca)) ->
                    Debug.log "new CodingAnswer"
                    ({model | coding_answers = Db.insert (id,ca) model.coding_answers},
                    updateTimestamp object Timestamp.All) 
                _ ->
                    (model, Cmd.none)

generateMissingCodingAnswers : I.Model -> Row Coding.Model -> Row CodingFrame.Model -> Cmd Msg
generateMissingCodingAnswers model coding coding_frame=
    let
        generators = G.missing_codingAnswers model coding coding_frame
    in
        Debug.log "Generating"
        generators
        |> List.map (Random.generate (New << CodingAnswer << Just))
        |> Cmd.batch


moveQuestion : I.Model -> Direction -> Row Coding.Model -> (I.Model, Cmd Msg)
moveQuestion model direction coding =
    let
        questions = Nav.coding2question model (Db.fromList [coding])
                    |> Db.toList
                    |> List.sortBy (\(id,_)-> Id.toString id)
        current_question = A.current_question model coding
        current_index = current_question
                        |> Maybe.andThen (\x -> (List.Extra.elemIndex x questions))
    in
        case current_index of
            Nothing ->
                generateCodingFrame model coding 
        
            Just index ->
                case (direction, index) of
                    (Previous, 0) ->
                        (model, Cmd.none)
                    (Previous, _) ->
                        let
                            new_question = List.Extra.getAt (index-1) questions
                        in
                            accessFirstCodingFrameOfQuestion model coding new_question
                    (Next, _) ->
                        case (index == (List.length questions)-1) of
                            True ->
                                (model, Cmd.none)
                        
                            False ->
                                let
                                    new_question = List.Extra.getAt (index+1) questions
                                in
                                    accessFirstCodingFrameOfQuestion model coding new_question
                                

{- Renew access timestamp -}
accessFirstCodingFrameOfQuestion : I.Model -> Row Coding.Model -> Maybe(Row Question.Model) -> (I.Model, Cmd Msg)
accessFirstCodingFrameOfQuestion model coding mbquestion = 
    let 
        mbsame=
            (A.current_question model coding)
            |> Maybe.map2 (\a b -> a == b) mbquestion
    in
        case (mbsame, mbquestion) of
            (Just False, Just question) ->
                let
                    first = Nav.question2coding_frame model (Db.fromList [question])
                    second = Nav.coding2coding_frame model (Db.fromList [coding])
                    new_frame = Db.Extra.intersection first second
                                |> Db.toList
                                |> List.head
                in
                    case new_frame of
                        Nothing ->
                            (model, Cmd.none)
                    
                        Just (id,frame) ->
                            (model, Task.perform 
                                (\x -> (SetTime 
                                    (TimedCodingFrame id)
                                    (Timestamp.Accessed x)
                                    )
                                ) Time.now)
                        
            _ ->
                (model, Cmd.none)

                

                    

{- Build ANY new coding frame -}
generateCodingFrame : I.Model -> Row Coding.Model -> (I.Model, Cmd Msg)
generateCodingFrame model coding =
    case G.row_coding_frame model coding of
        Nothing ->
            (model, Cmd.none)
    
        Just generator ->
            (model, Random.generate (New << CodingFrame << Just) generator)
                

moveCodingFrame : I.Model -> Direction -> Row Coding.Model -> (I.Model, Cmd Msg)
moveCodingFrame model direction coding =
    let
        coding_frames = A.sorted_codingFrames model coding
        current_index = A.current_codingFrame_index model coding
        new_frame = 
            case direction of
                Next ->
                    Maybe.andThen (\x -> List.Extra.getAt (x+1) coding_frames) current_index
            
                Previous ->
                    Maybe.andThen (\x -> List.Extra.getAt (x-1) coding_frames) current_index
    in
        case new_frame of
            Nothing ->
                generateCodingFrame model coding
        
            Just (id,frame) ->
                (model, accessCodingFrame id)

accessCodingFrame : Id CodingFrame.Model -> Cmd Msg
accessCodingFrame id =
    Task.perform 
                (\x -> (SetTime 
                    (TimedCodingFrame id)
                    (Timestamp.Accessed x)
                    )
                ) Time.now

accessCodingAnswer : Id CodingAnswer.Model -> Cmd Msg
accessCodingAnswer id =
    Task.perform 
                (\x -> (SetTime 
                    (TimedCodingAnswer id)
                    (Timestamp.Accessed x)
                    )
                ) Time.now

updateTimestamp : Object -> (Time.Posix -> Timestamp.Msg) -> Cmd Msg
updateTimestamp object tmsg =
    let
        mb_timed_entity = case object of
            CodingAnswer mb ->
                Maybe.map (\(id,_) -> TimedCodingAnswer id) mb
        
            CodingFrame mb ->
                Maybe.map (\(id,_) -> TimedCodingFrame id) mb
            
            _ ->
                Nothing
                
    in
        case mb_timed_entity of
            Nothing ->
                Cmd.none
        
            Just timed_entity ->
                Task.perform
                            (\x -> (SetTime
                                (timed_entity)
                                (tmsg x)
                            )
                        ) Time.now

{- updateGeneration : GenerateMsg -> Seed -> I.Model -> (I.Model, Cmd Msg, Maybe Seed)
updateGeneration msg seed model = 
    case msg of
        GenerateCodingFrame gentype coding questionary ->
            let
                current_frame = A.current_codingFrame model coding
            in
                case (gentype, current_frame) of
                    (Any, Just frame) ->
                        updateGeneration (GenerateCodingAnswers frame) seed model
                
                    _ ->
                        (model,Cmd.none, Nothing)
                        
        GenerateCodingAnswers coding_frame ->
            generateCodingAnswers model seed coding_frame -}


generateCodingAnswer : I.Model -> Seed-> Row CodingFrame.Model -> Row CodingQuestion.Model -> (I.Model, Cmd Msg, Maybe Seed)
generateCodingAnswer model seed coding_frame coding_question =
    let
        candidate = getCodingAnswer model coding_frame coding_question
    in
        case candidate of
            Ok value ->
                (model,Cmd.none, Nothing)
        
            Err NoResult ->
                let
                    (cid,cm) = coding_frame
                    (qid,qm) = coding_question
                    new_coding_answer = {coding_frame = cid, 
                                        coding_question = qid,
                                        value = "",
                                        timestamp = Timestamp.empty
                                        }
                    (new_coding_answer_id,new_seed) = Random.step Id.generator seed
                    new_coding_answers = Db.insert (new_coding_answer_id,new_coding_answer) model.coding_answers
                    new_model = {model|coding_answers = new_coding_answers}
                in
                    (new_model,
                    Task.perform (\x -> (SetTime (TimedCodingAnswer new_coding_answer_id) (Timestamp.All x))) Time.now, Just new_seed)        

generateCodingAnswers : I.Model -> Seed -> Row CodingFrame.Model -> (I.Model, Cmd Msg, Maybe Seed)
generateCodingAnswers model seed coding_frame =
    let
        missing_questions = getMissingQuestions model coding_frame
                            
    in
        case missing_questions of
            Ok missing_db ->
                Db.toList missing_db
                |> List.map (\y ->(\x-> (\s->(generateCodingAnswer x s coding_frame y))))
                |> updateFolder model seed
        
            Err error ->
                (model, Cmd.none, Nothing)
                
        

updateFolder : I.Model -> Seed -> List (I.Model -> Seed -> (I.Model, Cmd Msg, Maybe Seed)) -> (I.Model, Cmd Msg, Maybe Seed)
updateFolder model seed updaters = 
    case List.head updaters of
        Nothing ->
            (model,Cmd.none, Nothing)
    
        Just update_f ->
            let
                (newmodel,neweffect,newseed) =
                    update_f model seed      
            in
                case List.tail updaters of
                    Nothing ->
                        (newmodel,neweffect,newseed)
                    
                    Just tail ->
                        let 
                            (restmodel, resteffect, restseed)=
                                updateFolder newmodel (Maybe.withDefault (Random.initialSeed 0) newseed) tail
                        in
                            (restmodel,Cmd.batch [neweffect,resteffect],restseed)


updateEntity : EntityMsg -> I.Model -> ( I.Model, Cmd Msg )
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


updateCreation : CreationMsg -> I.Model -> ( I.Model, Cmd Msg )
updateCreation msg model =
    case msg of
        CreateCoder name ->
            ( model, Cmd.none )

        CreateCoding coder ->
            ( model, Cmd.none )



-- Views


{- viewTabBar : I.Model -> Html Msg
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
        ] -}


view : I.Model -> Html Msg
view model =
    div []
        [ text ("Name: " ++ model.name)
        , viewAnswers model "Jerome Bergmann" "First Questionary"
        , viewContent3 model "Jerome Bergmann" "First Questionary"
        , text "Before"
--        , div [] (List.map (viewCodingQuestions model) (unwrap (selectCodingFrames model "Jerome Bergmann" "First Questionary")))
        , text "After"
--        , viewTabBar model
--        , viewTabContent model
        ]


unwrap : Result Error (Db a) -> List (Row a)
unwrap res =
    case res of
        Ok value ->
            Db.toList value

        Err _ ->
            []

viewContent : I.Model -> String -> String -> Html Msg
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


viewContent2 : I.Model -> String -> String -> Html Msg
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


viewContent3 : I.Model -> String -> String -> Html Msg
viewContent3 model coder questionary =
    case selectCodingFrames model coder questionary of
        Ok value ->
            Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable value)

        Err error ->
            text "An error occured."


viewAnswers : I.Model -> String -> String -> Html Msg
viewAnswers model coder questionary =
    case selectMissingAnswers model coder questionary of
        Ok value ->
            Html.map (Entity << AnswerMsg Nothing) (Answer.viewTable value)

        Err error ->
            text "An error occured."


viewCodingQuestions : I.Model -> Row CodingFrame.Model -> Html Msg
viewCodingQuestions model frame =
    case getCodingQuestionsViaAnswer model frame of
        Ok value ->
            Html.map (Entity << CodingQuestionMsg Nothing) (CodingQuestion.viewTable value)

        Err _ ->
            text "An error occured."


{- viewTabContent : I.Model -> Html Msg
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
            text "Tab not Found!" -}

-- Getters
-- Coding.Frame


-- Coding.Answer
getCodingAnswer : I.Model -> Row CodingFrame.Model -> Row CodingQuestion.Model -> Result Error (Row CodingAnswer.Model)
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

getCodingQuestionsViaAnswer : I.Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
getCodingQuestionsViaAnswer model frame =
    frame
        |> Db.Extra.get model.answers (\c -> c.answer)
        |> Result.andThen (Db.Extra.get model.questions (\c -> c.question))
        |> Result.map (\c -> Db.insert c Db.empty)
        |> Result.map (Db.Extra.selectFrom model.coding_questionaries (\c -> c.question))
        |> Result.map (Db.Extra.selectFrom model.coding_questions (\c -> c.coding_questionary))

getCodingQuestionsViaCodingAnswer : I.Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
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
                

getMissingQuestions : I.Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
getMissingQuestions model frame =
    let
        all = getCodingQuestionsViaAnswer model frame 
        present = getCodingQuestionsViaCodingAnswer model frame
    in
        Result.map2 (Db.Extra.difference) all present

hasValidFrameQuestionPath : I.Model -> Row (CodingFrame.Model) -> Bool
hasValidFrameQuestionPath model frame = 
    case getCodingQuestionsViaAnswer model frame of 
        Ok value ->
            True
        Err error -> 
            False

selectFramesFromCoderName : I.Model -> String -> Result Db.Extra.Error (Db CodingFrame.Model)
selectFramesFromCoderName model name =
    Db.Extra.selectBy model.coders (\c -> c.name) (\c -> c == name)
        |> Result.andThen (Db.Extra.assertSizeLeq 1 name)
        |> Result.andThen (Db.Extra.assertSizeGeq 1 name)
        |> Result.map (Db.Extra.selectFrom model.codings (\c -> c.coder))
        |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.coding))


{- coding2questionary : I.Model -> Row Coding.Model -> Maybe(Row Questionary.Model)
coding2questionary model coding =
            Db.Extra.selectFrom model.coding_frames (\c -> c.coding) (Db.fromList [coding])
            |> Db.toList
            |> List.filterMap (coding_frame2questionary model)
            |> List.head


coding_frame2questionary : I.Model -> Row CodingFrame.Model -> Maybe (Row Questionary.Model)
coding_frame2questionary model coding_frame =
    coding_frame
    |> Db.Extra.get model.answers (\c -> c.answer)
    |> Result.andThen (Db.Extra.get model.questions (\c -> c.question))
    |> Result.andThen (Db.Extra.get model.questionaries (\c -> c.questionary))
    |> Result.toMaybe -}
                

selectFramesFromQuestionaryName : I.Model -> String -> Result Db.Extra.Error (Db CodingFrame.Model)
selectFramesFromQuestionaryName model name =
    Db.Extra.selectBy model.questionaries (\c -> c.name) (\c -> c == name)
        |> Result.andThen (Db.Extra.assertSizeLeq 1 name)
        |> Result.andThen (Db.Extra.assertSizeGeq 1 name)
        |> Result.map (Db.Extra.selectFrom model.questions (\c -> c.questionary))
        |> Result.map (Db.Extra.selectFrom model.answers (\c -> c.question))
        |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.answer))

selectCodingFrames : I.Model -> String -> String -> Result Db.Extra.Error (Db CodingFrame.Model)
selectCodingFrames model coder questionary =
    let
        coder_frames =
            selectFramesFromCoderName model coder

        questionary_frames =
            selectFramesFromQuestionaryName model questionary
    in
    Result.map2 Db.Extra.intersection coder_frames questionary_frames



selectAllAnswers : I.Model -> String -> Result Db.Extra.Error (Db Answer.Model)
selectAllAnswers model questionary =
    Db.Extra.selectBy model.questionaries (\c -> c.name) (\c -> c == questionary)
        |> Result.map (Db.Extra.selectFrom model.questions (\c -> c.questionary))
        |> Result.map (Db.Extra.selectFrom model.answers (\c -> c.question))


selectMissingAnswers : I.Model -> String -> String -> Result Db.Extra.Error (Db Answer.Model)
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



maxCodingFrameIndex : I.Model -> Row Coding.Model -> Int
maxCodingFrameIndex model coding = 
    Nav.coding2questionary model (Db.fromList [coding])
    |> Nav.questionary2answer model
    |> Db.toList
    |> List.length


                
    
{- questionary2answers : Row Questionary.Model -> Db Question.Model -> Db Answer.Model -> Db Answer.Model
questionary2answers questionary questions answers =
    questionary
    |> Db.Extra.selectFromRow questions (\c -> c.questionary)
    |> Db.Extra.selectFrom answers (\c-> c.question) -}

{-selectCurrentCodingQuestions : I.Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
selectCurrentCodingQuestions model (id,frame) =
    let
        current_answers = Db.Extra.selectBy model.coding_answers (\c -> c.coding_frame) (\c -> c == id)
        coding_question = case current_answers of
                            Ok value -> value
    in
        current_answers
-}
selectMissingCodingQuestions : I.Model -> Row CodingFrame.Model -> Result Db.Extra.Error (Db CodingQuestion.Model)
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


sanitize : I.Model -> I.Model
sanitize model = 
    model

sanitizer : I.Model -> (I.Model -> Db a -> Db b) -> (I.Model-> Db a) -> (I.Model -> Db a -> I.Model ) -> I.Model
sanitizer model mapper getter updater = 
    getter model
    |> Db.toList 
    |> List.filter (\c -> not(List.isEmpty (Db.toList(mapper model(Db.fromList [c])))))
    |> Db.fromList
    |> updater model
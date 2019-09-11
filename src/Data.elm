module Data exposing
    ( Model
    , Msg
    , decoder
    , empty
    , init
    , update
    , view
    , viewCoding
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
import Form exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Material
import Material.Options as Options
import Material.TabBar as TabBar
import Random exposing (Seed)



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


empty : String -> Model
empty str =
    { answers = Db.empty
    , coders = Db.empty
    , codings = Db.empty
    , coding_answers = Db.empty
    , coding_frames = Db.empty
    , coding_questionaries = Db.empty
    , coding_questions = Db.empty
    , name = str
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
    | Mdc (Material.Msg Msg)
    | Click Int


type EntityMsg
    = AnswerMsg (Maybe (Id Answer.Model)) Answer.Msg
    | CoderMsg (Maybe (Id Coder.Model)) Coder.Msg
    | CodingMsg (Maybe (Id Coding.Model)) Coding.Msg
    | CodingFrameMsg (Maybe (Id CodingFrame.Model)) CodingFrame.Msg
    | QuestionMsg (Maybe (Id Question.Model)) Question.Msg
    | QuestionaryMsg (Maybe (Id Questionary.Model)) Questionary.Msg


type CreationMsg
    = CreateCoder String
    | CreateCoding (Db Coder.Model)


type ErrorMsg
    = TooMuch String



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
        , viewContent2 model "Jerome Bergmann" "First Questionary"
        , viewTabBar model
        , viewTabContent model
        ]

viewContent : Model -> String -> String -> Html Msg
viewContent model coder_name questionary_name =
    let
        coder_result = Coder.selectCoder model.coders coder_name
        codings_result = Coding.selectCodings model.codings coder_result
        coding_frame_result1 = CodingFrame.selectFramesFromCodings model.coding_frames codings_result
        coding_frame_result = 
            case coding_frame_result1 of
                Ok coding_frames ->
                    Ok (Db.filter (
                        \(cf_id,cf_value)-> Db.get model.answers cf_value.answer
                                            |> Maybe.andThen (\c -> Db.get model.questions c.question)
                                            |> Maybe.andThen (\c -> Db.get model.questionaries c.questionary)
                                            |> Maybe.map (\c -> c.name == questionary_name)
                                            |> Maybe.withDefault False) coding_frames)
                Err msg -> Err msg
                    
            
    in
        case coding_frame_result of
            Ok coding ->
                Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable coding)
        
            Err msg ->
                text msg

viewContent2 : Model -> String -> String -> Html Msg
viewContent2 model coder_name questionary_name =
    let 
        coder_frames = Coder.selectCoder model.coders coder_name
                       |> Result.map (Db.Extra.selectFrom model.codings (\c -> c.coder))
                       |> Result.map (Db.Extra.selectFrom model.coding_frames (\c -> c.coding))
        questionary_frames = Db.Extra.selectBy model.questionaries (\c -> c.name) (\c -> c == questionary_name)
                                |> Db.Extra.selectFrom model.questions (\c -> c.questionary)
                                |> Db.Extra.selectFrom model.answers (\c -> c.question)
                                |> Db.Extra.selectFrom model.coding_frames (\c -> c.answer)
    
    in
        case coder_frames of
            Ok coding ->
                div [][
                Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable coding)
                ,Html.map (Entity << CodingFrameMsg Nothing) (CodingFrame.viewTable questionary_frames)
                ]
            Err msg ->
                text msg

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


viewCoder : ( Id Coder.Model, Coder.Model ) -> Html Msg
viewCoder ( id, coder ) =
    div []
        [ h3 [] [ text ("Coder: " ++ Id.toString id) ]
        , p [] [ text ("Name: " ++ coder.name) ]
        ]


viewCoding : ( Id Coding.Model, Coding.Model ) -> Html Msg
viewCoding ( id, coding ) =
    div []
        [ h3 [] [ text ("Coding: " ++ Id.toString id) ]
        , p [] [ text ("Coder: " ++ Id.toString coding.coder) ]
        ]


viewCodingFrame : ( Id CodingFrame.Model, CodingFrame.Model ) -> Html Msg
viewCodingFrame ( id, coding_frame ) =
    div []
        [ h3 [] [ text ("Coding Frame: " ++ Id.toString id) ]
        , p [] [ text ("Coding: " ++ Id.toString coding_frame.coding) ]
        , p [] [ text ("Answer: " ++ Id.toString coding_frame.answer) ]
        ]


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


getCodingFromCoder : Db Coding.Model -> Db.Row Coder.Model -> Result String (Maybe (Db Coding.Model))
getCodingFromCoder codings ( cid, coder ) =
    case Db.toList (Db.filter (\( id, coding ) -> coding.coder == cid) codings) of
        [] ->
            Ok Nothing

        [ f ] ->
            Ok (Just (Db.fromList [ f ]))

        _ ->
            Err "More than one Codings found for a coder"


getEqual : (a -> b) -> b -> Db a -> Db a
getEqual mapper target_value data =
    Db.filter (\( id, value ) -> mapper value == target_value) data


getIDInList : List (Id a) -> Db a -> Db a
getIDInList target_values data =
    Db.filter (\( id, value ) -> List.member id target_values) data


getSublist : (a -> b) -> Db a -> List b
getSublist mapper data =
    List.map (\( id, value ) -> mapper value) (Db.toList data)


filterByForeignTable : (a -> Id c) -> Db a -> Db c -> Db c
filterByForeignTable accessor first_data second_data =
    let
        first_sublist =
            getSublist accessor first_data
    in
    getIDInList first_sublist second_data


getIDMatchLast : (c -> Id a) -> Db a -> Db c -> Db a
getIDMatchLast accessor first_data second_data =
    let
        second_sublist =
            getSublist accessor second_data
    in
    getIDInList second_sublist first_data


getQuestionaryFromString : Db Questionary.Model -> String -> Result String (Maybe (Row Questionary.Model))
getQuestionaryFromString questionaries name =
    case Db.toList (Db.filter (\( id, questionary ) -> questionary.name == name) questionaries) of
        [] ->
            Ok Nothing

        [ f ] ->
            Ok (Just f)

        _ ->
            Err "Questionary not found!"


viewCoding2 : Model -> String -> String -> Html Msg
viewCoding2 model coder_name questionary_name =
    let
        --                        |> getIDMatchLast
        coding_frames2 =
            model.coders
                |> getEqual .name coder_name

        --                |> getIDMatchLast .coder model.codings
        --                |> getIDMatchLast .coding_frame model.coding_frames
        questions2 =
            model.questionaries

        --                |> getEqual .name questionary_name
        --                |> getIDMatchLast .questionary model.question
    in
    Html.div [] [ Html.h1 [] [ text ("Coding of " ++ coder_name ++ ". Questionary: " ++ questionary_name ++ ".") ] ]



-- getCoderFromString model coder_name
-- |> Result.andThen filterCodingsByCoder (CreateCoding model.codings) model
{- case getCoderFromSting model.coders coder_name of
   Ok Nothing ->
       let
           ( newmodel, cmd ) =
               update (CreateCoder coder_name) model
       in
       viewCoding newmodel coder_name questionary_name

   Err err ->
       text ("Error: " ++ err)

   Ok (Just ( coder_id, coder )) ->
       (coder_id, coder)
       |> getCodingsFromCoder model.codings
       case getCodingFromCoder model.codings ( coder_id, coder ) of
           Ok Nothing ->
               let
                   ( newmodel, cmd ) =
                       update (CreateCoding coder_id) model
               in
               viewCoding newmodel coder_name questionary_name

           Err err ->
               text ("Error: " ++ err)

           Ok (Just ( coding_id, coding )) ->
               let
                   coding_frames =
                       getCodingFramesFromCoding model.coding_frames ( coding_id, coding )
               in
               case Db.toList coding_frames of
                   [] ->
                       let
                           ( newmodel, cmd ) =
                               update (InitFrames questionary_name ( coding_id, coding )) model
                       in
                       viewCoding newmodel coder_name questionary_name

                   list ->
                       case Db.toList (Db.filter (\( x, y ) -> y.index == coding.current_index) coding_frames) of
                           [] ->
                               let
                                   ( newmodel, cmd ) =
                                       update (FillFrames ( coding_id, coding )) model
                               in
                               viewCoding newmodel coder_name questionary_name

                           [ current_frame ] ->
                               viewCurrentFrame model current_frame

                           _ ->
                               text "Too much current frames"
-}


viewCurrentFrame : Model -> Row CodingFrame.Model -> Html Msg
viewCurrentFrame model frame =
    text "Displaying a frame"

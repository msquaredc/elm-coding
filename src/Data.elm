module Data exposing
    ( Answer
    , Coder
    , Coding
    , CodingAnswer
    , CodingFrame
    , CodingQuestion
    , CodingQuestionary
    , Model
    , Msg
    , Question
    , Questionary
    , User
    , decoder
    , empty
    , init
    , update
    , view
    )

--import Query exposing (..)

import Db exposing (Db, Row)
import Dict exposing (..)
import Form exposing (..)
import Html exposing (..)
import Id exposing (Id)
import Json.Decode as Decode exposing (Decoder, decodeString, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Random exposing (Seed)



-- JSON-Representations
-- ...a record that directly corresponds to the JSON page data...


type alias Flags =
    { answers : Dict String Answer
    , coders : Dict String Coder
    , codings : Dict String Coding
    , coding_answers : Dict String CodingAnswer
    , coding_frames : Dict String CodingFrame
    , coding_questionaries : Dict String CodingQuestionary
    , coding_questions : Dict String CodingQuestion
    , name : String
    , questions : Dict String Question
    , questionaries : Dict String Questionary
    , users : Dict String User
    , seed : Seed
    }


-- Decoders


decoder : Decode.Decoder Flags
decoder =
    Decode.succeed Flags
        |> optional "answers" (Decode.dict decoderAnswer) Dict.empty
        |> optional "coders" (Decode.dict decoderCoder) Dict.empty
        |> optional "codings" (Decode.dict decoderCoding) Dict.empty
        |> optional "coding_answers" (Decode.dict decoderCodingAnswers) Dict.empty
        |> optional "coding_frames" (Decode.dict decoderCodingFrame) Dict.empty
        |> optional "coding_questionaries" (Decode.dict decoderCodingQuestionary) Dict.empty
        |> optional "coding_questions" (Decode.dict decoderCodingQuestion) Dict.empty
        |> optional "name" string ""
        |> optional "question" (Decode.dict decoderQuestion) Dict.empty
        |> optional "questionaries" (Decode.dict decoderQuestionary) Dict.empty
        |> optional "users" (Decode.dict decoderUser) Dict.empty
        |> hardcoded (Random.initialSeed 0)


decoderAnswer : Decode.Decoder Answer
decoderAnswer =
    Decode.succeed Answer
        |> required "question" Id.decoder
        |> required "user" Id.decoder
        |> optional "value" string ""


decoderCoder : Decode.Decoder Coder
decoderCoder =
    Decode.succeed Coder
        |> required "name" string


decoderCoding : Decode.Decoder Coding
decoderCoding =
    Decode.succeed Coding
        |> required "coder" Id.decoder
        |> required "question" Id.decoder
        |> optional "index" Decode.int 0


decoderCodingAnswers : Decode.Decoder CodingAnswer
decoderCodingAnswers =
    Decode.succeed CodingAnswer
        |> required "coding_question" Id.decoder
        |> required "coding_frame" Id.decoder
        |> required "value" string


decoderCodingFrame : Decode.Decoder CodingFrame
decoderCodingFrame =
    Decode.succeed CodingFrame
        |> required "answer" Id.decoder
        |> required "coding" Id.decoder
        |> required "index" int


decoderCodingQuestionary : Decode.Decoder CodingQuestionary
decoderCodingQuestionary =
    Decode.succeed CodingQuestionary
        |> required "question" Id.decoder


decoderCodingQuestion : Decode.Decoder CodingQuestion
decoderCodingQuestion =
    Decode.succeed CodingQuestion
        |> required "coding_questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder


decoderQuestion : Decode.Decoder Question
decoderQuestion =
    Decode.succeed Question
        |> required "questionary" Id.decoder
        |> required "text" string
        |> required "input_type" Form.inputTypeDecoder


decoderQuestionary : Decode.Decoder Questionary
decoderQuestionary =
    Decode.succeed Questionary
        |> required "name" string


decoderUser : Decode.Decoder User
decoderUser =
    Decode.succeed User
        |> required "infos" (Decode.dict string)



-- Data Structure


type alias Model =
    { answers : Db Answer
    , coders : Db Coder
    , codings : Db Coding
    , coding_answers : Db CodingAnswer
    , coding_frames : Db CodingFrame
    , coding_questionaries : Db CodingQuestionary
    , coding_questions : Db CodingQuestion
    , name : String
    , question : Db Question
    , questionaries : Db Questionary
    , users : Db User
    , seed : Seed
    }


type alias Answer =
    { question : Id Question
    , user : Id User
    , value : String
    }


type alias Coder =
    { name : String
    }


type alias Coding =
    { coder : Id Coder
    , question : Id Question
    , current_index : Int
    }


type alias CodingAnswer =
    { coding_question : Id CodingQuestion
    , coding_frame : Id CodingFrame
    , value : String
    }


type alias CodingFrame =
    { answer : Id Answer
    , coding : Id Coding
    , index : Int
    }


type alias CodingQuestionary =
    { question : Id Question }


type alias CodingQuestion =
    { coding_questionary : Id CodingQuestionary
    , text : String
    , input_type : Form.InputType
    }


type alias Question =
    { questionary : Id Questionary
    , text : String
    , input_type : Form.InputType
    }


type alias Questionary =
    { name : String
    }


type alias User =
    { infos : Dict String String
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
    , question = Db.empty
    , questionaries = Db.empty
    , users = Db.empty
    , seed = Random.initialSeed 0
    }



-- Messages
--... variants for each possible message ...


type Msg
    = Create CreationMsg
    | Error ErrorMsg
    | FillFrames (Row Coding)
    | InitFrames String (Row Coding)


type CreationMsg
    = CreateCoder String
    | CreateCoding (Db Coder)


type ErrorMsg
    = TooMuch String



-- Updates


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Create creationMsg ->
            updateCreation creationMsg model

        FillFrames coder_id ->
            ( model, Cmd.none )

        InitFrames question coding ->
            ( model, Cmd.none )

        Error _ ->
            ( model, Cmd.none )


updateCreation : CreationMsg -> Model -> ( Model, Cmd Msg )
updateCreation msg model =
    case msg of
        CreateCoder name ->
            ( model, Cmd.none )

        CreateCoding coder ->
            ( model, Cmd.none )



-- Views


view : Model -> Html Msg
view model =
    div []
        [ div [] (List.map viewAnswer (Db.toList model.answers))
        , div [] (List.map viewCoder (Db.toList model.coders))
        , text ("Name: " ++ model.name)
        ]


viewAnswer : ( Id Answer, Answer ) -> Html Msg
viewAnswer ( id, answer ) =
    div []
        [ h3 [] [ text ("Answer: " ++ Id.toString id) ]
        , p [] [ text ("Question: " ++ Id.toString answer.question) ]
        , p [] [ text ("User: " ++ Id.toString answer.user) ]
        , p [] [ text ("Value: " ++ answer.value) ]
        ]


viewCoder : ( Id Coder, Coder ) -> Html Msg
viewCoder ( id, coder ) =
    div []
        [ h3 [] [ text ("Coder: " ++ Id.toString id) ]
        , p [] [ text ("Name: " ++ coder.name) ]
        ]


newCoder : Seed -> String -> ( Row Coder, Seed )
newCoder seed name =
    let
        ( id, nextSeed ) =
            Random.step Id.generator seed
    in
    ( ( id, Coder name )
    , nextSeed
    )


newCoding : Seed -> Id Coder -> Id Question -> ( Row Coding, Seed )
newCoding seed cid qid =
    let
        ( id, nextSeed ) =
            Random.step Id.generator seed
    in
    ( ( id, Coding cid qid 0 )
    , nextSeed
    )


getCodingFromCoder : Db Coding -> Db.Row Coder -> Result String (Maybe (Db Coding))
getCodingFromCoder codings ( cid, coder ) =
    case Db.toList (Db.filter (\( id, coding ) -> coding.coder == cid) codings) of
        [] ->
            Ok Nothing

        [ f ] ->
            Ok (Just (Db.fromList [f]))

        _ ->
            Err "More than one Codings found for a coder"


getEqual : (a -> b) -> b -> Db a -> Db a
getEqual mapper target_value data =
    Db.filter (\( id, value ) -> mapper value == target_value) data


getIDInList : List (Id a) -> Db a -> Db a
getIDInList target_values data =
    Db.filter (\( id, value ) -> (List.member id target_values)) data


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


getCoderFromString : Model -> String -> Result String (Db Coder)
getCoderFromString model name =
    let
        coder_db =
            Db.filter (\( id, coder ) -> coder.name == name) model.coders
    in
    case Db.toList coder_db of
        [] ->
            let
                ( newmodel, cmd ) =
                    update (Create (CreateCoder name)) model
            in
            getCoderFromString newmodel name

        [ f ] ->
            Ok coder_db

        _ ->
            Err "Multiple Coder with same name"


getQuestionaryFromString : Db Questionary -> String -> Result String (Maybe (Row Questionary))
getQuestionaryFromString questionaries name =
    case Db.toList (Db.filter (\( id, questionary ) -> questionary.name == name) questionaries) of
        [] ->
            Ok Nothing

        [ f ] ->
            Ok (Just f)

        _ ->
            Err "Questionary not found!"


viewCoding : Model -> String -> String -> Html Msg
viewCoding model coder_name questionary_name =
    let
        coding_frames = getCoderFromString model coder_name
                        |> getIDMatchLast

        coding_frames2 =
            model.coders
                |> getEqual .name coder_name
                |> getIDMatchLast .coder model.codings
                |> getIDMatchLast .coding_frame model.coding_frames
        questions2 = 
            model.questionaries
                |> getEqual .name questionary_name
                |> getIDMatchLast .questionary model.question
    in
        Html.div [] [Html.h1 [] [text ("Coding of "++ coder_name ++ ". Questionary: "++ questionary_name ++ ".")]]
                
currentCodingFrames : Model -> String -> String -> Db CodingFrame
currentCodingFrames model coder questionary = 
    let
        coding_frames = getCoderFromString model coder
                        |> 


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

viewCurrentFrame : Model -> Row CodingFrame -> Html Msg
viewCurrentFrame model frame =
    text "Displaying a frame"

module Entities.Timestamp exposing (Model, Msg(..), decoder, empty, encoder, updateTimestamp)

import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import Json.Encode as Encode exposing (Value)
import Time


type alias Model =
    { created : Int
    , modified : Int
    , accessed : Int
    }


type Msg
    = All Time.Posix
    | Created Time.Posix
    | Modified Time.Posix
    | Accessed Time.Posix


decoder : Decode.Decoder Model
decoder =
    Decode.succeed Model
        |> required "created" Decode.int
        |> required "modified" Decode.int
        |> required "accessed" Decode.int


encoder : Model -> List ( String, Value )
encoder model =
    [ ( "created", Encode.int model.created )
    , ( "modified", Encode.int model.modified )
    , ( "accessed", Encode.int model.accessed )
    ]


empty : Model
empty =
    { created = 0, modified = 0, accessed = 0 }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        All time_ ->
            let
                time =
                    Time.posixToMillis time_
            in
            ( { created = time
              , modified = time
              , accessed = time
              }
            , Cmd.none
            )

        Created time_ ->
            ( { model | created = Time.posixToMillis time_ }, Cmd.none )

        Modified time_ ->
            ( { model | modified = Time.posixToMillis time_ }, Cmd.none )

        Accessed time_ ->
            ( { model | accessed = Time.posixToMillis time_ }, Cmd.none )


updateTimestamp : Msg -> { a | timestamp : Model } -> { a | timestamp : Model }
updateTimestamp msg object =
    let
        ( new_timestamp, _ ) =
            update msg object.timestamp
    in
    { object | timestamp = new_timestamp }

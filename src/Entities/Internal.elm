module Entities.Internal exposing (..)

import Json.Decode exposing (Decoder)
import Json.Encode exposing (Value)
import Id exposing (Id)
import Validate exposing (Validator)


type alias Entity row flags field msg custom_type = 
    {
        name : String,
        decoder : Decoder flags,
        init : flags -> (row, Cmd msg),
        encoder : row -> Value,
        default : row,
        field_types : row -> field -> Datatype custom_type,
        validator : Validator (field, String) row
    }


type Datatype custom
    = Primitive PrimitiveDatatype
    | Custom custom

type PrimitiveDatatype
    = IntType Int
    | StringType String

init : a -> (a,Cmd m)
init val =
    (val, Cmd.none)

int : Int -> Datatype c
int i = 
    Primitive (IntType i)

string : String -> Datatype c
string s = 
    Primitive (StringType s)

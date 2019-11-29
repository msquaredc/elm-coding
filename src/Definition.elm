module Definition exposing (Definition(..), Internal, default_internal, define, name)

import Json.Decode exposing (Decoder)
import Json.Encode exposing (Value)
import Id exposing (Id)
import Validate exposing (Validator)


type FieldType =
    Primitive PrimitiveType
    | Box BoxType
    | Reference String

type PrimitiveType =
    BuiltinInteger Int
    

type BoxType = 
    MaybeBox FieldType FieldType
    | ResultBox FieldType FieldType

type Definition fields deftype
    = Definition (Internal fields deftype)


type alias Internal fields deftype =
    {   name : Maybe (String),
        decoder : Maybe (Decoder deftype),
        encoder : Maybe (deftype -> Value),
        default : Maybe (deftype),
        field_types : List (deftype -> fields -> FieldType),
        validator : Maybe (Validator (fields, String) deftype)
    }


default_internal : Internal fields deftype
default_internal =
    { name = Nothing
    , decoder = Nothing
    , encoder = Nothing
    , default = Nothing
    , field_types = []
    , validator = Nothing
    }


define : a -> Definition fields a
define object =
    Definition default_internal


name : String -> Definition fields deftype -> Definition fields deftype
name s (Definition def) =
    Definition { def | name = Just s }

decoder : Decoder a -> Definition fields a -> Definition fields a
decoder d (Definition def) = 
    Definition { def | decoder = Just d}



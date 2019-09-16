module Db.Extra exposing (Error(..), assertSizeGeq, assertSizeLeq, difference, get, getMulti, intersection, map, selectBy, selectFrom, size)

import Db exposing (Db, Row)
import Id exposing (Id)
import Set


type Error
    = Absent String String
    | NotFound
    | TooMuch Int Int String
    | TooFew Int Int String


selectBy : Db a -> (a -> b) -> (b -> Bool) -> Result Error (Db a)
selectBy db accessor evaluator =
    let
        result =
            Db.filter (\( id, value ) -> evaluator (accessor value)) db
    in
    case List.isEmpty (Db.toList result) of
        True ->
            Err NotFound

        False ->
            Ok result


size : Db a -> Int
size db =
    List.length (Db.toList db)


selectFrom : Db a -> (a -> Id b) -> Db b -> Db a
selectFrom db accessor id_db =
    let
        id_list =
            Db.toList id_db
                |> List.map (\( id, _ ) -> id)
    in
    Db.filter (\( id, value ) -> List.member (accessor value) id_list) db


assertSizeLeq : Int -> String -> Db a -> Result Error (Db a)
assertSizeLeq target_size error db =
    if size db <= target_size then
        Ok db

    else
        Err (TooMuch (size db) target_size error)


assertSizeGeq : Int -> String -> Db a -> Result Error (Db a)
assertSizeGeq target_size error db =
    if size db >= target_size then
        Ok db

    else
        Err (TooFew (size db) target_size error)


intersection : Db a -> Db a -> Db a
intersection a b =
    let
        list_a =
            Db.toList a

        list_b =
            Db.toList b
    in
    Db.fromList (List.filter (\c -> List.member c list_b) list_a)


difference : Db a -> Db a -> Db a
difference lhs rhs =
    let
        list_lhs =
            Db.toList lhs

        list_rhs =
            Db.toList rhs
    in
    Db.fromList (List.filter (\c -> not (List.member c list_rhs)) list_lhs)


get : Db b -> (a -> Id b) -> Row a -> Result Error (Row b)
get b accessor ( ida, valuea ) =
    let
        idb =
            accessor valuea
    in
    case Db.get b idb of
        Just valueb ->
            Ok ( idb, valueb )

        Nothing ->
            Err (Absent (Id.toString ida) (Id.toString idb))


getMulti : Db b -> (a -> Id b) -> Db a -> Db b
getMulti b accessor db =
    Db.toList db
        |> List.map (get b accessor)
        |> List.filterMap Result.toMaybe
        |> Db.fromList


map : (Row a -> Row b) -> Db a -> Db b
map f a =
    a
        |> Db.toList
        |> List.map f
        |> Db.fromList

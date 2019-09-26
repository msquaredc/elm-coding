module SafeQuery exposing (..)

import Db exposing (Db)
import Dict exposing (..)

type alias SafeQueries a b = 
    {query: a,
    target_type: b,
        int_ : Dict Int Int,
    string_ : Dict Int String
    }


getSafeInt : Int -> SafeQueries (Db a) b -> (a -> Int) -> Int -> SafeQueries (Db a) b
getSafeInt index sq mapper target_value =
    let 
        new_sq = {sq | query = (Db.filter (\( id, value ) -> mapper value == target_value) sq.query)}
    in
    {
        
      new_sq  | int_ = (Dict.insert index target_value sq.int_ )
    }

getSafeString : Int -> SafeQueries (Db a) b -> (a -> String) -> String -> SafeQueries (Db a) b
getSafeString index sq mapper target_value =
    let 
        new_sq = {sq | query = (Db.filter (\( id, value ) -> mapper value == target_value) sq.query)}
    in
    {
        
      new_sq  | string_ = (Dict.insert index target_value sq.string_ )
    }


resolveSafe : SafeQueries (Db a) a -> a
resolveSafe sq =
    case Db.toList sq.query of
        [ (id,value) ] ->
            value
        [] -> buildSafeQueries sq.target_type sq

buildSafeQueries tmp sq =
    case List.minimum (Dict.keys sq.string_) of
        Nothing -> 
            case List.minimum (Dict.keys sq.int_) of
                Nothing ->
                    tmp
                Just int_key ->
                    let 
                        value = Dict.get (int_key)
                        newdict = Dict.remove int_key sq.int_
                    in 
                        buildSafeQueries (tmp value) {sq|int_ = newdict}
    
        Just string_key -> 
            case List.minimum (Dict.keys sq.int_) of
                Nothing ->
                    let 
                        value = Dict.get (string_key)
                        newdict = Dict.remove string_key sq.string_
                    in 
                        buildSafeQueries (tmp value) {sq|string_ = newdict}
                Just int_key ->
                    case int_key > string_key of
                        True ->      
                            let 
                                value = Dict.get (int_key)
                                newdict = Dict.remove int_key sq.int_
                            in 
                                buildSafeQueries (tmp value) {sq|int_ = newdict}
                        False -> 
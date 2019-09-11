module Db.Extra exposing (selectBy, selectFrom, size)

import Db exposing (Db)
import Id exposing (Id)


selectBy : Db a -> (a -> b) -> (b -> Bool) -> Db a
selectBy db accessor evaluator =
    Db.filter (\( id, value ) -> evaluator (accessor value)) db


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

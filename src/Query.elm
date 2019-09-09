module Query exposing (Query(..), custom, run, join)


type Query database err a
    = Query (database -> Result (List err) a)


run : Query database err a -> database -> Result (List err) a
run (Query f) a =
    f a


custom : (database -> Result (List err) a) -> Query database err a
custom =
    Query

join : 

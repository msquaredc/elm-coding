module Query exposing (Query(..), custom, run, join)

import Entities.Internal exposing (Entity)

type alias Query db result =
    Query (db -> result )

query : Query db result -> db -> result
query Query (q) datasource =
    q datasource

begin : Query 

myaccess : Query Model Coder.Model
myaccess = 
module Database exposing (..)

import Set exposing (..)
import Tuple exposing (..)

type Relationship a b = 
    Relationship (Set (a,b))

empty : Relationship a b
empty = Relationship Set.empty

add : comparable1 -> comparable2 -> Relationship comparable1 comparable2 -> Relationship comparable1 comparable2
add source dest (Relationship table) = 
    Relationship (Set.insert (source,dest) table)

type Table a = Table String a


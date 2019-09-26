module MAC exposing (MAC(..))

import Task
import Time


type MAC a
    = MAC Timestamps a


type alias Timestamps =
    { modification : Time.Posix
    , access : Time.Posix
    , creation : Time.Posix
    }


type Msg a
    = Init (MAC a) Time.Posix
    | Modify (MAC a) Time.Posix


init : a -> ( MAC a, Cmd (Msg a) )
init object =
    let
        mac =
            MAC timestampsEmpty object
    in
    ( mac, Task.perform (Init mac) Time.now )


update : Msg a -> MAC a -> ( MAC a, Cmd (Msg a) )
update msg model =
    case msg of
        Init mac time ->
            case mac of
                MAC timestamps object ->
                    (MAC (timestampsInit time) object, Cmd.none)
        Modify mac time -> 
            case mac of
                MAC timestamps object ->
                    let
                        new_timestamps1 = {timestamps | modification = time}
                        new_timestamps = {new_timestamps1 | access = time}
                    in
                        (MAC new_timestamps object, Cmd.none)


timestampsInit : Time.Posix -> Timestamps
timestampsInit time =
    { modification = time
    , access = time
    , creation = time
    }

timestampsEmpty : Timestamps
timestampsEmpty = 
    { modification = Time.millisToPosix 0 
    , access = Time.millisToPosix 0
    , creation = Time.millisToPosix 0
    }

map : (a -> b) -> MAC a -> MAC b
map func mac =
    case mac of
        MAC timestamps object ->
            let 
                new_mac = MAC timestamps (func object)
            in
                new_mac
            
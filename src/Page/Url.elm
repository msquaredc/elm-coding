module Page.Url exposing
    ( Url(..)
    , fromString
    , fromUrl
    , toString
    , defaultUrl
    )

import Url


type Url
    = StartPage
    | Data
    | Error404 String
    | Error


toString : Url -> String
toString url =
    case url of
        StartPage ->
            "#"

        Error404 requestedHash ->
            requestedHash
        
        Data -> 
            "#data"
        
        Error ->
            "#error"


fromUrl : Url.Url -> Url
fromUrl url =
    fromString (Maybe.withDefault "" url.fragment)


fromString : String -> Url
fromString url =
    case url of
        "" ->
            StartPage
        
        "data" -> 
            Data

        "error" ->
            Error
        _ ->
            Error404 url
    
defaultUrl : Url
defaultUrl = StartPage
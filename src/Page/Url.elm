module Page.Url exposing
    ( Url(..)
    , defaultUrl
    , fromString
    , fromUrl
    , toString
    , navigatableUrl
    , toIcon
    )

import Url


type Url
    = StartPage
    | Home
    | Data
    | Error404 String
    | Error
    | Code
    | Upload


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

        Home ->
            "#home"
        
        Code ->
            "#code"
        
        Upload -> 
            "#upload"

toIcon : Url -> String
toIcon url = 
    case url of
        Home -> 
            "home"
        StartPage ->
            "home"
        Data -> 
            "account_tree"
        Code -> 
            "ballot"
        Error ->
            "error"
        Error404 _-> 
            "error_outline"
        Upload -> 
            "upload"


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

        "home" ->
            Home

        "code" ->
            Code

        "upload" -> 
            Upload
        _ ->
            Error404 url


defaultUrl : Url
defaultUrl =
    StartPage

navigatableUrl : List (Url)
navigatableUrl =
    [ Home
    , Code
    , Data
    , Upload]


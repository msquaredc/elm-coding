module Page.Url exposing
    ( Url(..)
    , defaultUrl
    , fromString
    , fromUrl
    , toString
    )

import Url


type Url
    = StartPage
    | Home
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

        Home ->
            "#home"


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

        _ ->
            Error404 url


defaultUrl : Url
defaultUrl =
    StartPage

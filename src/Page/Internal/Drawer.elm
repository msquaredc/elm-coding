module Page.Internal.Drawer exposing (Config, Header, Model, Msg(..), defaultModel, headerFromCoder, update, view)

import Db exposing (Db, Row)
import Entities.Coder as Coder
import Html exposing (Html, h3, h6, text)
import Html.Attributes as Attributes
import Id exposing (Id)
import Material
import Material.Drawer.Dismissible as DismissibleDrawer
import Material.Drawer.Modal as Drawer
import Material.List as Lists
import Material.Options as Options


type alias Model m =
    { mdc : Material.Model m
    , drawer : Bool
    }


type alias Config m =
    { header : Maybe (Header m)
    , locations : List (Location)
    , favourites : List (Favourite)
    }


type alias Header m =
    { title : Html m
    , subtitle : Html m
    }


type alias Location =
    { icon : Maybe (String)
    , label : String
    , href : String
    , active : Bool
    }

type alias Favourite = 
      {
      icon : Maybe (String)
      , label : String
      , href : String
      , active : Bool
      , progress : Maybe Float
      }


headerFromCoder : Row Coder.Model -> Header m
headerFromCoder ( cid, model ) =
    { title = text model.name
    , subtitle = text (Id.toString cid)
    }


defaultModel : Model m
defaultModel =
    { mdc = Material.defaultModel
    , drawer = False
    }


type Msg m
    = Mdc (Material.Msg m)
    | CloseDrawer
    | OpenDrawer


update : (Msg m -> m) -> Msg m -> Model m -> ( Model m, Cmd m )
update lift msg model =
    case msg of
        Mdc msg_ ->
            Material.update (lift << Mdc) msg_ model

        CloseDrawer ->
            ( { model | drawer = False }, Cmd.none )

        OpenDrawer ->
            ( { model | drawer = True }, Cmd.none )


view : (Msg m -> m) -> Model m -> Config m -> List (Html m)
view lift model config =
    [ Drawer.view (lift << Mdc)
        "my-drawer"
        model.mdc
        [ Drawer.open |> Options.when model.drawer ]
        [ viewHeader lift model config.header
        , Drawer.content []
            [ Lists.nav (lift << Mdc)
                "my-list"
                model.mdc
                [ Lists.singleSelection
                , Lists.useActivated
                ]
                  (List.concat [(viewLocations lift model config.locations),
                  [Lists.divider [][]]
                  ,(viewFavourites lift model config.favourites)])
                {- [ Lists.a
                    [ Options.attribute (Attributes.href "#persistent-drawer")
                    , Lists.activated
                    ]
                    [ Lists.graphicIcon [] "inbox"
                    , text "Inbox"
                    ]
                , Lists.a
                    [ Options.attribute (Attributes.href "#persistent-drawer")
                    ]
                    [ Lists.graphicIcon [] "star"
                    , text "Star"
                    ]
                , Lists.divider [] []
                , Lists.a
                    [ Options.attribute (Attributes.href "#persistent-drawer")
                    ]
                    [ Lists.graphicIcon [] "send"
                    , text "Sent Mail"
                    ]
                , Lists.a
                    [ Options.attribute (Attributes.href "#persistent-drawer")
                    ]
                    [ Lists.graphicIcon [] "drafts"
                    , text "Drafts"
                    ]
                ] -}
            ]
        ]
    , Drawer.scrim [ Options.onClick (lift CloseDrawer) ] []

    {- , Options.styled Html.div
       [ Options.cs "drawer-frame-app-content" ]
       [ Html.p [] [ text "content" ] ]
    -}
    ]

locationOptions : Location -> List (Lists.Property m)
locationOptions location =
      case location.active of
          True ->
            [ Options.attribute (Attributes.href location.href), Lists.activated]
      
          False ->
            [ Options.attribute (Attributes.href location.href)]

locationContent : Location -> List (Html m)
locationContent location =
      case location.icon of
          Nothing ->
              [text location.label]
      
          Just icon ->
              [ Lists.graphicIcon [] icon
                    , text location.label
                    ]

viewLocations : (Msg m -> m) -> Model m -> List (Location) -> List (Lists.ListItem m)
viewLocations lift model locations =
      let
          f location =
                  Lists.a
                    (locationOptions location)
                    (locationContent location)
      in
            List.map f locations

viewFavourites : (Msg m -> m) -> Model m -> List (Favourite) -> List (Lists.ListItem m)
viewFavourites lift model favourites =
      []

viewHeader : (Msg m -> m) -> Model m -> Maybe (Header m) -> Html m
viewHeader lift model mb_config =
    case mb_config of
        Nothing ->
            Html.div [] []

        Just config ->
            Drawer.header []
                [ Options.styled h3 [ Drawer.title ] [ config.title ]
                , Options.styled h6 [ Drawer.subTitle ] [ config.subtitle ]
                ]

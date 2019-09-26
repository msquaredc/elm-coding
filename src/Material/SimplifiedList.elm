module Material.SimplifiedList exposing (Item, Msg(..), view, viewModel)

import Html exposing (Html, text)
import List.Extra
import Material
import Material.List as Lists


type Msg m a
    = Mdc (Material.Msg m)
    | Select a
    | Noop


type alias Item =
    { icon : String
    , primary : String
    , secondary : String
    }


onSelect : List a -> Int -> Msg m a
onSelect objects index =
    case List.Extra.getAt index objects of
        Just object ->
            Select object

        Nothing ->
            Noop


view : (Msg m a -> m) -> Material.Model m -> (a -> Item) -> List a -> Html m
view lift mdc mapper objects =
    Lists.ul (lift << Mdc)
        "my-list"
        mdc
        [ Lists.twoLine
        , Lists.avatarList
        , Lists.onSelectListItem (lift << onSelect objects)
        ]
        (objects
            |> List.map mapper
            |> List.map viewModel
        )


viewModel : Item -> Lists.ListItem m
viewModel item =
    Lists.li []
        [ Lists.graphicIcon [] item.icon
        , Lists.text []
            [ Lists.primaryText []
                [ text item.primary
                ]
            , Lists.secondaryText []
                [ text item.secondary
                ]
            ]
        , Lists.metaIcon [] "info"
        ]



{- viewCoderRow : (Id Coder.Model, Coder.Model) -> Lists.ListItem m
   viewCoderRow (id,model) =
       Lists.li []
           [ Lists.graphicIcon [] "person"
           , Lists.text []
               [ Lists.primaryText []
                       [ text model.name
                       ]
               , Lists.secondaryText []
                       [ text (Id.toString id)
                       ]
               ]
           , Lists.metaIcon [] "info"
           ]


   {- ask2 : (Msg m -> m) -> Model m -> Data.Model -> Html m
   ask2 lift model data =
       Html.map lift (
           div []
           [ button [ onClick Decrement ] [ text "-" ]
           , div [] [ text (String.fromInt model.var) ]
           , button [ onClick Increment ] [ text "+" ]
       ]) -}

   toPersonList : (Msg m -> m) -> Model m -> List(Db.Row Coder.Model) -> Html m
   toPersonList lift model persons  =
       Lists.ul (lift<<Mdc) "my-list" model.mdc
           [ Lists.twoLine
           , Lists.avatarList
           , Lists.onSelectListItem (lift <<Select)
           ]
           (List.map viewCoderRow persons)
-}

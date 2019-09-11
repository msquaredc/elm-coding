module Material.Table exposing (..)

import Html 
import Html.Attributes 

table : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
table attributes elements = 
    Html.div [Html.Attributes.attribute "class" "mdc-data-table"] [
        Html.table (List.append [Html.Attributes.attribute "class" "mdc-data-table__table"] attributes) elements
    ]

thead : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
thead = Html.thead

trh : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
trh attributes elements =
    Html.tr (List.append [Html.Attributes.attribute "class" "mdc-data-table__header-row",
                          Html.Attributes.attribute "role" "columnheader",
                          Html.Attributes.attribute "scope" "col"] attributes) elements

th : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
th attributes elements =
    Html.th (List.append [Html.Attributes.attribute "class" "mdc-data-table__header-cell"] attributes) elements

tbody : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
tbody attributes elements = 
    Html.tbody (List.append [Html.Attributes.attribute "class" "mdc-data-table__content"] attributes) elements

tr : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
tr attributes elements =
    Html.tr (List.append [Html.Attributes.attribute "class" "mdc-data-table__row"] attributes) elements

td : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
td attributes elements =
    Html.td (List.append [Html.Attributes.attribute "class" "mdc-data-table__cell"] attributes) elements

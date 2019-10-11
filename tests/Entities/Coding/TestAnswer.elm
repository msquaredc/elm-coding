module Entities.TestAnswer exposing (suite)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)

import Data.Internal as I
import Id exposing (Id)
import Entities.Coding.Answer as CodingAnswer
import Data.Access as A
import Data.Generation as Generate exposing (..)
import Shrink
import Random exposing (Generator)

user : Fuzzer CodingAnswer.Model
user =
    Fuzz.custom user_generator user_simplifier

user_generator : Generator CodingAnswer.Model
user_generator =
    

suite : Test
suite = 
    describe "Encode Decode Tests"
        [ 
            describe "Missing Coding Questions"
                [ 
                    test "No current Questions" <|
                        \_ ->
                            let
                                model = I.empty
                                coding = ((Id.fromString "coding_id"),
                                            Coding.Model
                                                (Id.fromString "coder_id"))
                            in
                                Expect.equal (A.missing_coding_questions model coding) []
                ]
        ]
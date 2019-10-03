module Data.TestAccess exposing (suite)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)

import Data.Internal as I
import Id exposing (Id)
import Entities.Coding as Coding
import Data.Access as A

suite : Test
suite = 
    describe "Data Access tests"
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
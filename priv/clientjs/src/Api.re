open RecipeCard;
open IngredientsList;
open InstructionsList;

/*
  get a cookie's contents as a string
 */
[@bs.module "js-cookie"] [@bs.return nullable]
external getAsString: string => option(string) = "get";

module Decode = {
  let ingredient = json =>
    Json.Decode.{
      id: json |> field("id", int),
      name: json |> field("name", string),
    };

  let instruction = json =>
    Json.Decode.{
      id: json |> field("id", string),
      text: json |> field("text", string),
    };

  let recipe = json =>
    Json.Decode.{
      id: json |> field("id", int),
      name: json |> field("name", string),
      cook_time: json |> field("cook_time", string),
      prep_time: json |> field("prep_time", string),
      total_time: json |> field("total_time", string),
      favorited: json |> field("favorited", bool),
      image_url: json |> field("image_url", string),
      ingredients: json |> field("ingredients", array(ingredient)),
      instructions: json |> field("instructions", array(instruction)),
    };

  let recipes = json =>
    Json.Decode.(json |> field("recipes", array(recipe)));
};

let getRecipes = () =>
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/recipes",
      Fetch.RequestInit.make(
        ~headers=
          Fetch.HeadersInit.make({
            "Authorization":
              "Bearer: "
              ++ (
                switch (getAsString("token")) {
                | Some(token) => token
                | None => ""
                }
              ),
          }),
        (),
      ),
    )
    |> then_(Fetch.Response.json)
    |> then_(json => json |> Decode.recipes |> resolve)
  );

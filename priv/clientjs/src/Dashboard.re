open RecipeCard;
open IngredientsList;
open InstructionsList;

module Decode = {
  let ingredient = json =>
    Json.Decode.{
      id: json |> field("id", int),
      name: json |> field("name", string),
    };

  let instruction = json =>
    Json.Decode.{
      id: json |> field("id", int),
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

type action =
  | FetchRecipes
  | FetchFailure
  | LoadRecipes(array(recipe));

type state =
  | Error(string)
  | Loading
  | Loaded(array(recipe));

let component = ReasonReact.reducerComponent("Dashboard");

let make = _children => {
  ...component,
  initialState: () => Loading,
  didMount: self => self.send(FetchRecipes),
  reducer: (action, state) =>
    switch (action) {
    | FetchRecipes =>
      ReasonReact.UpdateWithSideEffects(
        Loading,
        (
          self => {
            Js.log("requesting recipes!");
            Js.Promise.(
            // TODO AUTH
              Fetch.fetch("/api/recipes")
              |> then_(Fetch.Response.json)
              |> then_(json =>
                   json
                   |> Decode.recipes
                   |> (recipes => self.send(LoadRecipes(recipes)))
                   |> resolve
                 )
              |> catch(_err =>
                   Js.Promise.resolve(self.send(FetchFailure))
                 )
              |> ignore
            );
          }
        ),
      )
    | LoadRecipes(recipes) =>
      Js.log("hello");
      ReasonReact.Update(Loaded(recipes));
    },
  render: self =>
    switch (self.state) {
    | Error(msg) => <div> {ReasonReact.string("Error: " ++ msg)} </div>
    | Loading => <div> {ReasonReact.string("Loading...")} </div>
    | Loaded(recipes) =>
      <div className="recipe-list pure-g">
        {
          Array.map(recipe => <RecipeCard recipe showDetails=false />, recipes)
          |> ReasonReact.array
        }
      </div>
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

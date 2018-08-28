type action =
  | LoadRecipes(array(RecipeCard.recipe));

type state =
  | Error(string)
  | Loading
  | Loaded(array(RecipeCard.recipe));

let component = ReasonReact.reducerComponent("Dashboard");

let make = _children => {
  ...component,
  initialState: () => Loading,
  didMount: self =>
    self.send(
      LoadRecipes([|
        {
          id: 1,
          cook_time: "10 minutes",
          prep_time: "10 minutes",
        total_time: "20 minutes",
        image_url: "google.com/image",
        name: "Mac n Cheese",
        favorited: false,
        ingredients: [||],
        instructions: [||]
        },
      |]),
    ),
  reducer: (action, state) =>
    switch (action) {
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

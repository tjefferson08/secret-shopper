open RecipeCard;

/*
  get a cookie's contents as a string
 */
[@bs.module "js-cookie"]
external getAsString: string => option(string) = "get";

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
            Js.Promise.(
              Api.getRecipes()
              |> then_(recipes =>
                   Js.Promise.resolve(self.send(LoadRecipes(recipes)))
                 )
              |> catch(_err => {
                   Js.log(_err);
                   Js.Promise.resolve(self.send(FetchFailure));
                 })
            );
            ();
          }
        ),
      )
    | LoadRecipes(recipes) =>
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

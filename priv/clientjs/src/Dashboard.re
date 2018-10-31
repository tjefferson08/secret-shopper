type action =
  | FetchRecipes
  | FetchFailure
  | CreateFavorite(int)
  | DeleteFavorite(int)
  | UpdateRecipe(int, Recipe.t)
  | LoadRecipes(array(Recipe.t));

type state =
  | Error(string)
  | Loading
  | Loaded(array(Recipe.t));

let component = ReasonReact.reducerComponent("Dashboard");

let requestRecipes = self =>
  Js.Promise.(
    Api.getRecipes()
    |> then_(recipes =>
         Js.Promise.resolve(self.ReasonReact.send(LoadRecipes(recipes)))
       )
    |> catch(_err => Js.Promise.resolve(self.ReasonReact.send(FetchFailure)))
  )
  |> ignore;

let createFavorite = (recipeId, recipe, self) =>
  Js.Promise.(
    Api.createFavorite(recipeId)
    |> then_(_resp =>
         resolve(
           self.ReasonReact.send(
             UpdateRecipe(recipeId, {...recipe, favorited: true}),
           ),
         )
       )
    |> catch(_err => resolve(self.ReasonReact.send(FetchFailure)))
  )
  |> ignore;

let deleteFavorite = (recipeId, recipe, self) =>
  Js.Promise.(
    Api.deleteFavorite(recipeId)
    |> then_(_resp =>
         resolve(
           self.ReasonReact.send(
             UpdateRecipe(recipeId, {...recipe, favorited: false}),
           ),
         )
       )
    |> catch(_err => resolve(self.ReasonReact.send(FetchFailure)))
  )
  |> ignore;

let make = _children => {
  ...component,
  initialState: () => Loading,
  didMount: self => {
    if (!Api.isAuthenticated()) {
      ReasonReact.Router.push("/sign_in");
    };
    self.send(FetchRecipes);
  },
  reducer: (action, state) =>
    switch (action) {
    | FetchFailure => ReasonReact.Update(Error("poop"))
    | FetchRecipes =>
      ReasonReact.UpdateWithSideEffects(Loading, requestRecipes)
    | CreateFavorite(recipeId) =>
      switch (state) {
      | Loaded(recipes) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          createFavorite(
            recipeId,
            Recipe.(
              recipes |> Array.to_list |> List.find(r => r.id == recipeId)
            ),
          ),
        )
      | _ => ReasonReact.NoUpdate
      }
    | DeleteFavorite(recipeId) =>
      switch (state) {
      | Loaded(recipes) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          deleteFavorite(
            recipeId,
            Recipe.(
              recipes |> Array.to_list |> List.find(r => r.id == recipeId)
            ),
          ),
        )
      | _ => ReasonReact.NoUpdate
      }
    | LoadRecipes(recipes) => ReasonReact.Update(Loaded(recipes))
    | UpdateRecipe(recipeId, recipe) =>
      switch (state) {
      | Loaded(recipes) =>
        let newRecipes =
          recipes
          |> Array.to_list
          |> List.filter(Recipe.(r => r.id != recipeId))
          |> Array.of_list
          |> Array.append([|recipe|]);
        ReasonReact.Update(Loaded(newRecipes));
      | _ => ReasonReact.NoUpdate
      }
    },
  render: self =>
    switch (self.state) {
    | Error(msg) => <div> {ReasonReact.string("Error: " ++ msg)} </div>
    | Loading => <div> {ReasonReact.string("Loading...")} </div>
    | Loaded(recipes) =>
      <div className="recipe-list pure-g">
        {
          Array.map(
            recipe => {
              let setFavorite =
                Recipe.(
                  selected =>
                    selected ?
                      self.send(CreateFavorite(recipe.id)) :
                      self.send(DeleteFavorite(recipe.id))
                );

              <RecipeCard
                key={string_of_int(recipe.id)}
                recipe
                showDetails=false
                setFavorite
              />;
            },
            recipes,
          )
          |> ReasonReact.array
        }
      </div>
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

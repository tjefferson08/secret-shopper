type action =
  | FetchRecipe
  | FetchFailure
  | CreateFavorite(int)
  | DeleteFavorite(int)
  | UpdateRecipe(int, Recipe.t)
  | LoadRecipe(Recipe.t);

type state =
  | Error(string)
  | Loading
  | Loaded(Recipe.t);

let component = ReasonReact.reducerComponent("RecipeShow");

let requestRecipe = (recipeId, self) =>
  Js.Promise.(
    Api.getRecipe(recipeId)
    |> then_(recipe =>
         Js.Promise.resolve(self.ReasonReact.send(LoadRecipe(recipe)))
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
  didMount: self => self.send(FetchRecipe),
  reducer: (action, state) =>
    switch (action) {
    | FetchFailure => ReasonReact.Update(Error("poop"))
    | FetchRecipe =>
      ReasonReact.UpdateWithSideEffects(Loading, requestRecipe(1))
    | CreateFavorite(recipeId) =>
      switch (state) {
      | Loaded(recipe) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          createFavorite(recipeId, recipe),
        )
      | _ => ReasonReact.NoUpdate
      }
    | DeleteFavorite(recipeId) =>
      switch (state) {
      | Loaded(recipe) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          deleteFavorite(recipeId, recipe),
        )
      | _ => ReasonReact.NoUpdate
      }
    | LoadRecipe(recipe) => ReasonReact.Update(Loaded(recipe))
    | UpdateRecipe(recipeId, newRecipe) =>
      switch (state) {
      | Loaded(recipe) => ReasonReact.Update(Loaded(newRecipe))
      | _ => ReasonReact.NoUpdate
      }
    },
  render: self =>
    switch (self.state) {
    | Error(msg) => <div> {ReasonReact.string("Error: " ++ msg)} </div>
    | Loading => <div> {ReasonReact.string("Loading...")} </div>
    | Loaded(recipe) =>
      let setFavorite =
        Recipe.(
          (
            selected =>
              selected ?
                self.send(CreateFavorite(recipe.id)) :
                self.send(DeleteFavorite(recipe.id))
          )
        );
      Recipe.(
        <RecipeCard
          key={string_of_int(recipe.id)}
          recipe
          showDetails=false
          setFavorite
        />
      );
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

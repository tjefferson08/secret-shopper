type action =
  | FetchRecipes
  | FetchFailure
  | CreateFavorite(int)
  | DeleteFavorite(int)
  | UpdateRecipe(Recipe.t)
  | LoadRecipes(array(Recipe.t));

module IntMap =
  Map.Make({
    type t = int;
    let compare = compare;
  });

type state =
  | Error(string)
  | Loading
  | Loaded(IntMap.t(Recipe.t));

let component = ReasonReact.reducerComponent("Dashboard");

let map_from_array = recipeArray =>
  Recipe.(
    Array.fold_left(
      (accMap, recipe) => IntMap.add(recipe.id, recipe, accMap),
      IntMap.empty,
      recipeArray,
    )
  );

let requestRecipes = self =>
  Js.Promise.(
    Api.getRecipes()
    |> then_(recipes =>
         resolve(self.ReasonReact.send(LoadRecipes(recipes)))
       )
    |> catch(_err => resolve(self.ReasonReact.send(FetchFailure)))
  )
  |> ignore;

let createFavorite = (recipeId, recipe, self) =>
  Js.Promise.(
    Api.createFavorite(recipeId)
    |> then_(_resp =>
         resolve(
           self.ReasonReact.send(UpdateRecipe({...recipe, favorited: true})),
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
             UpdateRecipe({...recipe, favorited: false}),
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
          createFavorite(recipeId, IntMap.find(recipeId, recipes)),
        )
      | _ => ReasonReact.NoUpdate
      }
    | DeleteFavorite(recipeId) =>
      switch (state) {
      | Loaded(recipes) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          deleteFavorite(recipeId, IntMap.find(recipeId, recipes)),
        )
      | _ => ReasonReact.NoUpdate
      }
    | LoadRecipes(recipes) =>
      ReasonReact.Update(Loaded(map_from_array(recipes)))
    | UpdateRecipe(newRecipe) =>
      switch (state) {
      | Loaded(recipesMap) =>
        let newRecipesMap = IntMap.add(newRecipe.id, newRecipe, recipesMap);
        ReasonReact.Update(Loaded(newRecipesMap));
      | _ => ReasonReact.NoUpdate
      }
    },
  render: self =>
    switch (self.state) {
    | Error(msg) => <div> {ReasonReact.string("Error: " ++ msg)} </div>
    | Loading => <div> {ReasonReact.string("Loading...")} </div>
    | Loaded(recipesMap) =>
      <div className="recipe-list pure-g">
        {
          IntMap.bindings(recipesMap)
          |> List.map(((_key, recipe)) => {
               let setFavorite =
                 Recipe.(
                   (
                     selected =>
                       selected ?
                         self.send(CreateFavorite(recipe.id)) :
                         self.send(DeleteFavorite(recipe.id))
                   )
                 );

               <RecipeCard
                 key={string_of_int(recipe.id)}
                 recipe
                 showDetails=false
                 setFavorite
               />;
             })
          |> Array.of_list
          |> ReasonReact.array
        }
      </div>
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

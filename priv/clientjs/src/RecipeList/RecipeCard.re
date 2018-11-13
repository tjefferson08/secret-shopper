open Recipe;

module Card = {
  let component = ReasonReact.statelessComponent("RecipeCard");

  let make = (~recipe: Recipe.t, ~showDetails, ~setFavorite, _children) => {
    let {
      id,
      cook_time,
      favorited,
      image_url,
      ingredients,
      instructions,
      name,
      prep_time,
      total_time,
    } = recipe;

    {
      ...component,
      render: _self =>
        <div key={string_of_int(id)} className="pure-u-1 pure-u-md-1-3">
          <div className="recipe-card">
            <div className="header">
              <FavoriteBadge selected=favorited onClick=setFavorite />
              <h3 className="name"> {ReasonReact.string(name)} </h3>
            </div>
            <img className="thumbnail" alt=name src=image_url />
            <Time label="Cook time" value=cook_time />
            <Time label="Prep time" value=prep_time />
            <Time label="Total time" value=total_time />
            {
              showDetails ?
                <>
                  <IngredientsList ingredients />
                  <InstructionsList instructions />
                </> :
                ReasonReact.null
            }
          </div>
        </div>,
    };
  };
};

module CardWithUpdate = {
  type action =
    | Failure(string)
    | CreateFavorite(int)
    | DeleteFavorite(int)
    | LoadRecipe(Recipe.t);

  type state =
    | Error(string)
    | Loaded(Recipe.t);

  let component = ReasonReact.reducerComponent("RecipeShow");

  let createFavorite = (recipeId, recipe, self) =>
    Js.Promise.(
      Api.createFavorite(recipeId)
      |> then_(_resp =>
           resolve(
             self.ReasonReact.send(LoadRecipe({...recipe, favorited: true})),
           )
         )
      |> catch(_err =>
           resolve(
             self.ReasonReact.send(
               Failure("Unable to favorite this recipe"),
             ),
           )
         )
    )
    |> ignore;

  let deleteFavorite = (recipeId, recipe, self) =>
    Js.Promise.(
      Api.deleteFavorite(recipeId)
      |> then_(_resp =>
           resolve(
             self.ReasonReact.send(
               LoadRecipe({...recipe, favorited: false}),
             ),
           )
         )
      |> catch(_err =>
           resolve(
             self.ReasonReact.send(
               Failure("Unable to un-favorite this recipe"),
             ),
           )
         )
    )
    |> ignore;

  let make = (~recipe, ~showDetails, _children) => {
    ...component,
    initialState: () => Loaded(recipe),
    reducer: (action, state) =>
      switch (action) {
      | CreateFavorite(recipeId) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          createFavorite(recipeId, recipe),
        )
      | DeleteFavorite(recipeId) =>
        ReasonReact.UpdateWithSideEffects(
          state,
          deleteFavorite(recipeId, recipe),
        )
      | LoadRecipe(recipe) => ReasonReact.Update(Loaded(recipe))
      | Failure(err) =>
        ReasonReact.SideEffects((_self => Js.log("Error: " ++ err)))
      },
    render: self =>
      switch (self.state) {
      | Error(msg) => <div> {ReasonReact.string("Error: " ++ msg)} </div>
      | Loaded(recipe) =>
        let setFavorite = selected =>
          selected ?
            self.send(CreateFavorite(recipe.id)) :
            self.send(DeleteFavorite(recipe.id));
        <Card recipe showDetails setFavorite />;
      },
  };
};

let make = CardWithUpdate.make;

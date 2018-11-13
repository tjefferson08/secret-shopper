module IntMap =
  Map.Make({
    type t = int;
    let compare = compare;
  });

let map_from_array = recipeArray =>
  Recipe.(
    Array.fold_left(
      (accMap, recipe) => IntMap.add(recipe.id, recipe, accMap),
      IntMap.empty,
      recipeArray,
    )
  );

module RecipesFetcher =
  DataFetch.Make({
    type data = array(Recipe.t);
  });

let make = _children =>
  RecipesFetcher.make(
    ~fetch=Api.getRecipes,
    ~failedMessage="Unable to load recipes",
    ~render=
      recipesArray => {
        let recipesMap = map_from_array(recipesArray);
        <div className="recipe-list pure-g">
          {
            IntMap.bindings(recipesMap)
            |> List.map(((key, recipe)) =>
                 <RecipeCard
                   key={string_of_int(key)}
                   recipe
                   showDetails=false
                 />
               )
            |> Array.of_list
            |> ReasonReact.array
          }
        </div>;
      },
    [||],
  );

let component = ReasonReact.statelessComponent("Dashboard");

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

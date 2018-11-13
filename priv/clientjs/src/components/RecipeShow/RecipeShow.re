module RecipeFetcher =
  DataFetch.Make({
    type data = Recipe.t;
  });

let make = (~recipeId, _children) =>
  RecipeFetcher.make(
    ~fetch=() => Api.getRecipe(recipeId),
    ~failedMessage="Unable to load recipe",
    ~render=recipe => <RecipeCard recipe showDetails=true />,
    [||],
  );

let component = ReasonReact.statelessComponent("RecipeShow");

[@bs.deriving abstract]
type jsProps = {recipeId: int};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~recipeId=jsProps->recipeIdGet, [||])
  );

type recipe = {
  id: int,
  name: string,
  cook_time: string,
  prep_time: string,
  total_time: string,
  favorited: bool,
  image_url: string,
  ingredients: array(IngredientsList.ingredient),
  instructions: array(InstructionsList.instruction),
};

let component = ReasonReact.statelessComponent("RecipeCard");

let make = (~recipe, ~showDetails, _children) => {
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

  let setFavorite = event => Js.log("TODO: implement setFavorite");

  {
    ...component,
    render: _self =>
      <div className="pure-u-1 pure-u-md-1-3">
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

/* type jsProps = { */
/*   recipe, */
/*   showDetails: bool, */
/* }; */

/* let jsComponent = */
/*   ReasonReact.wrapReasonForJs(~component, jsProps => */
/*     make( */
/*       ~recipe=jsProps->recipeGet, */
/*       ~showDetails=jsProps->showDetailsGet, */
/*       [||], */
/*     ) */
/*   ); */

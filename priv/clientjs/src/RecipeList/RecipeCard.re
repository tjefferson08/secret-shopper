open Recipe;

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

[@bs.deriving abstract]
type props = {
  recipe: Recipe.abs_t,
  showDetails: bool,
  setFavorite: bool => unit,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      make(
        ~recipe=Recipe.tFromJs(jsProps->recipeGet),
        ~showDetails=jsProps->showDetailsGet,
        ~setFavorite=jsProps->setFavoriteGet,
        [||],
      );
    },
  );

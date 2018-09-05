let component = ReasonReact.statelessComponent("IngredientsList");

let make = (~ingredients: array(SecretShopper.Ingredient.t), _children) => {
  ...component,
  render: _self =>
    <>
      <h4> {ReasonReact.string("Ingredients")} </h4>
      <ul>
        {
          Array.map(
            (ing: Ingredient.t) =>
              <li key={string_of_int(ing.id)}>
                {ReasonReact.string(ing.name)}
              </li>,
            ingredients,
          )
          |> ReasonReact.array
        }
      </ul>
    </>,
};

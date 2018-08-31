let component = ReasonReact.statelessComponent("IngredientsList");

type ingredient = {
  id: int,
  name: string,
};

let make = (~ingredients, _children) => {
  ...component,
  render: _self =>
    <>
      <h4> {ReasonReact.string("Ingredients")} </h4>
      <ul>
        {
          Array.map(
            ing =>
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

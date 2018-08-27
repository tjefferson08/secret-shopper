let component = ReasonReact.statelessComponent("Time");

[@bs.deriving abstract]
type ingredient = {
  id: int,
  name: string,
};

[@bs.deriving abstract]
type jsProps = {ingredients: array(ingredient)};

let make = (~ingredients, _children) => {
  ...component,
  render: _self =>
    <>
      <h4> {ReasonReact.string("Ingredients")} </h4>
      <ul>
        {
          Array.map(
            ing =>
              <li key={string_of_int(idGet(ing))}>
                {ReasonReact.string(nameGet(ing))}
              </li>,
            ingredients,
          )
          |> ReasonReact.array
        }
      </ul>
    </>,
};

/* bunch of rigamarole if you want to use this in a js file */
let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~ingredients=jsProps |> ingredientsGet, [||])
  );

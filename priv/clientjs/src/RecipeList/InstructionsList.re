let component = ReasonReact.statelessComponent("InstructionsList");

type instruction = {
  id: string,
  text: string,
};

let make = (~instructions, _children) => {
  ...component,
  render: _self =>
    <>
      <h4> {ReasonReact.string("Instructions")} </h4>
      <ol>
        {
          Array.map(
            ing =>
              <li key={ing.id}>
                {ReasonReact.string(ing.text)}
              </li>,
            instructions,
          )
          |> ReasonReact.array
        }
      </ol>
    </>,
};

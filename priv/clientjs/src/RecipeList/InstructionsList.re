let component = ReasonReact.statelessComponent("InstructionsList");

type instruction = {
  id: int,
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
              <li key={string_of_int(ing.id)}>
                {ReasonReact.string(ing.text)}
              </li>,
            instructions,
          )
          |> ReasonReact.array
        }
      </ol>
    </>,
};

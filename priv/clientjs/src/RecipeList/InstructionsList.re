let component = ReasonReact.statelessComponent("InstructionsList");

let make = (~instructions: array(SecretShopper.Instruction.t), _children) => {
  ...component,
  render: _self =>
    <>
      <h4> {ReasonReact.string("Instructions")} </h4>
      <ol>
        {
          Array.map(
            (inst: SecretShopper.Instruction.t) =>
              <li key={inst.id}> {ReasonReact.string(inst.text)} </li>,
            instructions,
          )
          |> ReasonReact.array
        }
      </ol>
    </>,
};

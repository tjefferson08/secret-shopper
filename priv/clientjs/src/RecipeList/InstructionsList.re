let component = ReasonReact.statelessComponent("InstructionsList");

[@bs.deriving abstract]
type instruction = {
  id: int,
  text: string,
};

[@bs.deriving abstract]
type jsProps = {instructions: array(instruction)};

let make = (~instructions, _children) => {
  ...component,
  render: _self =>
    <>
      <h4> {ReasonReact.string("Instructions")} </h4>
      <ol>
        {
          Array.map(
            ing =>
              <li key={string_of_int(idGet(ing))}>
                {ReasonReact.string(textGet(ing))}
              </li>,
            instructions,
          )
          |> ReasonReact.array
        }
      </ol>
    </>,
};

/* bunch of rigamarole if you want to use this in a js file */
let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~instructions=jsProps |> instructionsGet, [||])
  );

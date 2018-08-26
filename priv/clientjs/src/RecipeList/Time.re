let component = ReasonReact.statelessComponent("Time");

let make = (~label, ~value, _children) => {
  ...component,
  render: _self =>
    <div className="time-container">
      <strong className="time-label">
        {ReasonReact.string(label ++ ":")}
      </strong>
      <p className="time-value"> {ReasonReact.string(value)} </p>
    </div>,
};

/* bunch of rigamarole if you want to use this in a js file */
[@bs.deriving abstract]
type jsProps = {
  label: string,
  value: string,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~label=jsProps->labelGet, ~value=jsProps->valueGet, [||])
  );

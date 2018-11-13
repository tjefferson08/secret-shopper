module Styles = {
  open Css;

  let container = style([fontSize(px(16)), height(px(40))]);

  let text = style([display(inlineBlock), padding2(px(5), px(10))]);
};

let component = ReasonReact.statelessComponent("Time");

let make = (~label, ~value, _children) => {
  ...component,
  render: _self =>
    <div className={"time-container " ++ Styles.container}>
      <strong className={"time-label " ++ Styles.text}>
        {ReasonReact.string(label ++ ":")}
      </strong>
      <p className={"time-value " ++ Styles.text}>
        {ReasonReact.string(value)}
      </p>
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

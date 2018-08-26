let component = ReasonReact.statelessComponent("FavoriteBadge");

let badgeStyle =
  ReactDOMRe.Style.make(
    ~display="inline-block",
    ~cursor="pointer",
    ~color="gold",
    ~paddingRight="12px",
    (),
  );

let make = (~selected, ~onClick, _children) => {
  let onBadgeClick = event => {
    ReactEvent.Mouse.preventDefault(event);
    onClick(!selected);
  };
  {
    ...component,
    render: _self =>
      ReasonReact.cloneElement(
        <i
          className={"fa-star fa-2x" ++ (selected ? " fas" : " far")}
          onClick=onBadgeClick
          style=badgeStyle
        />,
        ~props={"data-testid": "favorite-badge"},
        [||],
      ),
  };
};

/* bunch of rigamarole if you want to use this in a js file */
[@bs.deriving abstract]
type jsProps = {
  selected: bool,
  onClick: bool => unit,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~selected=jsProps->selectedGet, ~onClick=jsProps->onClickGet, [||])
  );

module Make = (Config: {type data;}) => {
  type action =
    | Fail(Js.Promise.error)
    | Resolve(Config.data);

  type state =
    | Loading
    | Failed(Js.Promise.error)
    | Loaded(Config.data);

  let component = ReasonReact.reducerComponent("FetcherComponent");

  let make = (~fetch, ~failedMessage, ~render, _children) => {
    ...component,
    initialState: () => Loading,
    didMount: self =>
      Js.Promise.(
        fetch()
        |> then_(data => {
             self.send(Resolve(data));
             resolve();
           })
        |> catch(error => {
             self.send(Fail(error));
             resolve();
           })
        |> ignore
      ),
    reducer: (action, state) =>
      switch (action) {
      | Fail(err) => ReasonReact.Update(Failed(err))
      | Resolve(data) => ReasonReact.Update(Loaded(data))
      },
    render: ({state}) =>
      switch (state) {
      | Loading => <div> {ReasonReact.string("loading...")} </div>
      | Failed(error) => <div> {ReasonReact.string(failedMessage)} </div>
      | Loaded(data) => render(data)
      },
  };
};

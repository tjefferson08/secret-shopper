/* TODO: load CSS */
/* import './App.css'; */

type route =
  | Dashboard
  | NotFound
  | RecipeShow(int)
  | SignIn;

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | [] => Dashboard
  | ["dashboard"] => Dashboard
  | ["recipes", recipeId] => RecipeShow(int_of_string(recipeId))
  | ["sign_in"] => SignIn
  | _ => NotFound
  };

type state = {route};

type action =
  | ChangeRoute(route);

let component = ReasonReact.reducerComponent("App");

let make = _children => {
  ...component,
  reducer: (action, _state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({route: route})
    },
  initialState: () => {route: Dashboard},
  didMount: self => {
    self.send(
      ChangeRoute(
        ReasonReact.Router.dangerouslyGetInitialUrl() |> mapUrlToRoute,
      ),
    );
    let watcherId =
      ReasonReact.Router.watchUrl(url =>
        switch (mapUrlToRoute(url)) {
        | newRoute => self.send(ChangeRoute(newRoute))
        }
      );
    self.onUnmount(() => ReasonReact.Router.unwatchUrl(watcherId));
  },
  render: self =>
    switch (Api.isAuthenticated(), self.state.route) {
    | (true, Dashboard) => <Dashboard />
    | (false, Dashboard) => <SignIn />
    | (_, RecipeShow(id)) => <div> <RecipeShow recipeId=id /> </div>
    | (_, NotFound) => <div> {ReasonReact.string("404")} </div>
    | (_, SignIn) => <SignIn />
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

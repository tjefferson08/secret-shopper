/* import { ConnectedRouter } from 'connected-react-router';
 * import React from 'react';
 * import { Provider } from 'react-redux';
 * import NavBar from './NavBar/NavBar';
 * import Router from './Router';
 * import { createStore } from './store';
 * import './App.css';
 *
 * const { store, history } = createStore();
 *
 * const App = () =>
 *   <Provider store={store}>
 *     <ConnectedRouter history={history}>
 *       <div>
 *         <NavBar />
 *         <hr />
 *         <Router />
 *       </div>
 *     </ConnectedRouter>
 *   </Provider>;
 *
 * export default App; */

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
    switch (self.state.route) {
    | Dashboard => <Dashboard />
    | RecipeShow(id) =>
      <div> {ReasonReact.string("Recipe Show " ++ string_of_int(id))} </div>
    | NotFound => <div> {ReasonReact.string("404")} </div>
    | SignIn => <SignIn />
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

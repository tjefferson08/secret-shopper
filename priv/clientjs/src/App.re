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
  | RecipeShow(int);

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | [] => Dashboard
  | ["recipes", recipeId] => RecipeShow(int_of_string(recipeId))
  | _ => Dashboard
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
  initialState: () => {route: ReasonReact.Router.dangerouslyGetInitialUrl() |> mapUrlToRoute},
  didMount: self => {
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
    | Dashboard => <div> {ReasonReact.string("Hello world")} </div>
    | RecipeShow(id) =>
      <div> {ReasonReact.string("Recipe Show " ++ string_of_int(id))} </div>
    },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

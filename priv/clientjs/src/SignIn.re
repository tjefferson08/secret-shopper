let component = ReasonReact.statelessComponent("SignIn");

let handleSubmit = event => {
  ReactEvent.Form.preventDefault(event);
  let formElement = ReactEvent.Form.target(event);
  Js.Promise.(
    Api.(
      Api.login(formElement##email##value, formElement##password##value)
      |> then_(result =>
           switch (result) {
           | Ok(token) =>
             Cookie.setString(
               "token",
               token,
               Cookie.makeConfig(~expires=1, ()),
             );
             ReasonReact.Router.push("/dashboard");
             resolve();
           | Error(_) =>
             Js.log("TODO: handle login failure");
             ReasonReact.Router.push("/sign_in");
             resolve();
           }
         )
      |> ignore
    )
  );
};

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <h1> {ReasonReact.string("Sign In")} </h1>
      <form onSubmit=handleSubmit>
        <div className="form-group">
          <label>
            {ReasonReact.string("Email:")}
            <input type_="text" name="email" />
          </label>
        </div>
        <div className="form-group">
          <label>
            {ReasonReact.string("Password")}
            <input type_="password" name="password" />
          </label>
        </div>
        <input type_="submit" value="Submit" />
      </form>
    </div>,
};

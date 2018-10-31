type result('a, 'b) =
  | Ok('a)
  | Error('b);

module Decode = {
  let loginSuccess = Json.Decode.(json => json |> field("token", string));
  let loginFailure = Json.Decode.(json => json |> field("message", string));

  let ingredient =
    Ingredient.(
      json =>
        Json.Decode.{
          id: json |> field("id", int),
          name: json |> field("name", string),
        }
    );

  let instruction =
    Instruction.(
      json =>
        Json.Decode.{
          id: json |> field("id", string),
          text: json |> field("text", string),
        }
    );

  let recipe =
    Recipe.(
      json =>
        Json.Decode.{
          id: json |> field("id", int),
          name: json |> field("name", string),
          cook_time: json |> field("cook_time", string),
          prep_time: json |> field("prep_time", string),
          total_time: json |> field("total_time", string),
          favorited: json |> field("favorited", bool),
          image_url: json |> field("image_url", string),
          ingredients: json |> field("ingredients", array(ingredient)),
          instructions: json |> field("instructions", array(instruction)),
        }
    );

  let recipesShow = json => Json.Decode.(json |> field("recipe", recipe));

  let recipesIndex = json =>
    Json.Decode.(json |> field("recipes", array(recipe)));
};

let isAuthenticated = () =>
  switch (Cookie.getAsString("token")) {
  | Some(token) => true
  | None => false
  };

let authToken = () =>
  "Bearer: "
  ++ (
    switch (Cookie.getAsString("token")) {
    | Some(token) => token
    | None => ""
    }
  );

let getRequestConfig = () =>
  Fetch.RequestInit.make(
    ~headers=Fetch.HeadersInit.make({"Authorization": authToken()}),
    (),
  );

let postRequestConfig = payload =>
  Fetch.RequestInit.make(
    ~method_=Post,
    ~headers=
      Fetch.HeadersInit.make({
        "Authorization": authToken(),
        "Content-Type": "application/json",
      }),
    ~body=Fetch.BodyInit.make(Js.Json.stringify(Js.Json.object_(payload))),
    (),
  );

let deleteRequestConfig = () =>
  Fetch.RequestInit.make(
    ~method_=Delete,
    ~headers=Fetch.HeadersInit.make({"Authorization": authToken()}),
    (),
  );

let getRecipes = () =>
  Js.Promise.(
    Fetch.fetchWithInit("/api/recipes", getRequestConfig())
    |> then_(Fetch.Response.json)
    |> then_(json => json |> Decode.recipesIndex |> resolve)
  );

let getRecipe = recipeId =>
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/recipes/" ++ string_of_int(recipeId),
      getRequestConfig(),
    )
    |> then_(Fetch.Response.json)
    |> then_(json => json |> Decode.recipesShow |> resolve)
  );

let createFavorite = recipeId => {
  let payload = Js.Dict.empty();
  Js.Dict.set(payload, "recipe_id", Js.Json.number(float_of_int(recipeId)));
  Fetch.fetchWithInit("/api/favorites", postRequestConfig(payload));
};

let deleteFavorite = recipeId =>
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/favorites/" ++ string_of_int(recipeId),
      deleteRequestConfig(),
    )
  );

let setFavoriteStatus = (recipeId, favoriteStatus) =>
  favoriteStatus ? createFavorite(recipeId) : deleteFavorite(recipeId);

let login = (email, password) => {
  let body = Js.Dict.empty();
  let payload = Js.Dict.empty();
  Js.Dict.set(payload, "email", Js.Json.string(email));
  Js.Dict.set(payload, "password", Js.Json.string(password));
  Js.Dict.set(body, "session", Js.Json.object_(payload));

  Js.Promise.(
    Fetch.fetchWithInit("/api/sessions", postRequestConfig(body))
    |> then_(response =>
         switch (response |> Fetch.Response.status) {
         | 200 =>
           response
           |> Fetch.Response.json
           |> then_(json => json |> Decode.loginSuccess |> resolve)
           |> then_(successRecord => resolve(Ok(successRecord)))
         | _ =>
           response
           |> Fetch.Response.json
           |> then_(json => json |> Decode.loginFailure |> resolve)
           |> then_(failureRecord => resolve(Error(failureRecord)))
         }
       )
  );
};

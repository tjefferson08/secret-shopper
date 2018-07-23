defmodule SecretshopperWeb.RecipeController do
  alias Secretshopper.{Recipe, Repo}
  import Ecto.Query
  import Secretshopper.Guardian.Plug, only: [current_resource: 1]
  use SecretshopperWeb, :controller

  plug(Secretshopper.AuthPipeline)

  def index(conn, _params) do
    current_user = current_resource(conn)

    recipes = Repo.all(possible_favorites(current_user.id))

    render(conn, "index.json", %{recipes: recipes, current_user: current_user})
  end

  def show(conn, params) do
    current_user = current_resource(conn)

    recipe =
      Repo.one!(
        possible_favorites(current_user.id)
        |> where([r, _, _], r.id == ^params["id"])
      )

    render(conn, "show.json", %{recipe: recipe, current_user: current_user})
  end

  defp possible_favorites(current_user_id) do
    Recipe
    |> join(:inner, [recipes], ing in assoc(recipes, :ingredients))
    |> join(
      :left,
      [recipes, ing],
      users in assoc(recipes, :users),

      # only LEFT JOIN in user records for current user to keep the
      # naive checking of users array to set "favorited" field nice
      # and fast
      users.id == ^current_user_id
    )
    |> preload([_, ing, users], ingredients: ing, users: users)
  end
end

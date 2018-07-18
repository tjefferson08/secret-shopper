defmodule SecretshopperWeb.RecipeController do
  alias Secretshopper.{Recipe, Repo}
  import Ecto.Query
  import Secretshopper.Guardian.Plug, only: [current_resource: 1]
  use SecretshopperWeb, :controller

  plug(Secretshopper.AuthPipeline)

  def index(conn, _params) do
    current_user = current_resource(conn)

    # TODO: we should be able to left_join but only include the
    # current_user data in the association (recipes_users entries
    # could be numerous, no need to query for all that here)
    recipes =
      Repo.all(
        from(r in Recipe, left_join: u in assoc(r, :users), preload: [:ingredients, users: u])
      )

    render(conn, "index.json", %{recipes: recipes, current_user: current_user})
  end
end

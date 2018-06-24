defmodule SecretshopperWeb.RecipeController do
  alias Secretshopper.{Recipe, Repo}
  import Ecto.Query
  use SecretshopperWeb, :controller

  def index(conn, _params) do
    recipes = Repo.all(from(r in Recipe, preload: [:ingredients]))
    render(conn, "index.json", %{recipes: recipes})
  end
end

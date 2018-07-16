defmodule SecretshopperWeb.FavoriteController do
  alias Secretshopper.{Recipe, RecipeUser, Repo}
  import Ecto.Query
  import Secretshopper.Guardian.Plug, only: [current_resource: 1]
  use SecretshopperWeb, :controller

  plug(Secretshopper.AuthPipeline)

  def create(conn, %{"recipe_id" => recipe_id}) do
    current_user = current_resource(conn)

    # ensure recipe exists
    Repo.get!(Recipe, recipe_id)

    %RecipeUser{recipe_id: recipe_id, user_id: current_user.id}
    |> Repo.insert!(on_conflict: :nothing)

    json(conn, %{message: "OK"})
  end

  def delete(conn, %{"id" => recipe_id}) do
    %{id: current_user_id} = current_resource(conn)

    favorite =
      Repo.one!(
        from(
          favorite in Secretshopper.RecipeUser,
          where: favorite.user_id == ^current_user_id and favorite.recipe_id == ^recipe_id
        )
      )

    Repo.delete!(favorite)

    json(conn, %{message: "OK"})
  end
end

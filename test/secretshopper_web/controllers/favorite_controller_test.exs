defmodule SecretshopperWeb.FavoriteControllerTest do
  use SecretshopperWeb.ConnCase

  alias Secretshopper.Repo
  import Secretshopper.Factory
  import Secretshopper.Guardian
  import Ecto.Query, only: [from: 2]

  def build_authed_conn do
    current_user = insert(:user)
    build_authed_conn(current_user)
  end

  def build_authed_conn(current_user) do
    {:ok, token, _} =
      encode_and_sign(current_user, %{email: current_user.email, name: current_user.name})

    conn =
      build_conn()
      |> put_req_header("authorization", "bearer: " <> token)

    {current_user, conn}
  end

  describe "create/2" do
    test "creates a join table row associating user to recipe" do
      recipe_to_favorite = insert(:recipe)
      {%{id: current_user_id}, conn} = build_authed_conn()
      %{id: recipe_to_favorite_id} = recipe_to_favorite

      conn
      |> post("/api/favorites", %{"recipe_id" => recipe_to_favorite.id})

      user_with_favorites =
        Repo.one(
          from(
            user in Secretshopper.User,
            where: user.id == ^current_user_id,
            preload: [:recipes]
          )
        )

      assert %{
               id: ^current_user_id,
               recipes: [%{id: ^recipe_to_favorite_id}]
             } = user_with_favorites
    end
  end

  describe "delete/2" do
    test "deletes a join table row associating user to recipe" do
      current_user = insert(:user)
      %{id: id_to_unfavorite} = insert(:recipe, users: [current_user])
      %{id: other_recipe_id} = insert(:recipe, users: [current_user])
      current_user = Repo.preload(current_user, :recipes)
      assert [%{id: ^id_to_unfavorite}, %{id: ^other_recipe_id}] = current_user.recipes

      {%{id: current_user_id}, conn} = build_authed_conn(current_user)

      conn
      |> delete("/api/favorites/#{id_to_unfavorite}")

      # force re-preloading assocation
      current_user = Repo.preload(current_user, :recipes, force: true)

      assert %{
               id: ^current_user_id,
               recipes: [%{id: ^other_recipe_id}]
             } = current_user
    end
  end
end

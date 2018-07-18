defmodule SecretshopperWeb.FavoriteControllerTest do
  use SecretshopperWeb.ConnCase

  alias Secretshopper.Repo

  import Authentication.Helpers
  import Secretshopper.Factory
  import Ecto.Query, only: [from: 2]

  describe "create/2" do
    test "creates a join table row associating user to recipe" do
      recipe_to_favorite = insert(:recipe)
      current_user = insert(:user)
      %{id: current_user_id} = current_user

      %{id: recipe_to_favorite_id} = recipe_to_favorite

      build_conn()
      |> authenticate_conn(current_user)
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
      %{id: current_user_id} = current_user
      %{id: id_to_unfavorite} = insert(:recipe, users: [current_user])
      %{id: other_recipe_id} = insert(:recipe, users: [current_user])
      current_user = Repo.preload(current_user, :recipes)
      assert [%{id: ^id_to_unfavorite}, %{id: ^other_recipe_id}] = current_user.recipes

      build_conn()
      |> authenticate_conn(current_user)
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

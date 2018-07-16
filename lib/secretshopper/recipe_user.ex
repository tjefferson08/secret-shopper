defmodule Secretshopper.RecipeUser do
  use Ecto.Schema
  import Ecto.Changeset

  schema "recipes_users" do
    belongs_to(:user, Secretshopper.User)
    belongs_to(:recipe, Secretshopper.Recipe)
    timestamps()
  end
end

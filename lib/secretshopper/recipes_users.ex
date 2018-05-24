defmodule Secretshopper.RecipesUsers do
  use Ecto.Schema
  import Ecto.Changeset


  schema "recipes_users" do
    field :user_id, :id
    field :recipe_id, :id

    timestamps()
  end

  @doc false
  def changeset(recipes_users, attrs) do
    recipes_users
    |> cast(attrs, [])
    |> validate_required([])
  end
end

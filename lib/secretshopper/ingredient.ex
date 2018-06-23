defmodule Secretshopper.Ingredient do
  use Ecto.Schema
  import Ecto.Changeset

  schema "ingredients" do
    field(:name, :string)
    many_to_many :recipes, Secretshopper.Recipe, join_through: "recipes_recipes"
    timestamps()
  end

  @required_fields ~w(name)a
  @optional_fields ~w()a

  @doc false
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end

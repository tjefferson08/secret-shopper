defmodule Secretshopper.Recipe do
  use Ecto.Schema
  import Ecto.Changeset


  schema "recipe" do
    field :cook_time_in_minutes, :integer
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:name, :cook_time_in_minutes])
    |> validate_required([:name, :cook_time_in_minutes])
  end
end

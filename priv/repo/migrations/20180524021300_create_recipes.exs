defmodule Secretshopper.Repo.Migrations.CreateRecipes do
  use Ecto.Migration

  def change do
    create table(:recipes) do
      add :name, :string
      add :cook_time_in_minutes, :integer

      timestamps()
    end

  end
end

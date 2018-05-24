defmodule Secretshopper.Repo.Migrations.CreateRecipesUsers do
  use Ecto.Migration

  def change do
    create table(:recipes_users) do
      add :user_id, references(:users, on_delete: :nothing)
      add :recipe_id, references(:recipes, on_delete: :nothing)

      timestamps()
    end

    create index(:recipes_users, [:user_id])
    create index(:recipes_users, [:recipe_id])
  end
end

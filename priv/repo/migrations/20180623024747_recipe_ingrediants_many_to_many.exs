defmodule Secretshopper.Repo.Migrations.RecipeIngrediantsManyToMany do
  use Ecto.Migration

  def up do
    create table(:recipes_ingredients) do
      add :recipe_id, references(:recipes)
      add :ingredient_id, references(:ingredients)
    end

    create unique_index(:recipes_ingredients, [:recipe_id, :ingredient_id])
  end

  def down do
    drop unique_index(:recipes_ingredients, [:recipe_id, :ingredient_id])
    drop table(:recipes_ingredients)
  end
end

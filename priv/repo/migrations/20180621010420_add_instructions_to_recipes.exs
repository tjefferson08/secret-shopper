defmodule Secretshopper.Repo.Migrations.AddInstructionsToRecipes do
  use Ecto.Migration

  def up do
    alter table("recipes") do
      add(:instructions, {:array, :map}, null: false, default: [])
    end

    create(index(:recipes, [:instructions], using: :gin))
  end

  def down do
    drop(index(:recipes, [:instructions]))

    alter table("recipes") do
      remove(:instructions)
    end
  end
end

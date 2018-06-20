defmodule Secretshopper.Repo.Migrations.AddTimesToRecipes do
  use Ecto.Migration

  def up do
    alter table("recipes") do
      add(:cook_time, :time)
      add(:prep_time, :time)
      add(:total_time, :time)
    end
  end

  def down do
    alter table("recipes") do
      remove(:cook_time)
      remove(:prep_time)
      remove(:total_time)
    end
  end
end

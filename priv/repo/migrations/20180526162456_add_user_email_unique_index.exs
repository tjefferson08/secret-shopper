defmodule Secretshopper.Repo.Migrations.AddUserEmailUniqueIndex do
  use Ecto.Migration

  def up do
    alter table("users") do
      modify :email, :string, null: false
      modify :name, :string, null: false
    end

    create unique_index(:users, [:email])
  end

  def down do
    alter table("users") do
      modify :email, :string, null: true
      modify :name, :string, null: true
    end
    drop index(:users, [:email])
  end
end

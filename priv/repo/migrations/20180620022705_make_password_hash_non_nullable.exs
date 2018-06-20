defmodule Secretshopper.Repo.Migrations.MakePasswordHashNonNullable do
  use Ecto.Migration

  def up do
    alter table("users") do
      modify(:password_hash, :string, null: false)
    end
  end

  def down do
    alter table("users") do
      modify(:password_hash, :string)
    end
  end
end

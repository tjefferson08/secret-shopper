defmodule Secretshopper.Factory do
  use ExMachina.Ecto, repo: Secretshopper.Repo
  use Secretshopper.UserFactory
  use Secretshopper.IngredientFactory
end

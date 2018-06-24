defmodule Secretshopper.Factory do
  use ExMachina.Ecto, repo: Secretshopper.Repo
  use Secretshopper.IngredientFactory
  use Secretshopper.RecipeFactory
  use Secretshopper.UserFactory
end

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#

defmodule Secretshopper.Seeds do
  alias Secretshopper.Ingredient
  alias Secretshopper.Recipe
  alias Secretshopper.RecipeImport
  alias Secretshopper.User

  def create do
    %User{}
    |> User.changeset(%{"email" => "bob@bob.com", "name" => "Bob", "password" => "password"})
    |> Secretshopper.Repo.insert!(on_conflict: :nothing)

    # recipes
    recipe_data = [
      RecipeImport.fetch("https://www.allrecipes.com/recipe/165190/spicy-vegan-potato-curry/"),
      RecipeImport.fetch("https://www.allrecipes.com/recipe/8667/jays-jerk-chicken/"),
      RecipeImport.fetch("https://www.allrecipes.com/recipe/223042/chicken-parmesan/")
    ]

    Enum.map(
      recipe_data,
      &insert_recipe/1
    )
  end

  defp insert_recipe(recipe_params) do
    ingredients = insert_ingredients(recipe_params[:ingredients])

    %Recipe{}
    |> Recipe.changeset(recipe_params)
    |> Secretshopper.Repo.insert!()
  end

  defp insert_ingredients(ingredient_params_arr) do
    Enum.map(
      ingredient_params_arr,
      fn ingredient_params ->
        # TODO: these need to be unique'd
        %Ingredient{}
        |> Ingredient.changeset(ingredient_params)
        |> Secretshopper.Repo.insert!()
      end
    )
  end
end

Secretshopper.Seeds.create()

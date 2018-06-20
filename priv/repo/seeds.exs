# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
alias Secretshopper.User
alias Secretshopper.Recipe
alias Secretshopper.RecipeImport

%User{}
|> User.changeset(%{"email" => "bob@bob.com", "name" => "Bob", "password" => "password"})
|> Secretshopper.Repo.insert!()

recipe_data = [
  RecipeImport.fetch("https://www.allrecipes.com/recipe/165190/spicy-vegan-potato-curry/"),
  RecipeImport.fetch("https://www.allrecipes.com/recipe/8667/jays-jerk-chicken/"),
  RecipeImport.fetch("https://www.allrecipes.com/recipe/223042/chicken-parmesan/")
]

Enum.map(
  recipe_data,
  fn recipe_params ->
    %Recipe{}
    |> Recipe.changeset(recipe_params)
    |> Secretshopper.Repo.insert!()
  end
)

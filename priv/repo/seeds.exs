# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
alias Secretshopper.Ingredient
alias Secretshopper.Recipe
alias Secretshopper.RecipeImport
alias Secretshopper.User

%User{}
|> User.changeset(%{"email" => "bob@bob.com", "name" => "Bob", "password" => "password"})
|> Secretshopper.Repo.insert!()

# recipes
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

#ingredients

ingredient_data = [
  %{name: "Potato"},
  %{name: "Vegetable Oil"},
  %{name: "Yellow onion"},
  %{name: "Garlic Clove"},
  %{name: "Ground Cumin"},
  %{name: "Cayenne Pepper"},
  %{name: "Curry Powder"},
  %{name: "Garam Masala"},
  %{name: "Ginger Root"},
  %{name: "Salt"},
  %{name: "Diced Tomatoes"},
  %{name: "Garbanzo Beans"},
  %{name: "Canned Peas"},
  %{name: "Coconut Milk"}
]

Enum.map(
  ingredient_data,
  fn ingredient_params ->
    %Ingredient{}
    |> Ingredient.changeset(ingredient_params)
    |> Secretshopper.Repo.insert!()
  end
)

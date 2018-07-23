defmodule SecretshopperWeb.RecipeView do
  import Timex.Format.Duration.Formatters.Humanized, only: [format: 1]
  use SecretshopperWeb, :view

  def render("index.json", %{recipes: recipes, current_user: current_user}) do
    recipes_json =
      recipes
      |> Enum.map(fn recipe -> prepare_recipe(recipe, current_user) end)

    %{recipes: recipes_json}
  end

  def render("show.json", %{recipe: recipe, current_user: current_user}) do
    %{recipe: prepare_recipe(recipe, current_user)}
  end

  defp prepare_recipe(recipe, current_user) do
    recipe |> apply_favorite_status(current_user) |> parse_durations
  end

  defp apply_favorite_status(recipe, current_user) do
    is_favorite = Enum.any?(recipe.users, fn user -> user.id == current_user.id end)
    Map.put(recipe, :favorited, is_favorite)
  end

  defp parse_durations(recipe) do
    %{
      recipe
      | cook_time: human_readable_duration(recipe.cook_time),
        prep_time: human_readable_duration(recipe.prep_time),
        total_time: human_readable_duration(recipe.total_time)
    }
  end

  defp human_readable_duration(duration) do
    format(duration)
  end
end

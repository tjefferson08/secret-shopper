defmodule SecretshopperWeb.RecipeView do
  import Timex.Format.Duration.Formatters.Humanized, only: [format: 1]
  use SecretshopperWeb, :view

  def render("index.json", %{recipes: recipes}) do
    recipes_json =
      recipes
      |> Enum.map(&recipe_json/1)

    %{recipes: recipes_json}
  end

  defp recipe_json(recipe) do
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

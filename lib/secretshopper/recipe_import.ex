defmodule Secretshopper.RecipeImport do
  def fetch(url) do
    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> parse(body)
      {:ok, %HTTPoison.Response{status_code: 404}} -> {:error, "Not Found"}
      {:error, %HTTPoison.Error{reason: reason}} -> {:error, reason}
    end
  end

  defp parse(body) do
    [name] =
      body
      |> Floki.find("h1[itemprop=\"name\"], h2[itemprop=\"name\"], h3[itemprop=\"name\"]")
      |> Enum.map(fn {_tag, _attrs, text} ->
        Enum.fetch!(text, 0)
      end)

    [image_url] =
      body
      |> Floki.find("[itemprop=\"image\"]")
      |> Floki.attribute("src")

    [cook_time] =
      body
      |> Floki.find("[itemprop=\"cookTime\"]")
      |> Floki.attribute("datetime")

    [prep_time] =
      body
      |> Floki.find("[itemprop=\"prepTime\"]")
      |> Floki.attribute("datetime")

    [total_time] =
      body
      |> Floki.find("[itemprop=\"totalTime\"]")
      |> Floki.attribute("datetime")

    ingredients =
      body
      |> Floki.find("[itemprop=\"ingredients\"],[itemprop=\"recipeIngredient\"]")
      |> Enum.map(fn {_tag, _attrs, text} ->
        %{name: Enum.fetch!(text, 0)}
      end)

    instructions =
      body
      |> Floki.find("[itemprop=\"recipeInstructions\"]")
      |> Floki.text()
      |> String.split("\n")
      |> Enum.map(fn str -> String.trim(str) end)
      |> Enum.filter(fn str -> String.length(str) > 0 end)
      |> Enum.map(fn str -> %{text: str} end)

    %{
      name: name,
      image_url: image_url,
      cook_time: cook_time,
      prep_time: prep_time,
      total_time: total_time,
      ingredients: ingredients,
      instructions: instructions
    }
  end
end

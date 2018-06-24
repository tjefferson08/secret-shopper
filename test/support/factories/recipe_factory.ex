defmodule Secretshopper.RecipeFactory do
  alias Timex.Duration

  defmacro __using__(_opts) do
    quote do
      def recipe_factory do
        %Secretshopper.Recipe{
          name: "Black Beans and Rice",

          # these are N minutes
          cook_time: Duration.from_clock({0, 5, 0, 0}),
          prep_time: Duration.from_clock({0, 5, 0, 0}),
          total_time: Duration.from_clock({0, 10, 0, 0}),
          ingredients: [build(:ingredient)]
        }
      end
    end
  end
end

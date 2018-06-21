defmodule Secretshopper.IngredientFactory do
  defmacro __using__(_opts) do
    quote do
      def ingredient_factory do
        %Secretshopper.Ingredient{
          name: sequence(:name, &"food-number-#{&1}")
        }
      end
    end
  end
end

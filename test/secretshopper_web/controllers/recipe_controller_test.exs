defmodule SecretshopperWeb.RecipeControllerTest do
  use SecretshopperWeb.ConnCase

  import Secretshopper.Factory
  import Secretshopper.Guardian

  def build_authed_conn do
    current_user = insert(:user)

    {:ok, token, _} =
      encode_and_sign(current_user, %{email: current_user.email, name: current_user.name})

    build_conn()
    |> put_req_header("authorization", "bearer: " <> token)
  end

  describe "index/2" do
    test "renders all recipes" do
      first_recipe =
        insert(
          :recipe,
          instructions: [%Instruction{text: "Cook it"}, %Instruction{text: "Eat it"}],
          cook_time: {0, 5, 0, 0},
          prep_time: {0, 5, 0, 0},
          total_time: {0, 10, 0, 0}
        )

      second_recipe =
        insert(
          :recipe,
          instructions: [%Instruction{text: "Make it"}, %Instruction{text: "Consume it"}],
          cook_time: {1, 0, 0, 0},
          prep_time: {0, 30, 0, 0},
          total_time: {2, 0, 0, 0}
        )

      conn =
        build_authed_conn()
        |> get("/api/recipes")

      assert %{
               "recipes" => [
                 %{
                   "cook_time" => "5 minutes",
                   "id" => id1,
                   "instructions" => [
                     %{"text" => "Cook it"},
                     %{"text" => "Eat it"}
                   ],
                   "ingredients" => ingredients1,
                   "prep_time" => "5 minutes",
                   "total_time" => "10 minutes"
                 },
                 %{
                   "cook_time" => "1 hour",
                   "id" => id2,
                   "instructions" => [
                     %{"text" => "Make it"},
                     %{"text" => "Consume it"}
                   ],
                   "ingredients" => ingredients2,
                   "prep_time" => "30 minutes",
                   "total_time" => "2 hours"
                 }
               ]
             } = json_response(conn, 200)

      assert id1 == first_recipe.id
      assert id2 == second_recipe.id

      expected_ingredient_ids1 = Enum.map(first_recipe.ingredients, fn ing -> ing.id end)
      actual_ingredient_ids1 = Enum.map(ingredients1, fn ing -> ing["id"] end)
      expected_ingredient_ids2 = Enum.map(second_recipe.ingredients, fn ing -> ing.id end)
      actual_ingredient_ids2 = Enum.map(ingredients2, fn ing -> ing["id"] end)
      assert actual_ingredient_ids1 == expected_ingredient_ids1
      assert actual_ingredient_ids2 == expected_ingredient_ids2
    end
  end
end
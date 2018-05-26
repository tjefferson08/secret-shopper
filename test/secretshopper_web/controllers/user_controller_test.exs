defmodule SecretshopperWeb.UserControllerTest do
  use SecretshopperWeb.ConnCase

  import Secretshopper.Factory

  describe "create/2" do
    test "Creates user and responds with the payload when attrs are valid" do
      params =
        string_params_for(:user)
        |> Map.merge(%{"password": "secrets"})

      conn =
        build_conn()
        |> post("/auth/users", user: params)

      assert json_response(conn, 200) == %{
        "user" => %{"email" => params["email"],
                    "name" => params["name"]}
      }
    end

    test "Does not create user and responds with errors when attrs are invalid" do
      params =
        string_params_for(:user)

      conn =
        build_conn()
        |> post("/auth/users", user: params)

      assert json_response(conn, 200) == %{
        "errors" => %{"password" => ["can't be blank"]}
      }
    end
  end
end

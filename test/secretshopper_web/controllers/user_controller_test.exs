defmodule SecretshopperWeb.UserControllerTest do
  use SecretshopperWeb.ConnCase

  import Secretshopper.Factory

  describe "create/2" do
    test "Creates user and responds with the payload when attrs are valid" do
      params =
        string_params_for(:user)
        |> Map.merge(%{"password": "secrets",
                      "password_confirmation": "secrets"})

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

      assert %{
        "errors" => %{"password" => ["can't be blank"]}
      } = json_response(conn, 400)
    end

    test "Does not create user when pw & confirmation do not match" do
      params =
        string_params_for(:user)
        |> Map.merge(%{"password": "secrets",
                      "password_confirmation": "not-the-same"})

      conn =
        build_conn()
        |> post("/auth/users", user: params)

      assert json_response(conn, 400) == %{
        "errors" => %{"password_confirmation" => ["does not match password!"]}
      }
    end
  end
end

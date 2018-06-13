defmodule SecretshopperWeb.UserControllerTest do
  use SecretshopperWeb.ConnCase

  import Secretshopper.Factory
  import Secretshopper.Guardian

  def build_authed_conn do
    current_user = insert(:user)
    {:ok, token, _} = encode_and_sign(current_user, %{email: current_user.email, name: current_user.name})
    build_conn()
    |> put_req_header("authorization", "bearer: " <> token)
  end

  describe "show/2" do
    test "Shows JSON for a user when it exists" do
      user = insert(:user)

      conn =
        build_authed_conn()
        |> get("/api/users/#{user.id}")

      assert json_response(conn, 200) == %{
               "user" => %{"email" => user.email, "name" => user.name}
             }
    end

    test "Renders 404 when user not found" do
      conn =
        build_authed_conn()
        |> get("/api/users/999")

      assert json_response(conn, 404) == %{
               "error" => "Not Found"
             }
    end
  end

  describe "create/2" do
    test "Creates user and responds with the payload when attrs are valid" do
      params =
        string_params_for(:user)
        |> Map.merge(%{password: "secrets", password_confirmation: "secrets"})

      conn =
        build_conn()
        |> post("/api/users", user: params)

      assert json_response(conn, 200) == %{
               "user" => %{"email" => params["email"], "name" => params["name"]}
             }
    end

    test "Does not create user and responds with errors when attrs are invalid" do
      params = string_params_for(:user)

      conn =
        build_conn()
        |> post("/api/users", user: params)

      assert %{
               "errors" => %{"password" => ["can't be blank"]}
             } = json_response(conn, 400)
    end

    test "Does not create user when pw & confirmation do not match" do
      params =
        string_params_for(:user)
        |> Map.merge(%{password: "secrets", password_confirmation: "not-the-same"})

      conn =
        build_conn()
        |> post("/api/users", user: params)

      assert json_response(conn, 400) == %{
               "errors" => %{"password_confirmation" => ["does not match password!"]}
             }
    end
  end
end

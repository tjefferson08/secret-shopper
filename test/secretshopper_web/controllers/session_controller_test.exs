defmodule SecretshopperWeb.SessionControllerTest do
  use SecretshopperWeb.ConnCase
  alias Secretshopper.Repo
  alias Secretshopper.User

  defp registration_params do
    %{email: "bob@bob.com", name: "Bob", password: "secrets", password_confirmation: "secrets"}
  end

  defp setup_user do
    %User{}
    |> User.registration_changeset(registration_params())
    |> Repo.insert()
  end

  describe "create/2" do
    test "Logs in a user when email and pw are good" do
      setup_user()

      params = %{email: "bob@bob.com", password: "secrets"}

      conn =
        build_conn()
        |> post("/api/sessions", session: params)

      assert %{"token" => token} = json_response(conn, 200)
      assert(String.length(token) > 25)
    end

    test "responds with failure when user not found" do
      params = %{email: "notbob@bob.com", password: "secrets"}

      conn =
        build_conn()
        |> post("/api/sessions", session: params)

      assert json_response(conn, 400) == %{"message" => "failure"}
    end

    test "responds with unauthorized when wrong pw" do
      setup_user()
      params = %{email: "bob@bob.com", password: "wrong"}

      conn =
        build_conn()
        |> post("/api/sessions", session: params)

      assert json_response(conn, 403) == %{"message" => "forbidden"}
    end
  end
end

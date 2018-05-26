defmodule SecretshopperWeb.UserControllerTest do
  use SecretshopperWeb.ConnCase

  import Secretshopper.Factory

  describe "create/2" do
    test "Creates user and redirects to show when attrs are valid" do
      params = params_for(:user)

      conn =
        build_conn()
        |> post("/auth/users", user: params)

      conn |> response(200)
    end
  end
end

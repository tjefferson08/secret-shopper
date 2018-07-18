defmodule Authentication.Helpers do
  import Secretshopper.Factory
  import Secretshopper.Guardian
  use Phoenix.ConnTest

  def authenticate_conn(conn) do
    current_user = insert(:user)
    authenticate_conn(conn, current_user)
  end

  def authenticate_conn(conn, current_user) do
    {:ok, token, _} =
      encode_and_sign(current_user, %{email: current_user.email, name: current_user.name})

    conn
    |> put_req_header("authorization", "bearer: " <> token)
  end
end

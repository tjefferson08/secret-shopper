defmodule SecretshopperWeb.SessionController do
  import SecretshopperWeb.Auth, only: [request_auth_token: 2]

  use SecretshopperWeb, :controller

  def create(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case request_auth_token(email, password) do
      {:ok, token, _claims} ->
        conn
        |> json(%{"token" => token})

      {:error, :not_found} ->
        conn
        |> put_status(400)
        |> json(%{"message" => "failure"})

      {:error, :unauthorized} ->
        conn
        |> put_status(403)
        |> json(%{"message" => "forbidden"})
    end
  end
end

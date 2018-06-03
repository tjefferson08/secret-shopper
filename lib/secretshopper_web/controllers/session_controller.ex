defmodule SecretshopperWeb.SessionController do
  import SecretshopperWeb.Auth, only: [sign_in_with_email_and_password: 3, sign_out: 1]
  plug(:scrub_params, "session" when action in ~w(create)a)
  use SecretshopperWeb, :controller

  def create(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case sign_in_with_email_and_password(conn, email, password) do
      {:ok, conn} ->
        conn
        |> json(%{"message" => "ok"})

      {:error, :not_found, conn} ->
        conn
        |> put_status(400)
        |> json(%{"message" => "failure"})

      {:error, :unauthorized, conn} ->
        conn
        |> put_status(403)
        |> json(%{"message" => "forbidden"})
    end
  end

  def delete(conn, _) do
    conn
    |> sign_out()
    |> json(%{"message" => "ok"})
  end
end

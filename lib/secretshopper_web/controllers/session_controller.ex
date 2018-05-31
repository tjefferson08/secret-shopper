defmodule SecretshopperWeb.SessionController do
  use SecretshopperWeb, :controller
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  alias Secretshopper.Repo
  alias Secretshopper.User

  def create(conn, %{"session" => %{"email" => email,
                                    "password" => password}}) do
    case Repo.get_by(User, email: email) do
      nil ->
        conn
        |> put_status(400)
        |> json(%{"message" => "failure"})
      user ->
        if checkpw(password, user.password_hash) do
          conn
          |> Secretshopper.Guardian.Plug.sign_in(user)
          |> json(%{"message" => "ok"})
        else
          dummy_checkpw()
          conn
          |> put_status(403)
          |> json(%{"message" => "forbidden"})
        end
    end
  end
end

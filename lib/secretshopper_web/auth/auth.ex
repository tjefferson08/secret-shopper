defmodule SecretshopperWeb.Auth do
  alias Secretshopper.Repo
  alias Secretshopper.User

  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

  def sign_in_with_email_and_password(conn, email, provided_pw) do
    case Repo.get_by(User, email: email) do
      nil ->
        dummy_checkpw()
        {:error, :not_found, conn}

      user ->
        if checkpw(provided_pw, user.password_hash) do
          {:ok, sign_in(conn, user)}
        else
          {:error, :unauthorized, conn}
        end
    end
  end

  def sign_in(conn, user) do
    conn |> Secretshopper.Guardian.Plug.sign_in(user)
  end

  def sign_out(conn) do
    Secretshopper.Guardian.Plug.sign_out(conn)
  end
end

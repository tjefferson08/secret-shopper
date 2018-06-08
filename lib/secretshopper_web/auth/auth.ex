defmodule SecretshopperWeb.Auth do
  alias Secretshopper.Repo
  alias Secretshopper.User

  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  import Secretshopper.Guardian, only: [encode_and_sign: 2]

  def request_auth_token(email, provided_pw) do
    case Repo.get_by(User, email: email) do
      nil ->
        dummy_checkpw()
        {:error, :not_found}

      user ->
        if checkpw(provided_pw, user.password_hash) do
          encode_and_sign(user, %{email: email, name: user.name})
        else
          {:error, :unauthorized}
        end
    end
  end
end

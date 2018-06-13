defmodule Secretshopper.AuthErrorHandler do
  use SecretshopperWeb, :controller

  def auth_error(conn, {type, _reason}, _opts) do
    conn
    |> put_status(401)
    |> json(%{error: type})
  end
end

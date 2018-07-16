defmodule Secretshopper.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :secretshopper,
    module: Secretshopper.Guardian,
    error_handler: Secretshopper.AuthErrorHandler

  @claims %{iss: "Secretshopper.#{Mix.env()}"}

  plug(Guardian.Plug.VerifyHeader, claims: @claims, realm: "Bearer")
  plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource)
end

defmodule Secretshopper.Guardian do
  use Guardian, otp_app: :secretshopper

  alias Secretshopper.Repo
  alias Secretshopper.User

  def subject_for_token(resource = %User{}, _claims) do
    {:ok, to_string(resource.id)}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(%{"sub" => sub}) do
    {:ok, Repo.get(User, sub)}
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end

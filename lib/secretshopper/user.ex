defmodule Secretshopper.User do
  use Ecto.Schema
  use Guardian, otp_app: :secretshopper

  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string

    timestamps()
  end

  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  # def resource_from_claims(claims) do
  #   user = claims["sub"]
  #   |> Repo.get!(User, id)
  #   {:ok, user}

  #   # handle :err
  # end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/@/)
  end
end

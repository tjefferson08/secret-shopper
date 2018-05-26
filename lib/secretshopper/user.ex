defmodule Secretshopper.User do
  use Ecto.Schema
  use Guardian, otp_app: :secretshopper

  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string

    timestamps()
  end

  @required_fields ~w(email)a
  @optional_fields ~w(name)a


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
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
  end
end

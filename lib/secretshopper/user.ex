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

  @doc false
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
  end
end

defmodule Secretshopper.User do
  use Ecto.Schema

  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:name, :string)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)
    many_to_many(:recipes, Secretshopper.Recipe, join_through: Secretshopper.RecipeUser)
    timestamps()
  end

  @required_fields ~w(email name password)a
  @optional_fields ~w()a

  @doc false
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> hash_password
  end

  def registration_changeset(struct, params) do
    struct
    |> changeset(params)
    |> validate_length(:password, min: 6, max: 100)
    |> validate_confirmation(:password, message: "does not match password!", required: true)
  end

  defp hash_password(changeset) do
    case changeset do
      # TODO: user Comeonin.Bcrypt.add_hash instead
      %Ecto.Changeset{
        valid?: true,
        changes: %{password: password}
      } ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))

      _ ->
        changeset
    end
  end
end

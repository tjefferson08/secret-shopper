defmodule Secretshopper.Recipe do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timex.Duration

  schema "recipes" do
    field(:name, :string)
    field(:cook_time, Timex.Ecto.Time)
    field(:prep_time, Timex.Ecto.Time)
    field(:total_time, Timex.Ecto.Time)

    timestamps()
  end

  @required_fields ~w(cook_time prep_time total_time)a
  @optional_fields ~w()a

  @doc false
  def changeset(struct, params \\ %{}) do
    params = parse_durations(params)

    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end

  defp parse_durations(%{cook_time: cook_time, prep_time: prep_time, total_time: total_time}) do
    %{
      cook_time: Duration.parse!(cook_time),
      prep_time: Duration.parse!(prep_time),
      total_time: Duration.parse!(total_time)
    }
  end
end

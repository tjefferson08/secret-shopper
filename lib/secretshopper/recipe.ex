defmodule Secretshopper.Recipe do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timex.Duration

  # "quick" way to serialize, kinda like including AMS::Serializable I
  # think. Or you can write a view module... IDK!
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at]}

  schema "recipes" do
    field(:name, :string)
    field(:cook_time, Timex.Ecto.Time)
    field(:prep_time, Timex.Ecto.Time)
    field(:total_time, Timex.Ecto.Time)
    embeds_many(:instructions, Instruction)
    many_to_many(:ingredients, Secretshopper.Ingredient, join_through: "recipes_ingredients")
    timestamps()
  end

  @required_fields ~w(cook_time prep_time total_time)a
  @optional_fields ~w()a

  @doc false
  def changeset(struct, params \\ %{}) do
    params = parse_durations(params)

    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> cast_embed(:instructions, required: true)
    |> validate_required(@required_fields)
    |> cast_assoc(:ingredients)
  end

  defp parse_durations(
         map = %{cook_time: cook_time, prep_time: prep_time, total_time: total_time}
       ) do
    %{
      map
      | cook_time: Duration.parse!(cook_time),
        prep_time: Duration.parse!(prep_time),
        total_time: Duration.parse!(total_time)
    }
  end
end

defmodule Instruction do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(text)a
  @optional_fields ~w()a

  embedded_schema do
    field(:text, :string)
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end

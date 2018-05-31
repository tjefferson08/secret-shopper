defmodule SecretshopperWeb.UserController do
  use SecretshopperWeb, :controller

  alias Secretshopper.User
  alias Secretshopper.Repo

  plug :scrub_params, "user" when action in [:create]

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.html", user: user)
  end

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
    changeset = %User{}
    |> User.registration_changeset(user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(400)
        |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &SecretshopperWeb.ErrorHelpers.translate_error/1)})
    end
  end
end

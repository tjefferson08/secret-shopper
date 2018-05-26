defmodule SecretshopperWeb.UserController do
  use SecretshopperWeb, :controller

  alias Secretshopper.User
  alias Secretshopper.Repo

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.html", user: user)
  end

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
    new_user = User.changeset(%User{}, user_params)
    |> Repo.insert!
    render(conn, "show.html", user: new_user)
  end
end

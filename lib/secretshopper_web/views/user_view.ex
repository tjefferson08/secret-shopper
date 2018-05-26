defmodule SecretshopperWeb.UserView do
  use SecretshopperWeb, :view

  def render("show.json", %{user: user}) do
    %{user: user_json(user)}
  end

  defp user_json(user) do
    %{email: user.email,
      name: user.name}
  end
end

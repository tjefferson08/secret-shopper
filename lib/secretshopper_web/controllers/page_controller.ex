defmodule SecretshopperWeb.PageController do
  use SecretshopperWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

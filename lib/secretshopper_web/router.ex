defmodule SecretshopperWeb.Router do
  use SecretshopperWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", SecretshopperWeb do
    scope "/api" do
      pipe_through(:api)
      resources("/sessions", SessionController, only: [:create])
      resources("/users", UserController, only: [:show, :new, :create])
    end
  end
end

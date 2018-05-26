defmodule SecretshopperWeb.Router do
  use SecretshopperWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SecretshopperWeb do
    scope "/auth"  do
      pipe_through :api
      resources "/users", UserController, only: [:show, :new, :create]
    end
  end


  # Other scopes may use custom stacks.
  # scope "/api", SecretshopperWeb do
  #   pipe_through :api
  # end
end

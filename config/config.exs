# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :secretshopper,
  ecto_repos: [Secretshopper.Repo]

# Configures the endpoint
config :secretshopper, SecretshopperWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "skwFCjJJKcZMKh5+jpuqyjCJHeUyFHP5D6LopwWA0tSKkyA5ER6BlAcviB04KFCV",
  render_errors: [view: SecretshopperWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Secretshopper.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

config :secretshopper, Secretshopper.Guardian,
 issuer: "Secretshopper.#{Mix.env}",
 secret_key: to_string(Mix.env) <> "SuPerseCret_aBraCadabrA"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

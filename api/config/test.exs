use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :api, ApiWeb.Endpoint,
  http: [:inet6, port: 4000],
  url: [host: System.get_env("PELLETS_URL"), port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :api, Api.Repo,
  username: {:system, "PELLETS_PGUSER", ""},
  password: {:system, "PELLETS_PGPASSWORD", ""},
  database: {:system, "PELLETS_PGDATABASE", ""},
  hostname: {:system, "PELLETS_PGHOST", ""},
  pool_size: 15

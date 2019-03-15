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
  username: {:system, "PGUSER", ""},
  password: {:system, "PGPASSWORD", ""},
  database: {:system, "PGDATABASE", ""},
  hostname: {:system, "PGHOST", ""},
  pool_size: 15

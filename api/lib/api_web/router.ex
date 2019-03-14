defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug CORSPlug, origin: ["http://localhost:3000"]
    plug :accepts, ["json"]
  end

  scope "/", ApiWeb do
    pipe_through :api

    get "/prices", PriceController, :prices
    get "/chart", PriceController, :chart

  end

end

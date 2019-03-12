defmodule ApiWeb.PriceController do
  use ApiWeb, :controller
  import Ecto.Query
  alias Api.{
    Repo,
    Price
  }

  def index(conn, _params) do

    prices = Repo.all(from(
      p in Price,
      where: p.date in fragment("(SELECT date FROM prices ORDER BY date DESC LIMIT 1)"),
      select: %{
        price: p.price,
        title: p.title,
        url: p.url,
        date: p.date
      },
      order_by: [asc: p.price]
   ))

    aggregate = Repo.all(from(
      p in Price,
      select: %{
        average: fragment("AVG(price)"),
        date: p.date,
      },
      group_by: p.date
    ))

    # render(conn, "test.json", %{})
    render(conn, "prices.json", %{ prices: prices, aggregations: aggregate})

  end

end

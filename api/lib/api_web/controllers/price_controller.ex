defmodule ApiWeb.PriceController do
  use ApiWeb, :controller
  import Ecto.{
    Query
  }
  alias Api.{
    Repo,
    Price
  }

  def prices(conn, _params) do

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

   render(conn, "index.json", %{ data: prices })

  end

  def chart(conn, _params) do

    aggregate = Repo.all(from(
      p in Price,
      select: %{
        average: fragment("AVG(price)"),
        date: fragment("extract(epoch from ?)", p.date),
      },
      group_by: p.date,
      order_by: [asc: p.date]
    ))

    render(conn, "index.json", %{ data: aggregate })

  end

end

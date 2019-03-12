defmodule ApiWeb.PriceView do
  use ApiWeb, :view
  alias Timestamp.Stamp

  def render("test.json", _) do
    %{data: %{success: 1}}
  end

  def render("prices.json", %{prices: prices, aggregations: aggregations}) do
    %{data: %{
      prices: prices,
      aggregations: aggregations
    }}
  end

end

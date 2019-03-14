defmodule ApiWeb.PriceView do
  use ApiWeb, :view
  alias Timestamp.Stamp

  def render("index.json", %{data: data}) do
    %{data: data}
  end

end

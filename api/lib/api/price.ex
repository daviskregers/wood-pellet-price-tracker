defmodule Api.Price do
  use Ecto.Schema
  import Ecto.Changeset


  schema "prices" do
    field :date, :naive_datetime
    field :price, :decimal
    field :title, :string
    field :url, :string
    # timestamps()
  end

  @doc false
  def changeset(price, attrs) do
    price
    |> cast(attrs, [:price, :title, :url, :date])
    |> validate_required([:price, :title, :url, :date])
  end
end

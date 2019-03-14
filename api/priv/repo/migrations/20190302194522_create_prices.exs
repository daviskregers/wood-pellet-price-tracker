defmodule Api.Repo.Migrations.CreatePrices do
  use Ecto.Migration

  def change do
    create table(:prices) do
      add :price, :float
      add :title, :string
      add :url, :string
      add :date, :naive_datetime
      timestamps()
    end

  end
end

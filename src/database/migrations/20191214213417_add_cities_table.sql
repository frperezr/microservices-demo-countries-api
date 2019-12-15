-- +goose Up
-- +goose StatementBegin
CREATE TABLE cities (
  id primary key serial not null,
  stay_price int,
  travel_price int,
  country text,
  name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

CREATE trigger update_cities_update_at
before update on cities for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists cities;
-- +goose StatementEnd

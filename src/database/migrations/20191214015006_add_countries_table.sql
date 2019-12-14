-- +goose Up
-- +goose StatementBegin
CREATE TABLE countries (
  id primary key serial not null,
  continent_code text,
  continent text,
  country text,
  country_code text,
  capital text,
  value_budget integer,
  value_midrange integer,
  value_luxury integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

CREATE trigger update_countries_update_at
before update on countries for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists countries;
-- +goose StatementEnd

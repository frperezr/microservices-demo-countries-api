-- +goose Up
-- +goose StatementBegin
CREATE TABLE countries (
  id serial NOT NULL,
  continent_code text,
  code text,
  name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  CONSTRAINT countries_pkey PRIMARY KEY (id)
);

CREATE trigger update_countries_update_at
before update on countries for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists countries;
-- +goose StatementEnd

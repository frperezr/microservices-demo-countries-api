-- +goose Up
-- +goose StatementBegin
CREATE TABLE continents (
  id serial NOT NULL,
  code text,
  name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  CONSTRAINT continents_pkey PRIMARY KEY (id)
);

CREATE trigger update_continents_update_at
before update on continents for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists continents;
-- +goose StatementEnd

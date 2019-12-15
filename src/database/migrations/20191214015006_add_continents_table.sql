-- +goose Up
-- +goose StatementBegin
CREATE TABLE continents (
  id primary key serial not null,
  code text,
  name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

CREATE trigger update_continents_update_at
before update on continents for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists continents;
-- +goose StatementEnd

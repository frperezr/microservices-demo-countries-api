-- +goose Up
-- +goose StatementBegin
CREATE OR REPLACE FUNCTION update_updated_at_column()
returns trigger as $$
  begin
      new.updated_at = now();
      return new;
  end;
$$ language plpgsql;
-- +goose StatementEnd


-- +goose Down
-- +goose StatementBegin
DROP FUNCTION update_updated_at_column();
-- +goose StatementEnd

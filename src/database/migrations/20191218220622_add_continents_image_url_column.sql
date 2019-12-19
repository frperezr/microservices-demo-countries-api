-- +goose Up
-- +goose StatementBegin
ALTER TABLE continents
ADD COLUMN image_url text NOT NULL DEFAULT '';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE continents
DROP COLUMN IF EXISTS image_url;
-- +goose StatementEnd

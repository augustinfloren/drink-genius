sudo -u postgres psql -f ./data/scripts/init_db.sql

export PGUSER=drink_genius
export PGPASSWORD=drink_genius
export PGDATABASE=drink_genius

psql -f ./data/scripts/create_tables.sql

node '/var/www/html/APO/DrinkGenius/data/import_data.js'
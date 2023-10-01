sudo -u postgres psql -f ./data/scripts/init_db.sql

export PGHOST=localhost
export PGPORT=5432
export PGUSER=drink_genius
export PGPASSWORD=drink_genius
export PGDATABASE=drink_genius

psql -f ./data/scripts/create_tables.sql

node './data/import_data.js'
sudo -u postgres psql -f ./init_db.sql

export PGUSER=drink_genius
export PGPASSWORD=drink_genius
export PGDATABASE=drink_genius

psql -f ./create_tables.sql
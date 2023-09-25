sudo -u postgres psql -f ./Back/data/scripts/init_db.sql

export PGUSER=drink_genius
export PGPASSWORD=drink_genius
export PGDATABASE=drink_genius

psql -f ./Back/data/scripts/create_tables.sql


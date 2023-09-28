sudo -u postgres psql -f ./data/scripts/init_db.sql

export PGUSER=drink_genius
export PGPASSWORD=drink_genius
export PGDATABASE=drink_genius

psql -f ./data/scripts/create_tables.sql

node '/home/student/Bureau/html/SPE_DATA/APO/DrinkGenius/projet-10-bar-to-glass/data/import_data.js'
-- SQLBook: Code
DROP DATABASE IF EXISTS drink_genius;
DROP USER IF EXISTS drink_genius;

CREATE USER drink_genius WITH PASSWORD 'drink_genius';
CREATE DATABASE drink_genius OWNER drink_genius;
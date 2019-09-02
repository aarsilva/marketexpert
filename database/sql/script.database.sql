
SET statement_timeout = 0;


SET lock_timeout = 0;


SET client_encoding = 'UTF8';


SET standard_conforming_strings = on;


SELECT pg_catalog.set_config('search_path', '', false);


SET check_function_bodies = false;


SET xmloption = content;


SET client_min_messages = warning;


CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';


SET default_with_oids = false;


CREATE TABLE public.categories (id SERIAL PRIMARY KEY,
                                                  name character varying(100) NOT NULL,
                                                                              tax integer NOT NULL);


ALTER TABLE public.categories OWNER TO postgres;


CREATE TABLE public.invoices (id SERIAL PRIMARY KEY,
                                                cpf character varying(11) NOT NULL);


ALTER TABLE public.invoices OWNER TO postgres;


CREATE TABLE public.products (ean character varying(13) PRIMARY KEY NOT NULL,
                                                                    name character varying(100) NOT NULL,
                                                                                                category integer NOT NULL,
                                                                                                                 price numeric(10,2) NOT NULL);


ALTER TABLE public.products OWNER TO postgres;


CREATE TABLE public.taxes (id SERIAL PRIMARY KEY,
                                             name character varying(100) NOT NULL,
                                                                         perc numeric(3,3));


ALTER TABLE public.taxes OWNER TO postgres;


CREATE TABLE public.invoice_products (invoice integer NOT NULL,
                                                      product character varying(13) NOT NULL,
                                                                                    tax numeric(10,2) NOT NULL,
                                                                                                      quantity integer NOT NULL,
                                                                                                                       price numeric(10,2) NOT NULL);


ALTER TABLE public.invoice_products OWNER TO postgres;
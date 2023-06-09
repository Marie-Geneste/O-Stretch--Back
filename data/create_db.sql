/*Début/lancement du script */
BEGIN;

/* Drop du domain email qui lors d'un droptable emepeche le bon fonctionnement */
DROP DOMAIN IF EXISTS "email" CASCADE;

/*Création d'un domain pour l'email avec un regex, pour qu'il n'y ai pas d'email  erronné qui puissent etre valider dans la base de donnée */
CREATE DOMAIN "email" AS text CHECK (
    value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);

/* Drop des tables si elle existent pour repartir avec une base saine */
DROP TABLE IF EXISTS "user", 
"stretch", 
"role", 
"category",
"user_stretch";

/* Création de la table role */
CREATE TABLE "role" (

        "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(12)
    );

/* Création de la table user */

CREATE TABLE "user" (

        "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "email" email NOT NULL UNIQUE,
        "password" VARCHAR NOT NULL,
        "username" VARCHAR(15) NOT NULL,
        "biography" VARCHAR(255) DEFAULT NULL,
        "role_id" INTEGER DEFAULT 2 REFERENCES "role"("id")
    );

/* Création de la table category */

CREATE TABLE "category" (

        "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL
    );

/* Création de la table stretch */

CREATE TABLE "stretch" (

        "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL NOT NULL,
        "description_content" TEXT NOT NULL,
        "main_image" VARCHAR DEFAULT NULL,
        "description_image" VARCHAR DEFAULT NULL,
        "category_id" INTEGER REFERENCES "category"("id")
    );

/* Création de la table de jointure user_stretch car il y a relation N, N entre la table "user" et "stretch" */

CREATE TABLE "user_stretch" (
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "stretch_id" INTEGER NOT NULL REFERENCES "stretch"("id") ON DELETE CASCADE,
    PRIMARY KEY ("user_id", "stretch_id")
);


COMMIT;

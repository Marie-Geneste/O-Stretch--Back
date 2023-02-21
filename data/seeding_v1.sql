BEGIN;

INSERT INTO "user" ("id", "email", "password", "username", "biography", "favorites", "role_id") VALUES
    (1, 'marie.e.geneste@gmail.com', "admin", "Stretchy", "blabla", [1], 1),

INSERT INTO "stretch" ("id", "title", "description_content", "main_image", "description_image", "category_id") VALUES
    (1, "Trapèze", "Poser une main sur une épaule afin de la maintenir vers le bas. Incliner la tête du côté opposé et ,tout en gardant l’inclinaison, pencher la tête en avant.", "", "", 1),
    (2, "SCOM (Sterno-Cléïdo-Occipito-Mastoïdien)", "Pour étirer le SCOM droit (par exemple) : Poser les doigts de la main gauche sur la clavicule droite (partie centrale). Basculer la tête en arrière (extension) et tourner la tête à droite.", "", "", 1)
    (3, "Biceps", "Tendre le bras devant soi et tendre la main vers le bas. Avec l’autre main, maintenir les doigts de la main dont le bras est tendu vers le bas.", "", "", 2),
    (4, "Triceps", "Lever le bras au dessus de la tête, plier le coude et atteindre, avec la main, l’épaule opposé en ayant le bras derrière la tête. Poser les doigts de l’autre main sur le coude du bras en l’air et tirer vers le haut.")

INSERT INTO "category" ("id", "name") VALUES
    (1, "Cou"),
    (2, "Bras"),
    (3, "Avant-bras"),
    (4, "Poitrine"),
    (5, "Ventre"),
    (6, "Dos"),
    (7, "Hanche"),
    (8, "Fessier"),
    (9, "Cuisse"),
    (10, "Jambe"),
    (11, "Pied"),


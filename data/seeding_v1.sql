-- SQLBook: Code
/*Début/lancement du script */
BEGIN;

/*Permet de modifier la table user existante et de drop la contrainte user_role_id_fkey */
ALTER TABLE "user" DROP CONSTRAINT user_role_id_fkey;

/*Permet de modifier la table stretch existante et de drop la contrainte stretch_category_id_fkey */
ALTER TABLE "stretch" DROP CONSTRAINT stretch_category_id_fkey;

/* TRUNCATE -- vide une table ou un ensemble de tables */
/* CASCADE -- vidde toutes les tables qui ont des références de clés étrangères sur une des tables nommées */
/* Donc vide la table user */
TRUNCATE TABLE "user" CASCADE;

/* Insertion/seeding des données dans la table user : en l'occurence ici un user */
INSERT INTO "user" ("id", "email", "password", "username", "biography", "role_id") VALUES 
    (0,'marie.e.geneste@gmail.com', '$2b$10$7WDPLMcEOov3yv8fC2kJUOXSEz93/tGTRU8J4V51E3d69kb/dRA1e', 'Stretchy', 'blabla', 1);
    

/* Donc vide la table stretch */
TRUNCATE TABLE "stretch" CASCADE;

/* Insertion/seeding des données dans la table stretch : en l'occurence ici tous nos étirements avec dans l'odre : */
/* Son id, son titre, son description_content, sa main_image, son description_image et son category_id */
/*VALUES = les valeurs */
INSERT INTO "stretch" ("id", "title", "description_content", "main_image", "description_image", "category_id") VALUES
    (1, 'Trapèze', 'Poser une main sur une épaule afin de la maintenir vers le bas. Incliner la tête du côté opposé et ,tout en gardant l''inclinaison, pencher la tête en avant.', 'https://i.ibb.co/BKN2SBB/1.webp', '', 1),
    (2, 'SCOM (Sterno-Cléïdo-Occipito-Mastoïdien)', 'Pour étirer le SCOM droit (par exemple) : Poser les doigts de la main gauche sur la clavicule droite (partie centrale). Basculer la tête en arrière (extension) et tourner la tête à droite.', 'https://i.ibb.co/CM7vWQ3/2.webp', '', 1),
    (3, 'Biceps', 'Tendre le bras devant soi et tendre la main vers le bas. Avec l''autre main, maintenir les doigts de la main dont le bras est tendu vers le bas.', 'https://i.ibb.co/gZwCLZT/3.webp', '', 2),
    (4, 'Triceps', 'Lever le bras au dessus de la tête, plier le coude et atteindre, avec la main, l''épaule opposé en ayant le bras derrière la tête. Poser les doigts de l''autre main sur le coude du bras en l''air et tirer vers le haut.', 'https://i.ibb.co/XZ9BSCv/4.webp' ,'' , 2),
    (5, 'Deltoïde','Tendre un bras vers l''avant et ramenez le vers l''intérieur. Attraper le coude avec l''autre main et maintenir une pression qui tire le bras.', ' https://i.ibb.co/k1Yhh2W/5.webp','',2),
    (6, 'Épicondyliens','Tendre le bras devant soi et avec l''autre main maintenir la main tendue vers le bas','https://i.ibb.co/3hpG29D/6.webp','', 3),
    (7, 'Épitrochléens','Tendre le bras devant soi et avec l''autre main maintenir la main tendue vers le haut.','https://i.ibb.co/cbZKVzg/7.webp','', 3),
    (8, 'Pectoraux', 'Étendre son bras vers l''arrière (mieux si on peut prendre un appui avec la main).', 'https://i.ibb.co/3WydZ8r/8.webp','', 4),
    (9, 'Abdos','S''allonger sur le ventre et se redresser sur les mains en étirant le tronc vers le haut.','https://i.ibb.co/qy6sQfd/9.webp','', 5),
    (10, 'Obliques','Debout, lever le bras vers le ciel et pencher le tronc du côté opposé.','https://i.ibb.co/3zhRRGt/10.webp','', 5),
    (11, 'Grand dorsal','Se mettre dans la posture de l''enfant (au sol, recroquevillé, les genoux et cuisses en dessous du tronc).Tendre les bras au dessus de la tête, le plus loin possible.','https://i.ibb.co/3186M99/11.webp','', 6),
    (12, 'Psoas','Faire une fente avec la jambe arrière assez loin en gardant le dos droit. Mettre une main derrière la hanche de la jambe arrière et mettre une pression pour engager cette hanche vers l''avant.','https://i.ibb.co/wpbbH7q/12.webp','', 7),
    (13, 'Fessiers','Assis au sol, croiser les jambes avec une tendus et l''autre pliée avec le pied à côté du genou de la jambe tendue. Tourner le tronc du côté de la jambe pliée et poser le coude opposé sur le genou de la jambe pliée.','https://i.ibb.co/dcJSX9N/13.webp','', 8),
    (14, 'Piriforme (pyramidal)','Allongé sur le dos, croiser une jambe sur l''autre : une cheville posée sur le genou de l''autre. Attraper la jambe d''appui en dessous et derrière le genou afin de la faire basculer au dessus du tronc.','https://i.ibb.co/7yHFd7f/14.webp','', 8),
    (15, 'Adducteur','Assis au sol, écarter les jambes en papillon. Poser les coudes sur les genoux et abaisser le tronc.','https://i.ibb.co/rM9HnyL/15.webp','', 9),
    (16, 'Quadriceps','Plier le genou et agripper la cheville avec la main du même côté, puis tirer doucement en direction du fessier. Le genou doit pointer vers le sol.','https://i.ibb.co/02GH3V9/16.webp','', 9),
    (17, 'Ischio-jambier','Assis sur le sol, tendre une jambe et plier l''autre. Essayer d''attraper le pied de la jambe tendue avec la main.','https://i.ibb.co/N9YRhMN/17.webp','', 9),
    (18, 'Triceps sural (mollet)','Debout, tendre une jambe et se pencher en avant pour attraper avec la main le pied de la jambe tendue.','https://i.ibb.co/zZ4s1G6/18.webp','',10),
    (19, 'Inversion','Faire une pointe avec le pied avec les orteils vers l''intérieur','https://i.ibb.co/VTyJHV6/19.webp','', 11 ),
    (20, 'Eversion ','Basculer le pied côté externe en faisant une flexion dorsale (orienté le pied vers l''extérieur et le haut).','https://i.ibb.co/2W8yYvL/20.webp','', 11);

/* Donc vide la table category */
TRUNCATE TABLE "category" CASCADE;

/* Insertion/seeding des données dans la table category */
INSERT INTO "category" ("id", "name") VALUES
    (1, 'Cou'),
    (2, 'Bras'),
    (3, 'Avant-bras'),
    (4, 'Poitrine'),
    (5, 'Ventre'),
    (6, 'Dos'),
    (7, 'Hanche'),
    (8, 'Fessier'),
    (9, 'Cuisse'),
    (10, 'Jambe'),
    (11, 'Pied');

/* Donc vide la table role */
TRUNCATE TABLE "role" CASCADE;

/* Insertion/seeding des données dans la table role */
INSERT INTO "role" ("id", "name") VALUES
(1, 'admin'),
(2, 'user');

/* Donc vide la table role */
TRUNCATE TABLE "user_stretch" CASCADE;

/* Insertion/seeding des données dans la table user_stretch */
INSERT INTO "user_stretch" ("id", "user_id", "stretch_id") VALUES
(1, 0, 1),
(2, 0, 2);


/* Ajoute une contrainte de clé étrangère à la table "user" qui référence la colonne "id" de la table "role". 
Cela signifie que la valeur de la colonne "role_id" de la table "user" doit correspondre à une valeur existante dans la colonne "id" de la table "role".*/
ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role"("id");

/* Ajoute une contrainte de clé étrangère à la table "stretch" qui référence la colonne "id" de la table "category". 
Cela signifie que la valeur de la colonne "category_id" de la table "stretch" doit correspondre à une valeur existante dans la colonne "id" de la table "category".*/
ALTER TABLE "stretch" ADD FOREIGN KEY ("category_id") REFERENCES "category"("id");

-- Note : Postgres, avec le fait d'ajouter IDENTITY BY DEFAULT au lieu de ALWAYS, ne met pas à jour le curseur de l'incrément de la séquence de façon implicite !
-- Il faut donc mettre à jour la valeur courante de chacune des séquences en séléctionnant l'id maximum de chaque table une fois le seeding terminé.
SELECT setval('stretch_id_seq', (SELECT MAX(id) from "stretch"));
SELECT setval('user_stretch_id_seq', (SELECT MAX(id) from "user_stretch"));

/*Fin du script */
COMMIT;

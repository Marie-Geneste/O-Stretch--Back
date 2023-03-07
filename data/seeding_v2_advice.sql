BEGIN;


CREATE TABLE "advice" (
        "id" SERIAL PRIMARY KEY,
        "description_content" TEXT NOT NULL
    );

INSERT INTO "advice" ("id", "description_content") VALUES
(1,'Avant de faire du sport, pas d’étirements mais un échauffement actif.'),
(2,'Ne vous forcez jamais et ne vous poussez jamais au-delà de vos limites.'),
(3,'Étirez uniformément les deux côtés de votre corps.'),
(4,'Concentrez-vous sur une respiration profonde et lente.'),
(5,'Maintenez chaque étirement pendant 10 à 30 secondes.'),
(6,'Répétez chaque étirement 2 à 3 fois.'),
(7,'Évitez de rebondir pendant les étirements.'),
(8,'Faites attention à votre corps et écoutez tout inconfort ou douleur.'),
(9,'Incorporez une variété d''étirements, y compris des étirements dynamiques et statiques.'),
(10,'Étirez-vous régulièrement, par exemple après une séance d''entraînement (1h après) ou avant d''aller au lit.'),
(11,'Envisager d''incorporer un roulement ou un massage dans votre routine d''étirement.'),
(12,'Étirez-vous environ 1h après toute activité physique.'),
(13,'Envisagez de travailler avec un physiothérapeute ou un entraîneur pour apprendre la bonne technique d''étirement.'),
(14,'Utilisez des accessoires tels qu''une sangle, une serviette ou un rouleau en mousse pour plus de soutien et de confort.'),
(15,'Étirez les muscles que vous utilisez le plus, surtout si vous avez un travail sédentaire.'),
(16,'Un muscle doit se travailler à chaud (mais pas trop quand même : environ une heure après un effort intense).'),
(17,'L''étirement doit se faire de manière progressive et sans à-coups.'),
(18,'Il ne faut pas étirer un muscle blessé (déchirure, élongation…).'),
(19,'Ne vous étirez pas juste après un effort intense (laissez environ 1h entre temps).'),
(20,'L''étirement ne doit pas être douloureux, il faut sentir une légère mise en tension musculaire.'),
(21,'Etirez-vous de manière bilatérale (droite et gauche).'),
(22,'Lors de l’étirement vous pouvez vous aider de votre respiration, maintenant le segment du membre sur l''inspiration et progressez sur l''expiration.');

COMMIT;

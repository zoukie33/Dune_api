SELECT *
FROM d_files as f, d_filesAppsUser as fu
WHERE f.idFile = fu.idFile AND fu.idUser

INSERT INTO d_files(nom, path, type, description, private) VALUES ('"+ nom +"', '"+ path +"', '"+ type +"', '"+ description +"', '"+ private +"')

INSERT INTO d_filesAppsUser (idFile, idUser, idEcole) VALUES ('"+ results.insert_id +"', '"+ idUser +"', '"+ idEcole +"')

INSERT INTO d_games (name, creator, path) VALUES ('"+ name +"', '"+ creator +"', 'NULL')


SELECT c.idClasse, c.level, c.num, c.annee, COUNT(ce.idEleve) AS effectif, DISTINCT COUNT(gp.idGP) AS nbGamesFinished
FROM d_profsAppEcole AS ape, d_classeEcole AS cee, d_classe AS c, d_classeEleve AS ce, d_gamesPlayed AS gp
WHERE ape.idEcole = cee.idEcole AND cee.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND c.idClasse = gp.idClasse AND gp.isPlayed = 1 AND ape.idProf = 33
GROUP BY c.idClasse ORDER BY c.level, c.num ASC

SELECT c.idClasse, c.level, c.num, c.annee, COUNT(ce.idEleve) AS effectif, COUNT(gp.idGP) AS nbGamesFinished
FROM d_profsAppClasse AS apc, d_classe AS c, d_classeEleve AS ce, d_gamesPlayed AS gp
WHERE apc.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idClasse = gp.idClasse AND gp.isPlayed = 1 AND apc.idProf = 33
GROUP BY c.idClasse
ORDER BY c.level, c.num ASC

SELECT gp.idGame, g.name, tg.labelType, gs.score, gp.TimeStamp, (SELECT AVG(gs.score) FROM d_gamesPlayed AS gp, d_gamesScored AS gs WHERE gp.idGP = gs.idGP ) AS moyenne FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_games AS g, d_typeGames AS tg WHERE gs.idGP = gp.idGP AND gp.idGame = g.id AND gp.idTypeGame = tg.idType AND gs.idEleve = 4

(SELECT MOY(gs.score)
FROM d_gamesPlayed AS gp, d_gamesScored AS gs
WHERE gp.idGP = gs.idGP ) AS moyenne


INSERT INTO d_gamesPlayed (idGame, idTypeGame, idProf, idClasse) VALUES ('"+ name +"', '"+ creator +"', 'NULL')
INSERT INTO d_gamesScored (idGP, idEleve) VALUES ('"+ name +"', '"+ creator +"')

SELECT gp.idTypeGame, tg.labelType FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_typeGames AS tg WHERE gp.idGP = gs.idGP AND gp.idTypeGame = tg.idType AND gs.idEleve = 1 GROUP BY gp.idTypeGame

SELECT gp.idGP, g.name AS nameGame, tg.labelType AS matiere, gs.score AS note, gp.TimeStamp AS date, (SELECT AVG(gs2.score) FROM d_gamesPlayed AS gp2, d_gamesScored AS gs2 WHERE gp2.idGP = gs2.idGP AND gp2.idGP = gp.idGP) AS moyenne FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_games AS g, d_typeGames AS tg WHERE gs.idGP = gp.idGP AND gp.idGame = g.id AND gp.idTypeGame = tg.idType AND gs.idEleve = 1

 + ' AND gp.idTypeGame = ' + idMat


SELECT u.idUser AS idProf, u.nomUser AS nom, u.prenomUser AS prenom, u.emailUser AS email, u.picPath FROM d_profsAppEcole AS pae, d_users AS u WHERE u.idUser = pae.idProf AND pae.idEcole =

INSERT INTO d_tableGames(idTable, idGame) VALUES (" + idTable + ", " + idJeu + ")

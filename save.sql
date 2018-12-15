SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level
FROM d_eleves AS e
INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve
INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse
INNER JOIN d_profsAppClasse AS pa ON c.idClasse = pa.idClasse
WHERE pa.idProf = ' + idUser + '
  AND c.idClasse = ' + idClasse + '
  AND (e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%")
ORDER BY e.nomEleve ASC;

SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level
FROM d_eleves AS e
INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve
INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse
INNER JOIN d_classeEcole AS cec ON cec.idClasse = c.idClasse
INNER JOIN d_profsAppEcole AS pa ON cec.idEcole = pa.idEcole
WHERE  pa.idProf = ' + idUser + '
  AND c.idClasse = ' + idClasse + '
  AND (e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%")
ORDER BY e.nomEleve ASC;
////////////
SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level
FROM d_eleves AS e
INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve
INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse
INNER JOIN d_profsAppClasse AS pa ON c.idClasse = pa.idClasse
WHERE pa.idProf = ' + idUser + '
  AND c.idClasse = ' + idClasse + '
  AND (e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%")
ORDER BY e.nomEleve ASC;

SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level
FROM d_eleves AS e
INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve
INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse
INNER JOIN d_classeEcole AS cec ON cec.idClasse = c.idClasse
INNER JOIN d_profsAppEcole AS pa ON cec.idEcole = pa.idEcole
WHERE  pa.idProf = ' + idUser + '
  AND c.idClasse = ' + idClasse + '
  AND (e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%")
ORDER BY e.nomEleve ASC;
////////////
SELECT e.*, c.num, c.level
FROM d_classe AS c, d_users AS u, d_profsAppClasse AS ac, d_classeEleve as ce, d_eleves as e
WHERE u.idUser = ac.idProf
  AND ac.idClasse = c.idClasse
  AND c.idClasse = ce.idClasse
  AND ce.idEleve = e.idEleve
  AND u.idUser = ' + idUser + '
  AND c.idClasse = ' + idClasse + '
  AND (e.nomEleve LIKE "' + search + '%" OR e.prenomEleve LIKE "' + search + '%")
ORDER BY e.nomEleve ASC

SELECT e.*, ce.idClasse, c.num, c.level
FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_profsAppClasse AS ac, d_users AS u
WHERE u.idUser = ac.idProf
  AND ac.idClasse = c.idClasse
  AND c.idClasse = ce.idClasse
  AND ce.idEleve = e.idEleve
  AND u.idUser = ' + idUser + '
  AND e.nomEleve LIKE "' + search + '%" OR e.prenomEleve LIKE "' + search + '%"
ORDER BY e.nomEleve ASC

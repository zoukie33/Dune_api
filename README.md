# Dune Api

L'API Dune permet la communication entre les différentes plateformes disponibles de dune tel que l'application mobile, l'application web ou encore la table Dune.

## Accès
L'API Dune est disponible en [https](https://api.dune-table.com/), en [http](http://api.dune-table.com/) Ainsi qu'en version [développement ](http://api.dune-table.com:81/).

Pour avoir accès à la documentation il vous suffit simplement d'accéder à un des liens ci dessus.

### Logs

Les logs sont accessibles en [Production](https://api.dune-table.com:9001/), en [Dev1](https://api.dune-table.com:9091/) et en [Dev2](https://api.dune-table.com:9092/).
## Installation

Vous devrez installer les composantes suivantes:

```bash
- NodeJS
- Mysql
```

## Setup

Vous devrez créer un fichier .env à la racine du dossier contenant les variables suivantes :
```
NODE_ENV=developement
API_PORT=80
API_PORTSSL=443

###### MYSQL ######

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=****
MYSQL_DATABASE=dune_api
MYSQL_QUEUE_LIMIT=0
MYSQL_CO_LIMIT=0

###### JWT ######

SECRET=****

###### MAILER ######

SENDER_MAIL=dune.*****
MAIL_PASSWORD=*****

###### CONFIG ######

DEBUG_LOGGING=true

# EXT #

NODE_TLS_REJECT_UNAUTHORIZED=0
```
Pour pouvoir Utiliser le https de l'api, vous devrez remplacer les certificats présents dans le dossier `/bin`


## Starting the API

Vous pourrez lancez l'Api via un simple `npm start`, mais le meileur a faire est certainement d'installer Forever;
```bash
npm install forever
```
puis d’exécuter la commande suivante : 
```bash
forever start www /home/Dune_Api/bin/
```

### License
[MIT](https://choosealicense.com/licenses/mit/)
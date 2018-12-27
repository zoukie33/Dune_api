define({ "api": [
  {
    "type": "post",
    "url": "/login/",
    "title": "Login an User",
    "name": "Login",
    "group": "Auth",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/auth/login.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/login/reset",
    "title": "Forget password",
    "name": "Reset",
    "group": "Auth",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/auth/login.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/tokens/verifyToken",
    "title": "Verifying a jwt token",
    "name": "verifyToken",
    "group": "Auth",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/auth/tokens.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/eleves/add",
    "title": "Create new student",
    "name": "add",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "directorId",
            "description": "<p>L'id du mec</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "prenom",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "post",
    "url": "/eleves/byClasse",
    "title": "Get students by idClasse",
    "name": "byClasse",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idClasse",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "post",
    "url": "/eleves/byProf",
    "title": "Get students by idProf",
    "name": "byProf",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idProf",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "post",
    "url": "/eleves/picEleve",
    "title": "Uploading studient picture",
    "name": "picEleve",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEleve",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picEleve",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "post",
    "url": "/eleves/update",
    "title": "Updating a student",
    "name": "update",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEleve",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomEleve",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomEleve",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "post",
    "url": "/games/add",
    "title": "Creating a game",
    "name": "addGame",
    "group": "Games",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "get",
    "url": "/games/",
    "title": "Getting all the games",
    "name": "games",
    "group": "Games",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"id\": 1,\n            \"idType\": 1,\n            \"name\": \"testApp\",\n            \"creator\": 1,\n            \"path\": \"NULL\",\n            \"picPath\": \"1-app.png\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "get",
    "url": "/games/:id",
    "title": "Getting a game",
    "name": "gamesById",
    "group": "Games",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"id\": 1,\n            \"idType\": 1,\n            \"name\": \"testApp\",\n            \"creator\": 1,\n            \"path\": \"NULL\",\n            \"picPath\": \"1-app.png\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "post",
    "url": "/games/picGame",
    "title": "Uploading a picture for the game",
    "name": "picGame",
    "group": "Games",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idGame",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picGame",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "post",
    "url": "/games/update",
    "title": "Updating a game",
    "name": "updateGame",
    "group": "Games",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "post",
    "url": "/notifs/",
    "title": "Get all notifications",
    "name": "Notifs",
    "group": "Notifs",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/notifis.js",
    "groupTitle": "Notifs"
  },
  {
    "type": "post",
    "url": "/notifs/validating",
    "title": "Validating an appAsk",
    "name": "Validating",
    "group": "Notifs",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idDemande",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/notifis.js",
    "groupTitle": "Notifs"
  },
  {
    "type": "post",
    "url": "/notifs/getNotifsNb",
    "title": "Getting the number of the notifications",
    "name": "getNotifsNb",
    "group": "Notifs",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/notifis.js",
    "groupTitle": "Notifs"
  },
  {
    "type": "post",
    "url": "/store/",
    "title": "Getting all items in store",
    "name": "Store",
    "group": "Store",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idType",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/buyApp",
    "title": "Asking for buying an app by a prof",
    "name": "buyApp",
    "group": "Store",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idApp",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idProf",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentaire",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/buyAppDirecteur",
    "title": "Buying directly an App",
    "name": "buyAppDirecteur",
    "group": "Store",
    "permission": [
      {
        "name": "Logged + Director"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idApp",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/getApp",
    "title": "Getting an app by id",
    "name": "getApp",
    "group": "Store",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idApp",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/getAppsEcole",
    "title": "Getting apps already buyed by a school",
    "name": "getAppsEcole",
    "group": "Store",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
    "url": "/store/typesGames",
    "title": "Getting all games types",
    "name": "typesGames",
    "group": "Store",
    "permission": [
      {
        "name": "Logged + Director"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/cnxTable/delToken",
    "title": "Deleting a token Table",
    "name": "delToken",
    "group": "Table",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tokenTable",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/table/cnxTable.js",
    "groupTitle": "Table"
  },
  {
    "type": "post",
    "url": "/cnxTable/genToken",
    "title": "Generating a token Table",
    "name": "genToken",
    "group": "Table",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idTable",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/table/cnxTable.js",
    "groupTitle": "Table"
  },
  {
    "type": "post",
    "url": "/cnxTable/install",
    "title": "Installing a new Table",
    "name": "install",
    "group": "Table",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "licence",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/table/cnxTable.js",
    "groupTitle": "Table"
  },
  {
    "type": "post",
    "url": "/cnxTable/useToken",
    "title": "Joining a Table with user (qrCode)",
    "name": "useToken",
    "group": "Table",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tokenTable",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idProf",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/table/cnxTable.js",
    "groupTitle": "Table"
  },
  {
    "type": "post",
    "url": "/cnxTable/verifToken",
    "title": "Virifying a token Table",
    "name": "verifToken",
    "group": "Table",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tokenTable",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/table/cnxTable.js",
    "groupTitle": "Table"
  },
  {
    "type": "post",
    "url": "/trombi/byClasse",
    "title": "Get all trombi students for one class",
    "name": "byClasse",
    "group": "Trombi",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typeUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idClasse",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/trombi.js",
    "groupTitle": "Trombi"
  },
  {
    "type": "post",
    "url": "/trombi/classes",
    "title": "Get all classes the user can view",
    "name": "classes",
    "group": "Trombi",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typeUser",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/trombi.js",
    "groupTitle": "Trombi"
  },
  {
    "type": "post",
    "url": "/trombi/",
    "title": "Get all students trombi",
    "name": "getAllStudents",
    "group": "Trombi",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typeUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/trombi.js",
    "groupTitle": "Trombi"
  },
  {
    "type": "post",
    "url": "/users/add",
    "title": "Create new User",
    "name": "AddUser",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request User information",
    "name": "GetUser",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailUser",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picPath",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "access_token",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"idUser\": 0,\n            \"nomUser\": \"blank\",\n            \"prenomUser\": \"blank\",\n            \"emailUser\": \"blank@blank.com\",\n            \"pass\": \"04b2c7d23cdd19843241b20b331992a7\",\n            \"typeUser\": 3,\n            \"picPath\": null,\n            \"access_token\": \"n/a\",\n            \"device_type\": \"web\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Request All Users",
    "name": "GetUsers",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailUser",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picPath",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "access_token",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idUser\": 0,\n           \"nomUser\": \"blank\",\n           \"prenomUser\": \"blank\",\n           \"emailUser\": \"blank@blank.com\",\n           \"pass\": \"04b2c7d23cdd19843241b20b331992a7\",\n           \"typeUser\": 3,\n           \"picPath\": null,\n           \"access_token\": \"TokenAuth\",\n           \"device_type\": \"web\"\n       }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/changeEmail",
    "title": "Changing an Users Email",
    "name": "changeEmail",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newEmail",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/changePassword",
    "title": "Changing an Users password",
    "name": "changePassword",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/picProf",
    "title": "Uploading an Users picture",
    "name": "picProf",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picProf",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/update",
    "title": "Update an User",
    "name": "updateUser",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });

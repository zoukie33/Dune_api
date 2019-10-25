define({ "api": [
  {
    "type": "get",
    "url": "/abonnement/endSub",
    "title": "Deleting a Subscription",
    "name": "endSub",
    "group": "Abonnement",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant d'annuler l'abonnement d'une école.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>auth</p>"
          }
        ]
      }
    },
    "filename": "routes/abonnement.js",
    "groupTitle": "Abonnement"
  },
  {
    "type": "get",
    "url": "/abonnement/getSub",
    "title": "Getting a Subscription information",
    "name": "getSub",
    "group": "Abonnement",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant de récupérer les informations d'un abonnement.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>auth</p>"
          }
        ]
      }
    },
    "filename": "routes/abonnement.js",
    "groupTitle": "Abonnement"
  },
  {
    "type": "get",
    "url": "/abonnement/isValid",
    "title": "Verifying a sub",
    "name": "isValid",
    "group": "Abonnement",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant de vérifier si un abonnement est encore valide.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>auth</p>"
          }
        ]
      }
    },
    "filename": "routes/abonnement.js",
    "groupTitle": "Abonnement"
  },
  {
    "type": "post",
    "url": "/abonnement/subscribe",
    "title": "Subscribing to an abonnement",
    "name": "subscribe",
    "group": "Abonnement",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant de souscrire à un abonnement.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "typeAbo",
            "description": "<p>Type d'abonnement (1 ou 2)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>auth</p>"
          }
        ]
      }
    },
    "filename": "routes/abonnement.js",
    "groupTitle": "Abonnement"
  },
  {
    "type": "post",
    "url": "/admin/create/addStudent/",
    "title": "Creating one student",
    "name": "addStudent",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomEleve",
            "description": "<p>Nom de l'élève</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomEleve",
            "description": "<p>Prénom de l'élève</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Cette route necessite que trous les champs soient remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": {\n          \"fieldCount\": 0,\n          \"affectedRows\": 1,\n          \"insertId\": 11,\n          \"serverStatus\": 2,\n          \"warningCount\": 0,\n          \"message\": \"\",\n          \"protocol41\": true,\n          \"changedRows\": 0\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/createClass/",
    "title": "Create a class",
    "name": "createClass",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "level",
            "description": "<p>Niveau de la classe</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "num",
            "description": "<p>Numero de la classe</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "annee",
            "description": "<p>Année de la classe (2019/2020)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Cette route necessite que trous les champs soient remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": {\n          \"fieldCount\": 0,\n          \"affectedRows\": 1,\n          \"insertId\": 11,\n          \"serverStatus\": 2,\n          \"warningCount\": 0,\n          \"message\": \"\",\n          \"protocol41\": true,\n          \"changedRows\": 0\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/addAllStudents/",
    "title": "Pushing all studients in one time",
    "name": "createClass",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "level",
            "description": "<p>Niveau de la classe</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "num",
            "description": "<p>Numero de la classe</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "annee",
            "description": "<p>Année de la classe (2019/2020)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"idEcole\": 1,\n  \"Eleves\": [\n    {\n      \"nomEleve\":\"Fodid\",\n      \"prenomEleve\":\"Patrick\"\n    },\n    {\n      \"nomEleve\":\"Pastis\",\n      \"prenomEleve\":\"Landais\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Cette route necessite que trous les champs soient remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": {\n          \"fieldCount\": 0,\n          \"affectedRows\": 1,\n          \"insertId\": 11,\n          \"serverStatus\": 2,\n          \"warningCount\": 0,\n          \"message\": \"\",\n          \"protocol41\": true,\n          \"changedRows\": 0\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/createDirecteur",
    "title": "Creating a Director",
    "name": "createDirecteur",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nom du directeur a ajouter.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Prenom du directeur a ajouter.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email du directeur a ajouter.</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'ecole du directeur a ajouter.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"un des champs est manquant\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"Game Added\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/createGame",
    "title": "Creating a game",
    "name": "createGame",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nom de l'application/jeu.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idCreator",
            "description": "<p>Id du créateur</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idType",
            "description": "<p>Id du type de jeu</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description de l'application</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "nbJoueurs",
            "description": "<p>Nombre de joueurs possibles (2-4 ou encore 4-6).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currVersion",
            "description": "<p>Version actuelle de l'app/jeu (1.0)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "niveau",
            "description": "<p>Niveau de difficulté de l'app/jeu (1 ou 2)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "prix",
            "description": "<p>Prix de l'app/jeu (0 = free)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"un des champs est manquant\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"Game Added\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/createProf/",
    "title": "Creating a professor",
    "name": "createProf",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nome de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Prénom de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'école.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Cette route necessite que trous les champs soient remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": {\n          \"fieldCount\": 0,\n          \"affectedRows\": 1,\n          \"insertId\": 11,\n          \"serverStatus\": 2,\n          \"warningCount\": 0,\n          \"message\": \"\",\n          \"protocol41\": true,\n          \"changedRows\": 0\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/createSchool/",
    "title": "Create a school",
    "name": "createSchool",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomEcole",
            "description": "<p>Nom de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rueEcole",
            "description": "<p>Nom de rue de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "numRueEcole",
            "description": "<p>Numéro batiment de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "villeEcole",
            "description": "<p>Ville de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departementEcole",
            "description": "<p>Département de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "telEcole",
            "description": "<p>Numero de téléphone de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailEcole",
            "description": "<p>Email de l'école</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Cette route necessite que trous les champs soient remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": {\n          \"fieldCount\": 0,\n          \"affectedRows\": 1,\n          \"insertId\": 11,\n          \"serverStatus\": 2,\n          \"warningCount\": 0,\n          \"message\": \"\",\n          \"protocol41\": true,\n          \"changedRows\": 0\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "post",
    "url": "/admin/create/genLicence",
    "title": "Generating licences",
    "name": "genLicence",
    "group": "AdminCreate",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": [\n        \"Q6M8-P6V5-E9GN-VWER\",\n        \"4LV9-Q3DL-GMAH-UAKT\",\n        \"XC62-P44M-RGFE-TAZA\",\n        \"9MSX-A787-J4R4-ZQ4K\",\n        \"AQ7X-N9T2-XEEH-DX2X\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "nbLicences",
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
    "filename": "routes/adminPanel/create.js",
    "groupTitle": "AdminCreate"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getAllSchools",
    "title": "Getting Schools",
    "name": "getAllSchools",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": [\n        {\n           \"id\": 1,\n           \"idDirecteur\": 1,\n           \"nomEcole\": \"Sainte-Marie: Grand Lebrun\",\n           \"rue\": \"Rue de l'école normale\",\n           \"numRue\": \"4\",\n           \"ville\": \"Bordeaux\",\n           \"departement\": \"Aquitaine\",\n           \"tel\": \"0603**4206\",\n           \"id_customer\": \"cus_FpPdZuUxTL0Z5n\",\n           \"email\": \"elodie.berthaud@epitech.eu\",\n           \"nomUser\": \"Berthaud\",\n           \"prenomUser\": \"Elodie\"\n       },\n       {\n           \"id\": 2,\n           \"idDirecteur\": 33,\n           \"nomEcole\": \"Epitech\",\n           \"rue\": \"Rue de l'école normale\",\n           \"numRue\": \"4\",\n           \"ville\": \"Bordeaux\",\n           \"departement\": \"Aquitaine\",\n           \"tel\": \"0603**4206\",\n           \"id_customer\": \"cus_FpPdZuUxTL0Z5n\",\n           \"email\": \"elodie.berthaud@epitech.eu\",\n           \"nomUser\": \"Berthaud\",\n           \"prenomUser\": \"Elodie\"\n       }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getClassesBySchool/:idEcole",
    "title": "Getting classes by school",
    "name": "getClassesBySchool",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idClasse\": 1,\n           \"level\": 4,\n           \"num\": 1,\n           \"annee\": \"2017/2018\"\n       },\n       {\n           \"idClasse\": 2,\n           \"level\": 8,\n           \"num\": 1,\n           \"annee\": \"2017/2018\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
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
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getCreators",
    "title": "Getting creators",
    "name": "getCreators",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": [\n  {\n      \"idCreator\": 1,\n      \"nom\": VictorH,\n  },\n  {\n      \"idCreator\": 2,\n      \"nom\": MvCaster,\n  }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getLicencesBySchool/:idEcole",
    "title": "Getting licences by school",
    "name": "getLicencesBySchool",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": [\n  {\n      \"id\": 15,\n      \"idEcole\": 1,\n      \"licence\": \"Q6M8-P6V5-E9GN-VWER\",\n      \"used\": 0,\n      \"dateExpire\": \"2020-04-21T14:47:09.000Z\"\n  },\n  {\n      \"id\": 16,\n      \"idEcole\": 1,\n      \"licence\": \"4LV9-Q3DL-GMAH-UAKT\",\n      \"used\": 0,\n      \"dateExpire\": \"2020-04-21T14:47:09.000Z\"\n  }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
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
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getNbSchools",
    "title": "Getting number of Schools",
    "name": "getNbSchools",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n    \"nbSchool\": 2\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getProfsBySchool/:idEcole",
    "title": "Getting profs by school",
    "name": "getProfsBySchool",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": [\n        {\n           \"idProf\": 1,\n           \"nom\": \"Berthaud\",\n           \"prenom\": \"Elodie\",\n           \"email\": \"elodie.berthaud1@gmail.com\",\n           \"picPath\": \"1-prof.png\"\n       },\n       {\n           \"idProf\": 2,\n           \"nom\": \"gadrat\",\n           \"prenom\": \"Romain\",\n           \"email\": \"romain.gasdrat@epitech.eu\",\n           \"picPath\": \"2-prof.png\"\n       }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
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
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getStudentsByClasse/:idEcole",
    "title": "Getting students by classe",
    "name": "getStudentsByClasse",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"status\": 200,\n \"error\": null,\n \"response\": [\n     {\n         \"idEleve\": 1,\n         \"nomEleve\": \"Merveillau\",\n         \"prenomEleve\": \"Denis\",\n         \"picPath\": \"1-eleve.png\"\n     },\n     {\n         \"idEleve\": 2,\n         \"nomEleve\": \"Senouci\",\n         \"prenomEleve\": \"Elies\",\n         \"picPath\": \"2-eleve.png\"\n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
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
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getStudentsBySchool/:idSchool",
    "title": "Getting students by School",
    "name": "getStudentsBySchool",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"status\": 200,\n \"error\": null,\n \"response\": [\n     {\n         \"idEleve\": 1,\n         \"nomEleve\": \"Merveillau\",\n         \"prenomEleve\": \"Denis\",\n         \"picPath\": \"1-eleve.png\"\n     },\n     {\n         \"idEleve\": 2,\n         \"nomEleve\": \"Senouci\",\n         \"prenomEleve\": \"Elies\",\n         \"picPath\": \"2-eleve.png\"\n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idSchool",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "get",
    "url": "/admin/dashboard/getTableBySchool/:idEcole",
    "title": "Getting Tables by school",
    "name": "getTableBySchool",
    "group": "AdminDashboard",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n      \"response\": [\n        {\n           \"idProf\": 1,\n           \"nom\": \"Berthaud\",\n           \"prenom\": \"Elodie\",\n           \"email\": \"elodie.berthaud1@gmail.com\",\n           \"picPath\": \"1-prof.png\"\n       },\n       {\n           \"idProf\": 2,\n           \"nom\": \"gadrat\",\n           \"prenom\": \"Romain\",\n           \"email\": \"romain.gasdrat@epitech.eu\",\n           \"picPath\": \"2-prof.png\"\n       }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
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
    "filename": "routes/adminPanel/dashboard.js",
    "groupTitle": "AdminDashboard"
  },
  {
    "type": "delete",
    "url": "/admin/delete/deleteEcole/:idEcole",
    "title": "Delete a school",
    "name": "deleteEcole",
    "group": "AdminDelete",
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
            "description": "<p>Id Ecole</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de supprimer une Ecole</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"\",\n       \"protocol41\": true,\n       \"changedRows\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/delete.js",
    "groupTitle": "AdminDelete"
  },
  {
    "type": "delete",
    "url": "/admin/delete/deleteGame/:idGame",
    "title": "Delete a game",
    "name": "deleteGame",
    "group": "AdminDelete",
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
            "description": "<p>Id Game</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de supprimer une licence.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"\",\n       \"protocol41\": true,\n       \"changedRows\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/delete.js",
    "groupTitle": "AdminDelete"
  },
  {
    "type": "delete",
    "url": "/admin/delete/deleteLicence/:idLicence",
    "title": "Delete a licence",
    "name": "deleteLicence",
    "group": "AdminDelete",
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
            "field": "idLicence",
            "description": "<p>Id licence</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de supprimer une licence.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"\",\n       \"protocol41\": true,\n       \"changedRows\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/delete.js",
    "groupTitle": "AdminDelete"
  },
  {
    "type": "delete",
    "url": "/admin/delete/deleteProf/:idProf",
    "title": "Delete a Professor",
    "name": "deleteProf",
    "group": "AdminDelete",
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
            "description": "<p>Id Prof</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de supprimer un professeur</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"\",\n       \"protocol41\": true,\n       \"changedRows\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/delete.js",
    "groupTitle": "AdminDelete"
  },
  {
    "type": "post",
    "url": "/admin/login/",
    "title": "Login an User",
    "name": "Login",
    "group": "AdminLogin",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "502",
            "description": "<p>Aucun utilisateur ne correspond à ces identifiants.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe de l'utilisateur</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant à un utilisateur de se connecter.</p>",
    "filename": "routes/adminPanel/login.js",
    "groupTitle": "AdminLogin"
  },
  {
    "type": "get",
    "url": "/admin/statistiques/nbFilesAddedWeb",
    "title": "Get nb of files added on web in total",
    "name": "nbFilesAddedWeb",
    "group": "AdminStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n\t\t\t\t {\n            \"nbFilesAddedWeb\": 3\n       \t}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/statistiques.js",
    "groupTitle": "AdminStats"
  },
  {
    "type": "get",
    "url": "/admin/statistiques/nbGamesPlayed",
    "title": "Get nb of games played in total",
    "name": "nbGamesPlayed",
    "group": "AdminStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n\t\t\t\t {\n            \"nbGamesPlayed\": 3\n       \t}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/statistiques.js",
    "groupTitle": "AdminStats"
  },
  {
    "type": "get",
    "url": "/admin/statistiques/nbQrScanned",
    "title": "Get nb of QrCodes scanned in total",
    "name": "nbQrScanned",
    "group": "AdminStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n\t\t\t\t {\n            \"nbQrScanned\": 3\n       \t}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/statistiques.js",
    "groupTitle": "AdminStats"
  },
  {
    "type": "put",
    "url": "/admin/update/ecole",
    "title": "Uploading a School",
    "name": "ecole",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomEcole",
            "description": "<p>Nom de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rueEcole",
            "description": "<p>Nom de rue de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "numRueEcole",
            "description": "<p>Numéro batiment de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "villeEcole",
            "description": "<p>Ville de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departementEcole",
            "description": "<p>Département de l'école</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "telEcole",
            "description": "<p>Numero de téléphone de l'école</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Impossible de mettre a jour cette ecole, tous les champs doivent être remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"Ecole Updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "put",
    "url": "/admin/update/eleve",
    "title": "Updating a Student",
    "name": "eleve",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEleve",
            "description": "<p>Id de l'élève a mettre a jour.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomEleve",
            "description": "<p>Nom de l'élève.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomEleve",
            "description": "<p>Prénom de l'élève.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la mise à jour d'un élève.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Impossible de mettre a jour cet élève, tous les champs doivent être remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"Eleve Updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "put",
    "url": "/admin/update/passwordUser",
    "title": "Updating a passwordUser",
    "name": "passwordUser",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": "<p>Id de l'utilisateur a update.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la mise à jour le mot de passe d'un utilisateur.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Impossible de mettre a jour cet Utilisateur, tous les champs doivent être remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"Password Updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "put",
    "url": "/admin/update/picGame",
    "title": "Uploading a picture for the game",
    "name": "picGame",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idGame",
            "description": "<p>Id de l'app/jeu.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picGame",
            "description": "<p>Image.</p>"
          }
        ]
      }
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "put",
    "url": "/admin/update/updateGame",
    "title": "Updating a game",
    "name": "updateGame",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id de l'app/jeu.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nom de l'application/jeu.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description de l'application</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "nbJoueurs",
            "description": "<p>Nombre de joueurs possibles (2-4 ou encore 4-6).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currVersion",
            "description": "<p>Version actuelle de l'app/jeu (1.0)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "niveau",
            "description": "<p>Niveau de difficulté de l'app/jeu (1 ou 2)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "prix",
            "description": "<p>Prix de l'app/jeu (0 = free)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "Creator",
            "description": "<p>Id du createur du jeu</p>"
          }
        ]
      }
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "put",
    "url": "/admin/update/updateLicence/",
    "title": "Updating a licence",
    "name": "updateLicence",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "licence",
            "description": "<p>7CCK-METF-SSFW-7RZ8</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "used",
            "description": "<p>0 ou 1</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeStamp",
            "optional": false,
            "field": "dateExpire",
            "description": "<p>2020-04-23 15:16:20</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant d'update une licence.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"\",\n       \"protocol41\": true,\n       \"changedRows\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "put",
    "url": "/admin/update/user",
    "title": "Updating an User",
    "name": "user",
    "group": "AdminUpdate",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": "<p>Id de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Nom de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Prénom de l'utilisateur.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la mise à jour d'un utilisateur.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"Impossible de mettre a jour cet user, tous les champs doivent être remplis.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"User Updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/adminPanel/update.js",
    "groupTitle": "AdminUpdate"
  },
  {
    "type": "post",
    "url": "/login/",
    "title": "Login an User",
    "name": "Login",
    "group": "Auth",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "502",
            "description": "<p>Aucun utilisateur ne correspond à ces identifiants.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe de l'utilisateur</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant à un utilisateur de se connecter.</p>",
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
        "name": "Public"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "502",
            "description": "<p>Aucun utilisateur ne correspond à ces identifiants.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant à un utilisateur de générer un nouveau mot de passe.</p>",
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
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Invalid Access</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token d'authentification</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la vérification d'un JWT Token.</p>",
    "filename": "routes/auth/tokens.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/tokens/verifyTokenAdmin",
    "title": "Verifying an Admin jwt token",
    "name": "verifyTokenAdmin",
    "group": "Auth",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Invalid Access</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>AdminToken auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token d'authentification</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la vérification d'un JWT Token.</p>",
    "filename": "routes/auth/tokens.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/classes/profs",
    "title": "Get Classes for an User",
    "name": "getClasses",
    "group": "ClassesProfs",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"idProf\": 1,\n    \"response\": [\n     {\n         \"idClasse\": 3,\n         \"level\": 5,\n         \"num\": 1,\n         \"annee\": \"2017/2018\",\n         \"effectif\": 3\n     },\n     {\n         \"idClasse\": 5,\n         \"level\": 7,\n         \"num\": 1,\n         \"annee\": \"2017/2018\",\n         \"effectif\": 2\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/classe/classeProfs.js",
    "groupTitle": "ClassesProfs"
  },
  {
    "type": "get",
    "url": "/dashboard/nbAppsStarted",
    "title": "Get the number of appStarted",
    "name": "nbAppsStarted",
    "group": "Dashboard",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant la récupération du nombre d'applications lancées.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Token",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbAppsStarted\": 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "/dashboard/nbClasses",
    "title": "Get nb of Classes for an User",
    "name": "nbClasses",
    "group": "Dashboard",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idEcole is missing.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbClasses\": 18\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "/dashboard/nbEleves",
    "title": "Get nb of Students for an user",
    "name": "nbEleves",
    "group": "Dashboard",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idEcole is missing.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbEleves\": 18\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "/dashboard/nbGamesPlayed",
    "title": "Get the number of Played games for the current month",
    "name": "nbGamesPlayed",
    "group": "Dashboard",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant la récupération du nombre de parties effectuées sur le mois en cours par un idProf (ou directeur)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Token",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbGamesPlayed\": 16\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "/dashboard/nbNotifsNonL",
    "title": "Get all notifications unRead for the popup",
    "name": "nbNotifsNonLues",
    "group": "Dashboard",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant la récupération des notifications.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbNotifsNonL\": 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "/pdf/:idEleve",
    "title": "create a PDF for student bulletin",
    "name": "GetBulletinPDF",
    "group": "ElevesStats",
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
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n       }\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Route permettant le téléchargement du bulletin d'un Élève en PDF.</p>",
    "filename": "routes/PDFCreator.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/bulletin/:idEleve",
    "title": "Generate the bulletin of a student",
    "name": "bulletin",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idEleve",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"labeltype\": \"Logique\",\n           \"moyenne\": 88,\n           \"moyenneClasse\": 81.5,\n           \"nbPlayed\": 1\n       },\n       {\n           \"labeltype\": \"Maths\",\n           \"moyenne\": 50,\n           \"moyenneClasse\": 67.5,\n           \"nbPlayed\": 1\n       }\n   ],\n   \"moyenneGeneralEleve\": 69,\n   \"moyenneGeneraleClasse\": 74.5\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/byClasse/:idClasse",
    "title": "Get games done by class",
    "name": "byClasse",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idClasse",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"nbGamesPlayedBC\": 1,\n   \"response\": [\n       {\n           \"idGP\": 1,\n           \"nameGame\": \"Compteclasse\",\n           \"idMatiere\": 1,\n           \"matiere\": \"Maths\",\n           \"moyenne\": 67.5,\n           \"nbJoueurs\": 4,\n           \"date\": \"2019-03-14T18:04:51.000Z\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/bySession/:idGP",
    "title": "Get all students",
    "name": "bySession",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idGP",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"ascEleve\": [\n       {\n           \"idEleve\": 13,\n           \"nom\": \"Bozo\",\n           \"prenom\": \"Jessico\",\n           \"note\": 88\n       },\n       {\n           \"idEleve\": 14,\n           \"nom\": \"Couturier\",\n           \"prenom\": \"Manon\",\n           \"note\": 75\n       }\n   ],\n   \"descNote\": [\n       {\n           \"idEleve\": 13,\n           \"nom\": \"Bozo\",\n           \"prenom\": \"Jessico\",\n           \"note\": 88\n       },\n       {\n           \"idEleve\": 14,\n           \"nom\": \"Couturier\",\n           \"prenom\": \"Manon\",\n           \"note\": 75\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/gamesPlayed/:idEleve",
    "title": "Get games playeds by idEleve",
    "name": "gamesPlayed",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idEleve",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idGP\": 1,\n           \"nameGame\": \"Compteclasse\",\n           \"matiere\": \"Maths\",\n           \"note\": 100,\n           \"date\": \"2019-03-14T18:04:51.000Z\",\n           \"moyenne\": 67.5\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/getClassesAvg",
    "title": "Get the average of all classes of the professor",
    "name": "getClassesAvg",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"status\":200,\n     \"error\":null,\n     \"response\":[\n         {\n         \"moyenne\":59.3913,\n         \"level\":4,\n             \"num\":1\n         },\n         {\n             \"moyenne\":100,\n             \"level\":5,\n             \"num\":1\n         }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/getElevesRank",
    "title": "Get the rank of the 10 best student of the current user",
    "name": "getElevesRank",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\n\"error\":null,\n\"response\":[\n     {\n         \"score\":70.3333,\"idEleve\":2\n     },\n     {\n         \"score\":67.6667,\"idEleve\":4\n     },\n     {\n         \"score\":57.4286,\"idEleve\":3\n     },\n     {\n         \"score\":34,\"idEleve\":1\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/getGamesByMatEleve/:idEleve/:idMat",
    "title": "Get games played by a student for one gametype",
    "name": "getGamesByMatEleve",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idEleve",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idMat",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idGP\": 1,\n           \"nameGame\": \"Compteclasse\",\n           \"matiere\": \"Maths\",\n           \"note\": 100,\n           \"date\": \"2019-03-14T18:04:51.000Z\",\n           \"moyenne\": 67.5\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
  },
  {
    "type": "get",
    "url": "/eleves/stats/getMat/:idEleve",
    "title": "Get games type played by a student",
    "name": "getMat",
    "group": "ElevesStats",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idEleve",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idTypeGame\": 1,\n           \"labelType\": \"Logique\"\n       },\n       {\n           \"idTypeGame\": 2,\n           \"labelType\": \"Mathématiques\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/elevesStats.js",
    "groupTitle": "ElevesStats"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "directorId",
            "description": "<p>L'id du directeur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nom de l'élève a ajouter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "prenom",
            "description": "<p>Prénom de l'élève a ajouter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idClasse",
            "description": "<p>Id de la classe à laquelle ajouter un élève.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "picEleve",
            "description": "<p>Photo de l'étudiant ajouté.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "filename": "routes/eleves/eleves.js",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idClasse",
            "description": "<p>IdClasse des élèves à récupérer.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idClasse is missing.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n           \"nomEleve\": \"Merveillau\",\n           \"prenomEleve\": \"Denis\"\n        },\n        {\n           \"nomEleve\": \"Senouci\",\n           \"prenomEleve\": \"Elies\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "get",
    "url": "/eleves/byProf",
    "title": "Get students by prof",
    "name": "byProf",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idProf is missing.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n\t\t\t\t {\n            \"idEleve\": 1,\n            \"nomEleve\": \"Merveilleau\",\n            \"prenomEleve\": \"Denis\",\n            \"BAE\": null,\n            \"INE\": null\n       \t},\n       \t{\n            \"idEleve\": 2,\n            \"nomEleve\": \"Senouci\",\n            \"prenomEleve\": \"Elies\",\n            \"BAE\": null,\n            \"INE\": null\n       \t}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "get",
    "url": "/eleves/",
    "title": "Get all students",
    "name": "getAll",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n           \"idEleve\": 1,\n           \"nomEleve\": \"Merveillau\",\n           \"prenomEleve\": \"Denis\",\n           \"BAE\": null,\n           \"INE\": null,\n           \"picPath\": \"1-eleve.png\"\n       }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/eleves/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "get",
    "url": "/eleves/:id",
    "title": "Get student by id",
    "name": "getById",
    "group": "Eleves",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
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
            "field": "idEleve",
            "description": "<p>de l'élève.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nomEleve",
            "description": "<p>de l'élève.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenomEleve",
            "description": "<p>de l'élève.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BAE",
            "description": "<p>de l'élève.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "INE",
            "description": "<p>de l'élève.</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "picPath",
            "description": "<p>de l'élève.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n           \"idEleve\": 1,\n           \"nomEleve\": \"Merveillau\",\n           \"prenomEleve\": \"Denis\",\n           \"BAE\": null,\n           \"INE\": null,\n           \"picPath\": \"1-eleve.png\"\n       }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "filename": "routes/eleves/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "put",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEleve",
            "description": "<p>Id de l'élève en question.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picEleve",
            "description": "<p>Image de l'élève à uploader.</p>"
          }
        ]
      }
    },
    "filename": "routes/eleves/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "put",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEleve",
            "description": "<p>Id de l'élève a mettre a jour.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomEleve",
            "description": "<p>Nom de l'élève a mettre a jour.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomEleve",
            "description": "<p>Prénom de l'élève a mettre a jour.</p>"
          }
        ]
      }
    },
    "filename": "routes/eleves/eleves.js",
    "groupTitle": "Eleves"
  },
  {
    "type": "get",
    "url": "/facturation/getFactures/:idEcole",
    "title": "Get all Bills from a school",
    "name": "getFactures",
    "group": "Facturation",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idEcole",
            "description": "<p>Id de l'école en question</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idFacture\": 1,\n           \"idEcole\": 1,\n           \"typeFacture\": 2,\n           \"date\": \"2019-08-24T20:40:37.000Z\",\n           \"prixHT\": 80,\n           \"prixTTC\": 100,\n           \"paid\": 0\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facturation/gestFact.js",
    "groupTitle": "Facturation"
  },
  {
    "type": "get",
    "url": "/facturation/getFacture/:idFacture",
    "title": "Get precises data from a facture",
    "name": "getFacure",
    "group": "Facturation",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idFacture",
            "description": "<p>Id de la facture voulue</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"status\": 200,\n   \"error\": null,\n   \"response\": {\n       \"idFacture\": 1,\n       \"typeFacture\": 2,\n       \"dateFacture\": \"2019-08-24T20:40:37.000Z\",\n       \"prixHT\": 80,\n       \"prixTTC\": 100,\n       \"paid\": 0,\n       \"nomEcole\": \"Sainte-Marie: Grand Lebrun\",\n       \"rueEcole\": \"Rue de l'école normale\",\n       \"numRueEcole\": 4,\n       \"villeEcole\": \"Bordeaux\",\n       \"departementEcole\": \"Aquitaine\",\n       \"telEcole\": \"0603874206\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facturation/gestFact.js",
    "groupTitle": "Facturation"
  },
  {
    "type": "post",
    "url": "/stripe/secure/createStripeCustomer",
    "title": "Create customer in stripe",
    "name": "verifPassword",
    "group": "Facturation",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password de l'utilisateur.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": \"Password Valid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/stripe/secure.js",
    "groupTitle": "Facturation"
  },
  {
    "type": "post",
    "url": "/facturation/secure/verifPassword",
    "title": "Verification password",
    "name": "verifPassword",
    "group": "Facturation",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password de l'utilisateur.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": \"Password Valid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facturation/secure.js",
    "groupTitle": "Facturation"
  },
  {
    "type": "delete",
    "url": "/filesManager/deleteFile",
    "title": "Deleting a file",
    "name": "deleteFile",
    "group": "FilesManager",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idFile",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/filesManager/filesManager.js",
    "groupTitle": "FilesManager"
  },
  {
    "type": "put",
    "url": "/filesManager/editFile",
    "title": "Editing a file",
    "name": "editFile",
    "group": "FilesManager",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idFile",
            "description": ""
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
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "private",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/filesManager/filesManager.js",
    "groupTitle": "FilesManager"
  },
  {
    "type": "post",
    "url": "/filesManager/getAll",
    "title": "Get all the files an user can access",
    "name": "getAll",
    "group": "FilesManager",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "private",
            "description": "<p>0 non - 1 oui</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>IMG / PDF / MP4</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "classement",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idFile\": 5,\n           \"nom\": \"MonFichier\",\n           \"path\": \"monkas.png\",\n           \"type\": \"IMG\",\n           \"description\": \"Voici mon premier fichier\",\n           \"private\": 1\n       },\n       {\n           \"idFile\": 6,\n           \"nom\": \"MonFichier\",\n           \"path\": \"jesusger.jpg\",\n           \"type\": \"IMG\",\n           \"description\": \"Voici mon premier fichier\",\n           \"private\": 1\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/filesManager/filesManager.js",
    "groupTitle": "FilesManager"
  },
  {
    "type": "get",
    "url": "/filesManager/getOne/:idFile",
    "title": "Get one file by id",
    "name": "getOne",
    "group": "FilesManager",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idFile",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>FileNotFound.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n       {\n           \"idFile\": 5,\n           \"nom\": \"MonFichier\",\n           \"path\": \"monkas.png\",\n           \"type\": \"IMG\",\n           \"description\": \"Voici mon premier fichier\",\n           \"private\": 1\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/filesManager/filesManager.js",
    "groupTitle": "FilesManager"
  },
  {
    "type": "post",
    "url": "/filesManager/uploadFile",
    "title": "Upload a file",
    "name": "uploadFile",
    "group": "FilesManager",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileType",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "private",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "fileUser",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error 1 &amp; 2.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/filesManager/filesManager.js",
    "groupTitle": "FilesManager"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nom de l'application/jeu.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Nom du créateur.</p>"
          }
        ]
      }
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "get",
    "url": "/files/Games/:idGame",
    "title": "Download a game",
    "name": "downGame",
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
            "description": "<p>Id de l'app/jeu.</p>"
          }
        ]
      }
    },
    "filename": "routes/gameDownload/gameDownload.js",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
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
    "url": "/games/nbGames",
    "title": "Get nb of Games by idEcole",
    "name": "nbGames",
    "group": "Games",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idEcole is missing.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n\t\t\t\t {\n            \"nbGames\": 3\n       \t}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/games/games.js",
    "groupTitle": "Games"
  },
  {
    "type": "post",
    "url": "/help/contact",
    "title": "Form contact",
    "name": "contact",
    "group": "Help",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pbType",
            "description": "<p>Type du problème</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pbDetail",
            "description": "<p>Détail du problème</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": \"Mail send.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/help.js",
    "groupTitle": "Help"
  },
  {
    "type": "delete",
    "url": "/notifs/:idNotif",
    "title": "Delete a notification",
    "name": "Delete_a_noitif",
    "group": "Notifications",
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
            "field": "idNotif",
            "description": "<p>Id de la notification.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de supprimer une notification.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"\",\n       \"protocol41\": true,\n       \"changedRows\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/notifs/getNotif/:idNotif",
    "title": "Get a notification",
    "name": "Get_a_noitif",
    "group": "Notifications",
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
            "field": "idNotif",
            "description": "<p>Id de la notification.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de récupérer toutes les informations d'une notification.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"idNotif\": 1,\n           \"idUserNotif\": 1,\n           \"typeNotif\": 1,\n           \"isRead\": 0,\n           \"textNotif\": \"Une demande d'achat d'application a été faite.\",\n           \"idDemande\": 10,\n           \"idProf\": 36,\n           \"idGame\": 3,\n           \"idEcole\": 1,\n           \"isAccepted\": 2,\n           \"dateDemande\": \"2019-01-08T19:17:57.000Z\",\n           \"commentaire\": \"null\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/notifs/",
    "title": "Get all notifications",
    "name": "Notifications",
    "group": "Notifications",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant la récupération des notifications.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbNotifs\": 1,\n    \"response\": [\n       {\n           \"idNotif\": 1,\n           \"idUser\": 1,\n           \"idToNotify\": 1,\n           \"typeNotif\": 1,\n           \"isRead\": 0,\n           \"textNotif\": \"Vous avez un nouvel achat à valider.\",\n           \"idApp\": \"1\",\n           \"nomApp\": \"Puzzle\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "put",
    "url": "/notifs/read/:idNotif",
    "title": "Read a notification",
    "name": "Read",
    "group": "Notifications",
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
            "field": "idNotif",
            "description": "<p>Id de la notification.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de rendre une notification 'lue'.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"(Rows matched: 1  Changed: 1  Warnings: 0\",\n       \"protocol41\": true,\n       \"changedRows\": 1\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/notifs/getArrayProf/:idDemande",
    "title": "Get all the users asked for the same game",
    "name": "getArrayProf",
    "group": "Notifications",
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
            "field": "idDemande",
            "description": "<p>Id de la demande d'achat de jeu en question.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la récupération des professeurs ayant fait la demande d'un jeu.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbProfsDemande\": 2,\n    \"response\": [\n       {\n         \"idUser\": 33,\n         \"picPath\": \"pic.png\",\n         \"nomPrenom\": \"Diane Gadrat\",\n         \"commentaire\": \"Mes étudiants en ont besoins !\",\n         \"dateDemande\": \"27/07/25\"\n       },\n       {\n         \"idUser\": 34,\n         \"picPath\": \"pic.png\",\n         \"nomPrenom\": \"Romain Gadrat\",\n         \"commentaire\": \"Mes étudiants n'en ont pas besoins !\",\n         \"dateDemande\": \"29/07/25\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/notifs/getNbNotifs/",
    "title": "Getting the number of notifications",
    "name": "getNbNotifs",
    "group": "Notifications",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant la récupération du nombre de notifications d'un utilisateur.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"nb\": 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/notifs/popUpMenu",
    "title": "Get all notifications unRead for the popup",
    "name": "popUpMenu",
    "group": "Notifications",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Route permettant la récupération des notifications.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"nbNotifs\": 1,\n    \"response\": [\n       {\n           \"idNotif\": 1,\n           \"idUser\": 1,\n           \"idToNotify\": 1,\n           \"typeNotif\": 1,\n           \"isRead\": 0,\n           \"textNotif\": \"Vous avez un nouvel achat à valider.\",\n           \"idApp\": \"1\",\n           \"nomApp\": \"Puzzle\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "put",
    "url": "/notifs/unRead/:idNotif",
    "title": "unRead a notification",
    "name": "unRead",
    "group": "Notifications",
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
            "field": "idNotif",
            "description": "<p>Id de la notification.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de rendre une notification 'non-lue'.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n       \"fieldCount\": 0,\n       \"affectedRows\": 1,\n       \"insertId\": 0,\n       \"serverStatus\": 2,\n       \"warningCount\": 0,\n       \"message\": \"(Rows matched: 1  Changed: 1  Warnings: 0\",\n       \"protocol41\": true,\n       \"changedRows\": 1\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/notifs.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "post",
    "url": "/play/createGame/",
    "title": "Create a game",
    "name": "createGame",
    "group": "Play",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idClasse",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idGame",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idTypeGame",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n  {\n      \"status\": 200,\n      \"idGP\": 11,\n      \"response\": {\n          \"fieldCount\": 0,\n          \"affectedRows\": 1,\n          \"insertId\": 11,\n          \"serverStatus\": 2,\n          \"warningCount\": 0,\n          \"message\": \"\",\n          \"protocol41\": true,\n          \"changedRows\": 0\n      }\n  }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/play.js",
    "groupTitle": "Play"
  },
  {
    "type": "post",
    "url": "/play/endGame/",
    "title": "Ending a game",
    "name": "endGame",
    "group": "Play",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idGP",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "player1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "player2",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "player3",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "player4",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "scorePlayer1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "scorePlayer2",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "scorePlayer3",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "scorePlayer4",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"idGP\": 11,\n   \"response\": 4\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/play.js",
    "groupTitle": "Play"
  },
  {
    "type": "get",
    "url": "/play/myGame/:idGP",
    "title": "Get game infos",
    "name": "myGame",
    "group": "Play",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "idGP",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"error\": null,\n   \"response\": [\n   {\n           \"idGP\": 1,\n           \"idGame\": 1,\n           \"idTypeGame\": 2,\n           \"idProf\": 33,\n           \"idClasse\": 1,\n           \"isPlayed\": 1,\n           \"TimeStamp\": \"2019-03-14T18:04:51.000Z\"\n       }\n  }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/play.js",
    "groupTitle": "Play"
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
            "description": "<p>Id du type d'application voulue.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de récupérer toutes les applications par rapport à un Type d'application.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"id\": 1,\n           \"nomApp\": \"testApp\",\n           \"nomCreator\": \"test\",\n           \"picPath\": \"1-app.png\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/validating",
    "title": "Validating an appAsk",
    "name": "Validating",
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
            "field": "idDemande",
            "description": "<p>Id de la demande d'achat.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "validate",
            "description": "<p>Bool (0 ou 1) signifiant si l'achat d'application est validé ou non.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la validation d'un achat demandé par un professeur.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"idGame\": 1,\n           \"idEcole\": 1\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/addAvis",
    "title": "Add a view to a game in the store",
    "name": "addAvis",
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
            "field": "idGame",
            "description": "<p>Id du jeu sur lequel poster un avis.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "note",
            "description": "<p>int correspondant a la note attribuee au jeu.</p>"
          },
          {
            "group": "Parameter",
            "type": "Text",
            "optional": false,
            "field": "commentaire",
            "description": "<p>texte correspondant au commentaire attribuee au jeu.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant l'ajout d'un avis sur un jeu disponible sur le store.</p>",
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
            "description": "<p>Id de l'application à acheter.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentaire",
            "description": "<p>Commantaide de demande d'achat.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de faire une demande d'achat d'application.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n        \"fieldCount\": 0,\n        \"affectedRows\": 1,\n        \"insertId\": 1,\n        \"serverStatus\": 2,\n        \"warningCount\": 0,\n        \"message\": \"\",\n        \"protocol41\": true,\n        \"changedRows\": 0\n    }\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>Id de l'application a acheter.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant l'achat d'une application sans vérification nécessaire.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": {\n        \"fieldCount\": 0,\n        \"affectedRows\": 1,\n        \"insertId\": 0,\n        \"serverStatus\": 2,\n        \"warningCount\": 0,\n        \"message\": \"\",\n        \"protocol41\": true,\n        \"changedRows\": 0\n    }\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>Id de l'application voulue.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de récupérer les informations d'une application.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"id\": 1,\n           \"nomApp\": \"testApp\",\n           \"nomCreator\": \"test\",\n           \"picPath\": \"1-app.png\",\n           \"path\": \"NULL\",\n           \"prix\": \"400euros\",\n           \"nb_joueurs\": 4,\n           \"current_version\": \"1.0\",\n           \"niveau\": 2\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
    "url": "/store/getAppStatus/:id",
    "title": "Getting app status (if buyed by the school)",
    "name": "getAppStatus",
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
            "description": "<p>Id de l'application demandée.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de savoir si l'application est détenue par l'école ou non.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"appStatus\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/store/avis",
    "title": "Getting view of app",
    "name": "getAppView",
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
            "description": "<p>Id de l'application demandée.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "depart",
            "description": "<p>pour le LIMIT.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "nbRes",
            "description": "<p>pour le LIMIT.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de voir les avis concernant une application</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"date\": \"2019-03-23T17:05:13.000Z\",\n            \"commentaire\": \"formidable!!\",\n            \"note\": 5,\n            \"nomProf\": \"Berthaud\",\n            \"prenomProf\": \"Elodie\",\n            \"photo\": \"1-prof.png\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
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
    "description": "<p>Route permettant de récupérer les applications déjà achetées pour une école.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"id\": 1,\n           \"nomApp\": \"testApp\",\n           \"nomCreator\": \"test\",\n           \"picPath\": \"1-app.png\",\n           \"path\": \"NULL\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
    "url": "/store/nbAvis/:idApp",
    "title": "Getting number of app views",
    "name": "getNbAppView",
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
            "description": "<p>Id de l'application demandée.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant d'avoir le nombre d'avis concernant une application</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"nbAvis\": 59,\n            \"moyenne\": 3.5\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
    "url": "/store/getUserAvis/:idApp",
    "title": "Getting the view of a user",
    "name": "getUserAppView",
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
            "description": "<p>Id de l'application demandée.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de récupérer l'avis d'un utilisateur sur une application, si avis il y a.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\":200,\n    \"error\":null,\n    \"response\":[\n        {\n            \"idAvis\":38,\n            \"note\":5,\n            \"commentaire\":\"C'est pas mal !!\"\n        }\n    ]\n }\n {\n     \"status\":201,\n     \"error\":null,\n     \"response\":null\n }",
          "type": "json"
        }
      ]
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
    "description": "<p>Route permettant de récupérer tous les types de jeux disponibles.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"idType\": 1,\n           \"labelType\": \"Jeux\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "put",
    "url": "/store/updateUserAvis",
    "title": "Update a view",
    "name": "updateUserAvis",
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
            "description": "<p>Id de l'application demandée.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "note",
            "description": "<p>note donnée par l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "commentaire",
            "description": "<p>commentaire donnée par l'utilisateur.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de modifier l'avis d'un utilisateur</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"status\":200,\n\"error\":null,\n\"response\":{\n     \"fieldCount\":0,\n     \"affectedRows\":1,\n     \"insertId\":0,\n     \"serverStatus\":34,\n     \"warningCount\":0,\n     \"message\":\"(Rows matched: 1 Changed: 1 Warnings: 0\",\"protocol41\":true,\"changedRows\":1\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/store/store.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/addMethod",
    "title": "Create a payment method for a customer",
    "name": "Stripe",
    "group": "Stripe",
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
            "type": "token",
            "optional": false,
            "field": "pm_id",
            "description": "<p>Token retourné par Stripe avant l'appel à l'API. Securise les datas de la carte.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de créer un moyen de paiement pour un directeur</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n         \"Paiement crée !\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/stripe/payments.js",
    "groupTitle": "Stripe"
  },
  {
    "type": "post",
    "url": "/table/licences/validate/",
    "title": "Validating the licence",
    "name": "validate",
    "group": "Table_Licence",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>TokenTable auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "licence",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": \"Licence validated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/licences/lic.js",
    "groupTitle": "Table_Licence"
  },
  {
    "type": "get",
    "url": "/table/licences/verif/:licence",
    "title": "Verifying the licence",
    "name": "verif",
    "group": "Table_Licence",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>TokenTable auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "licence",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n       {\n           \"idLicence\": 20,\n           \"idEcole\": 1,\n           \"serial\": \"7CCK-METF-SSFW-7RZ8\",\n           \"used\": 1,\n           \"dateExpire\": \"2020-04-23T15:16:20.000Z\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/licences/lic.js",
    "groupTitle": "Table_Licence"
  },
  {
    "type": "put",
    "url": "/table/gestApps/appInstalled",
    "title": "When an app is installed on a table",
    "name": "appInstalled",
    "group": "Table",
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
            "field": "idJeu",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": OK\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/gestApps.js",
    "groupTitle": "Table"
  },
  {
    "type": "get",
    "url": "/table/gestApps/appsNotOnTable",
    "title": "Getting Games not installed",
    "name": "appsNotOnTable",
    "group": "Table",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"idGame\": 2,\n            \"idType\": 1,\n            \"name\": \"Invacouleur\",\n            \"creator\": 1,\n            \"picPath\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/gestApps.js",
    "groupTitle": "Table"
  },
  {
    "type": "get",
    "url": "/table/gestApps/appsOnTable",
    "title": "Getting Games installed",
    "name": "appsOnTable",
    "group": "Table",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n            \"idGame\": 2,\n            \"idType\": 1,\n            \"name\": \"Invacouleur\",\n            \"creator\": 1,\n            \"picPath\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/table/gestApps.js",
    "groupTitle": "Table"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>TokenTable auth</p>"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tokenTable",
            "description": "<p>Token de la table</p>"
          }
        ]
      }
    },
    "filename": "routes/table/cnxTable2.js",
    "groupTitle": "Table"
  },
  {
    "type": "post",
    "url": "/cnxTable/verifToken",
    "title": "Verifying a token Table",
    "name": "verifToken",
    "group": "Table",
    "permission": [
      {
        "name": "notLogged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>TokenTable auth</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"idProf\": 1,\n    \"token\": letoken\n}",
          "type": "json"
        }
      ]
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idClasse",
            "description": "<p>Id de la classe voulue.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>Affiner la recherche.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idUser ou typeUser ou idClasse manquants.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la récupération du trombi des étudiants d'un professeur (ou directeur) par une classe spécifique.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n         {\n            \"idEleve\": 13,\n            \"nomEleve\": \"Bozon\",\n            \"prenomEleve\": \"Jessica\",\n            \"BAE\": null,\n            \"INE\": null,\n            \"picPath\": null,\n            \"num\": 1,\n            \"level\": 7\n        },\n        {\n            \"idEleve\": 14,\n            \"nomEleve\": \"Couturier\",\n            \"prenomEleve\": \"Eleonore\",\n            \"BAE\": null,\n            \"INE\": null,\n            \"picPath\": null,\n            \"num\": 1,\n            \"level\": 7\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/trombi.js",
    "groupTitle": "Trombi"
  },
  {
    "type": "get",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant de récupérer les classes de l'utilisateur connecté pour trier le trombi.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idUser ou typeUser manquants.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n         {\n            \"idClasse\": 1,\n            \"level\": 4,\n            \"num\": 1,\n            \"annee\": \"2017/2018\"\n        },\n        {\n            \"idClasse\": 3,\n            \"level\": 5,\n            \"num\": 1,\n            \"annee\": \"2017/2018\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>Affiner la recherche.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la récupération du trombi des étudiants d'un professeur (ou directeur).</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>SQL Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "510",
            "description": "<p>idUser ou typeUser manquants.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"error\": null,\n    \"response\": [\n        {\n           \"idEleve\": 4,\n           \"nomEleve\": \"Bonduelle\",\n           \"prenomEleve\": \"James\",\n           \"BAE\": null,\n           \"INE\": null,\n           \"picPath\": \"NULL\",\n           \"idClasse\": 1,\n           \"num\": 1,\n           \"level\": 4\n       },\n       {\n           \"idEleve\": 13,\n           \"nomEleve\": \"Bozon\",\n           \"prenomEleve\": \"Jessica\",\n           \"BAE\": null,\n           \"INE\": null,\n           \"picPath\": null,\n           \"idClasse\": 5,\n           \"num\": 1,\n           \"level\": 7\n       }\n    ]\n}",
          "type": "json"
        }
      ]
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nome de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Prénom de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la création d'un utilisateur.</p>",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
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
            "description": "<p>Id de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Nom de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Prénom de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailUser",
            "description": "<p>Email de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Mot de passe de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": "<p>Type de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picPath",
            "description": "<p>Photo de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Type de device utilisé.</p>"
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
    "description": "<p>Route permettant la récupération de tous les utilisateurs.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newEmail",
            "description": "<p>Nouvel Emai lde l'utilisateur.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant le changement de l'email d'un utilisateur.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Ancien mot de passe.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>Nouveau mot de passe.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant le changement de mot de passe d'un utilisateur.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/infos",
    "title": "Request UserLogged information",
    "name": "infos",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
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
            "description": "<p>Id de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Nom de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Prénom de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailUser",
            "description": "<p>Email de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Mot de passe de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": "<p>Type de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picPath",
            "description": "<p>Photo de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Type de device utilisé.</p>"
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
    "description": "<p>Route permettant la récupération d'un utilisateur.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/infos/:idUser",
    "title": "Request User information",
    "name": "infos__idUser",
    "group": "Users",
    "permission": [
      {
        "name": "Logged"
      }
    ],
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
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
            "description": "<p>Id de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Nom de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Prénom de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailUser",
            "description": "<p>Email de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Mot de passe de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "typeUser",
            "description": "<p>Type de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picPath",
            "description": "<p>Photo de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token de l'utilisateur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Type de device utilisé.</p>"
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
    "description": "<p>Route permettant la récupération d'un utilisateur.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picProf",
            "description": "<p>Image de l'utilisateur a uploader.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant l'upload de la photo d'un utilisateur.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token auth</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "idUser",
            "description": "<p>Id de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomUser",
            "description": "<p>Nom de l'utilisateur.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenomUser",
            "description": "<p>Prénom de l'utilisateur.</p>"
          }
        ]
      }
    },
    "description": "<p>Route permettant la mise à jour d'un utilisateur.</p>",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });

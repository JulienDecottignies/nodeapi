"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = __importStar(require("mssql"));
var bodyParser = __importStar(require("body-parser"));
var express = require("express");
var app = express();
var router = express.Router();
// app.set('case sensitive routing', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server = app.listen(3000, function () {
    console.log("running on port 3000");
});
var dbConfig = {
    user: 'julien',
    password: 'Dks2019$',
    server: 'localhost',
    options: {
        instanceName: 'SQLEXPRESS'
    },
    database: 'nodeconnect'
};
var executeQuery = function (response, query) {
    var connection = new sql.ConnectionPool(dbConfig, function (err) {
        if (err) {
            console.log("An error occured: " + err);
            response.status(400).send(err);
        }
        else {
            // Create a request
            var sqlRequest = new sql.Request(connection);
            // query database
            sqlRequest.query(query, function (err, sqlResponse) {
                if (err) {
                    console.log("Error while querying the database: " + err);
                    response.status(400).send(err);
                }
                else {
                    response.status(200).send(sqlResponse);
                }
            });
        }
    });
};
// GET ALL API
app.get('/api/user', function (req, response) {
    var query = 'SELECT * FROM [dbo].[user]';
    executeQuery(response, query);
});
// GET SINGLE API
app.get('/api/user/:user_id', function (req, response) {
    var id = parseInt(req.params.user_id);
    var query = "SELECT * FROM [dbo].[user] WHERE id = '" + id + "'";
    executeQuery(response, query);
});
// POST API
app.post('/api/user', function (req, response) {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var query = "INSERT INTO [dbo].[user] (id, name, email) VALUES ('" + id + "', '" + name + "', '" + email + "')";
    executeQuery(response, query);
});
// PUT API
app.put('/api/user/:id', function (req, response) {
    var id = parseInt(req.params.id);
    var newEmail = req.body.email;
    var query = "UPDATE [dbo].[user] SET email = '" + newEmail + "' WHERE id = '" + id + "'";
    executeQuery(response, query);
});
// DELETE API
app.delete('/api/user/:id', function (req, response) {
    var id = parseInt(req.params.id);
    var query = "DELETE from [dbo].[user] WHERE id = '" + id + "'";
    executeQuery(response, query);
});

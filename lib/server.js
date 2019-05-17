"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var sql = __importStar(require("mssql"));
var bodyParser = __importStar(require("body-parser"));
var app = express.application;
app.use(bodyParser.json());
var server = app.listen(process.env.PORT || 8080, function () {
    console.log("running on unknown port");
});
var dbConfig = {
    user: 'Cyborg\\jds',
    password: 'CaféLeMoundir2$',
    server: 'localhost\\SQLEXPRESS',
    database: 'nodeconnect'
};
var executeQuery = function (response, query) {
    new sql.ConnectionPool(dbConfig, function (err) {
        if (err) {
            console.log("An error occured: " + err);
            response.send(err);
        }
        else {
            // Create a request
            var sqlRequest = new sql.Request();
            // query database
            sqlRequest.query(query, function (err, sqlResponse) {
                if (err) {
                    console.log("Error while querying the database: " + err);
                    response.send(err);
                }
                else {
                    response.send(sqlResponse);
                }
            });
        }
    });
};
// Get API
app.post('/api/user', function (response) {
    var query = "select * from [user]";
    executeQuery(response, query);
});

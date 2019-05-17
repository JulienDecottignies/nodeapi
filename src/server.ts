import * as sql from "mssql";
import * as bodyParser from "body-parser";
import express = require('express');
import { Server } from "http";

const app: express.Application = express();

// app.set('case sensitive routing', true);
app.use(bodyParser.json());

var server = app.listen(3000, () => {
        console.log(`running on port 3000`);
});

var dbConfig: sql.config = {
    user: 'julien',
    password: 'Dks2019$',
    server: 'localhost',
    options: { 
        instanceName: 'SQLEXPRESS' 
    },
    database: 'nodeconnect'
}


var executeQuery = (response: express.Response, query: string) => {

    let connection: sql.ConnectionPool = new sql.ConnectionPool(dbConfig, (err: any) => {
        if (err) {
            console.log(`An error occured: ${err}`);
            response.send(err);
        }


        else {
            // Create a request
            let sqlRequest = new sql.Request(connection);

            // query database

            sqlRequest.query(query, (err: any, sqlResponse: any) => {
                if (err) {
                    console.log(`Error while querying the database: ${err}`);
                    response.send(err);
                }
                else {
                    response.send(sqlResponse);
                }
            });
        }
    });
}

// Get API

app.get('/api/user', (req: express.Request, response: express.Response) => {
    console.log('get');
    let query = `SELECT * FROM [user]`;
    executeQuery(response, query);
});

app.post('/api/user', (req: express.Request, response: express.Response) => {
    console.log('post');
    let query = 'INSERT INTO [user] (name) VALUES (\'nico\')';
    executeQuery(response, query);
});


app.get('api/getAzure', (req: express.Request, response: express.Response) => {
    response.send('response from node app azure hosted received !');
})

import * as sql from "mssql";
import * as bodyParser from "body-parser";
import express = require('express');

const app: express.Application = express();
let router = express.Router();

// app.set('case sensitive routing', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(3000, () => {
        console.log(`running on port 3000`);
});

const dbConfig: sql.config = {
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
            response.status(400).send(err);
        }


        else {
            // Create a request
            let sqlRequest = new sql.Request(connection);

            // query database

            sqlRequest.query(query, (err: any, sqlResponse: any) => {
                if (err) {
                    console.log(`Error while querying the database: ${err}`);
                    response.status(400).send(err);
                }
                else {
                    response.status(200).send(sqlResponse);
                }
            });
        }
    });
}

// GET ALL API

app.get('/api/user', (req: express.Request, response: express.Response) => {
    let query: string = 'SELECT * FROM [dbo].[user]';

  executeQuery(response, query);
});

// GET SINGLE API

app.get('/api/user/:user_id', (req: express.Request, response: express.Response) => {
    let id: number = parseInt(req.params.user_id);

    let query: string = `SELECT * FROM [dbo].[user] WHERE id = \'${id}\'`;

    executeQuery(response, query);
})

// POST API
app.post('/api/user', (req: express.Request, response: express.Response) => {
    let id: number = req.body.id;
    let name: string = req.body.name;
    let email: string = req.body.email;
    
    let query: string = `INSERT INTO [dbo].[user] (id, name, email) VALUES (\'${id}\', \'${name}\', \'${email}')`;
    executeQuery(response, query);
});

// PUT API
app.put('/api/user/:id', (req: express.Request, response: express.Response) => {
    let id: number = parseInt(req.params.id);
    let newEmail: string = req.body.email;

    let query: string = `UPDATE [dbo].[user] SET email = \'${newEmail}\' WHERE id = \'${id}\'`;

    executeQuery(response, query);
});

// DELETE API
app.delete('/api/user/:id', (req: express.Request, response: express.Response) => {
    let id: number = parseInt(req.params.id);

    let query: string = `DELETE from [dbo].[user] WHERE id = \'${id}\'`;

    executeQuery(response, query);
});
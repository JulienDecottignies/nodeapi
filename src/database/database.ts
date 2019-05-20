import * as sql from "mssql";
import dbconfig from "./dbconfig.json";
import express = require('express');

const dbConfig: sql.config = dbconfig;

export function executeQuery(response: express.Response, query: string) {

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
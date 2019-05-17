import * as bodyParser from "body-parser";
import express = require('express');

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, () => {
    console.log(`running on port 3000`);
});



app.use('/api/user', require('./routes/user'));
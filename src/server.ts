import * as bodyParser from "body-parser";
import * as db from './database';
import express = require('express');

const app: express.Application = express();
var router = express.Router();

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('In Router');

    next();
});

router.get('/', (req: express.Request, res: express.Response) => {
    console.log('router');
    res.json({ message: 'toto' });
})

// Register routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, () => {
    console.log(`running on port 3000`);
});


router.route('/user')
    // GET ALL API

    .get((req: express.Request, response: express.Response) => {
        let query: string = 'SELECT * FROM [dbo].[user]';

        db.executeQuery(response, query);
    })

    // POST API
    .post((req: express.Request, response: express.Response) => {
        let id: number = req.body.id;
        let name: string = req.body.name;
        let email: string = req.body.email;

        let query: string = `INSERT INTO [dbo].[user] (id, name, email) VALUES (\'${id}\', \'${name}\', \'${email}')`;
        db.executeQuery(response, query);
    });


router.route('/user/:user_id')
    // GET SINGLE API

    .get((req: express.Request, response: express.Response) => {
        let id: number = parseInt(req.params.user_id);

        let query: string = `SELECT * FROM [dbo].[user] WHERE id = \'${id}\'`;

        db.executeQuery(response, query);
    })
    // PUT API
    .put((req: express.Request, response: express.Response) => {
        let id: number = parseInt(req.params.user_id);
        let newEmail: string = req.body.email;

        let query: string = `UPDATE [dbo].[user] SET email = \'${newEmail}\' WHERE id = \'${id}\'`;

        db.executeQuery(response, query);
    })

    // DELETE API
    .delete((req: express.Request, response: express.Response) => {
        let id: number = parseInt(req.params.user_id);

        let query: string = `DELETE from [dbo].[user] WHERE id = \'${id}\'`;

        db.executeQuery(response, query);
    });

app.use('/api', router);
import express from "express";
import * as db from '../database/database';

var router = express.Router();

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('In Router');

    next();
});

router.get('/',(req: express.Request, response: express.Response) => {
    let query: string = 'SELECT * FROM [dbo].[user]';

    db.executeQuery(response, query);
});

// GET SINGLE API
router.get('/:user_id', (req: express.Request, response: express.Response) => {
    let id: number = parseInt(req.params.user_id);

    let query: string = `SELECT * FROM [dbo].[user] WHERE id = \'${id}\'`;

    db.executeQuery(response, query);
});

// POST API
router.post('', (req: express.Request, response: express.Response) => {
    let id: number = req.body.id;
    let name: string = req.body.name;
    let email: string = req.body.email;

    let query: string = `INSERT INTO [dbo].[user] (id, name, email) VALUES (\'${id}\', \'${name}\', \'${email}')`;
    db.executeQuery(response, query);
});

// PUT API
router.put('/:user_id', (req: express.Request, response: express.Response) => {
    let id: number = parseInt(req.params.user_id);
    let newEmail: string = req.body.email;

    let query: string = `UPDATE [dbo].[user] SET email = \'${newEmail}\' WHERE id = \'${id}\'`;

    db.executeQuery(response, query);
});

// DELETE API
router.delete('/:user_id', (req: express.Request, response: express.Response) => {
    let id: number = parseInt(req.params.user_id);

    let query: string = `DELETE from [dbo].[user] WHERE id = \'${id}\'`;

    db.executeQuery(response, query);
});

module.exports = router;
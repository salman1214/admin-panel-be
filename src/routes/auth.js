const router = require('express').Router();
const { rejister, login } = require('../services/auth-service');
const { sendErrorResp } = require('../utils/common-utils');

router.post('/register', async (req, res) => {
    rejister(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.post('/login', async (req, res) => {
    login(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

module.exports = router;

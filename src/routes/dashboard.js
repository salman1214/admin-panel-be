const router = require('express').Router();
const { getAnalytics } = require('../services/dashboard-service');
const { sendErrorResp } = require('../utils/common-utils');

router.get('/analytics', async (req, res) => {
    getAnalytics(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

module.exports = router;

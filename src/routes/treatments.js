const router = require('express').Router();
const { createTreatment, getAllTreatments, getTreatmentById, updateTreatment, deleteTreatment } = require('../services/treatment-service');
const { sendErrorResp } = require('../utils/common-utils');

router.post('/', async (req, res) => {
    createTreatment(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.get('/all', async (req, res) => {
    getAllTreatments(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.get('/:id', async (req, res) => {
    getTreatmentById(req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.patch('/:id', async (req, res) => {
    updateTreatment(req.params.id, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.delete('/:id', async (req, res) => {
    deleteTreatment(req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

module.exports = router;

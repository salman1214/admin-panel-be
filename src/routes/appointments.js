const router = require('express').Router();
const { createAppointment, getAllAppointments, updateAppointment, deleteAppointment, getAppointmentById } = require('../services/appointments-service');
const { sendErrorResp } = require('../utils/common-utils');

router.post('/', async (req, res) => {
    createAppointment(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.get('/all', async (req, res) => {
    getAllAppointments(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.get('/:id', async (req, res) => {
    getAppointmentById(req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.patch('/:id', async (req, res) => {
    updateAppointment(req.params.id, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.delete('/:id', async (req, res) => {
    deleteAppointment(req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

module.exports = router;

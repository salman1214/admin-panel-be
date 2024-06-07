const router = require('express').Router();
const { getAllUsers, getUserById, deleteUserById, updateUser, updatePatient, updateDoctor } = require('../services/users-service');

router.get('/all', async (req, res) => {
    getAllUsers()
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.get('/:id', async (req, res) => {
    getUserById(req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.patch('/:id', async (req, res) => {
    updateUser(req.params.id, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.patch('/doctor/:id', async (req, res) => {
    updateDoctor(req.params.id, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.patch('/patient/:id', async (req, res) => {
    updatePatient(req.params.id, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.delete('/:id', async (req, res) => {
    deleteUserById(req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

module.exports = router;
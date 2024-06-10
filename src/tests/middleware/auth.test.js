const jwt = require('jsonwebtoken');
const { isLoggedIn, isAdmin } = require('../../middleware/auth'); // Update the path as needed
const knex = require('../../db');

describe('Middleware Tests', () => {
    describe('isLoggedIn Middleware', () => {
        beforeAll(async () => {
            await knex.migrate.latest();
            await knex.seed.run();
        });

        let req, res, next;

        beforeEach(() => {
            req = { header: jest.fn().mockReturnValue('Bearer validtoken') };
            res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            next = jest.fn();
            process.env.TOKEN_SECRET = 'secret';
        });

        it('should call next() if token is valid', () => {
            jwt.verify = jest.fn().mockReturnValue({ userId: 1 });
            isLoggedIn(req, res, next);
            expect(jwt.verify).toHaveBeenCalledWith('validtoken', 'secret');
            expect(req.user).toEqual({ userId: 1 });
            expect(next).toHaveBeenCalled();
        });

        it('should return 401 if no token is provided', () => {
            req.header = jest.fn().mockReturnValue(undefined);
            isLoggedIn(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Access Denied');
        });

        it('should return 400 if token is invalid', () => {
            jwt.verify = jest.fn().mockImplementation(() => { throw new Error(); });
            isLoggedIn(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Invalid Token');
        });

        afterAll(async () => {
            await knex.destroy();
        });
    });

    describe('isAdmin Middleware', () => {
        let req, res, next;

        beforeEach(() => {
            req = { headers: { authorization: 'Bearer validadmintoken' } };
            res = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };
            next = jest.fn();
            process.env.TOKEN_SECRET = 'secret';
        });

        it('should call next() if user is admin', () => {
            jwt.verify = jest.fn().mockReturnValue({ userId: 1, roleId: 1 });
            isAdmin(req, res, next);
            expect(jwt.verify).toHaveBeenCalledWith('validadmintoken', 'secret');
            expect(req.jwt).toEqual({ userId: 1, roleId: 1 });
            expect(next).toHaveBeenCalled();
        });

        it('should return 403 if user is not admin', () => {
            jwt.verify = jest.fn().mockReturnValue({ userId: 1, roleId: 2 });
            isAdmin(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith('Only admin can access this route');
        });

        it('should return 409 if token is expired', () => {
            const error = new jwt.JsonWebTokenError('jwt expired');
            jwt.verify = jest.fn().mockImplementation(() => { throw error; });
            isAdmin(req, res, next);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith('Token Expired, Please Login again');
        });

        it('should return 500 if something goes wrong', () => {
            const error = new Error('Some other error');
            jwt.verify = jest.fn().mockImplementation(() => { throw error; });
            isAdmin(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith('Something went wrong');
        });

        afterAll(async () => {
            await knex.destroy();
        });
    });
});

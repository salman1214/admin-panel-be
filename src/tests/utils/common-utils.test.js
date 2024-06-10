const sendErrorResp = require('../../utils/common-utils').sendErrorResp;

describe('sendErrorResp', () => {
    let req, resp;

    beforeEach(() => {
        req = {};
        resp = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send error response with status and message if error has response', () => {
        const error = {
            response: {
                status: 404,
                data: {
                    message: 'Not Found',
                },
            },
        };

        sendErrorResp(error, req, resp);

        expect(resp.status).toHaveBeenCalledWith(404);
        expect(resp.send).toHaveBeenCalledWith({ message: 'Not Found', status: 404 });
    });

    it('should send error response with status and message if error has status and message', () => {
        const error = {
            status: 500,
            message: 'Internal Server Error',
        };

        sendErrorResp(error, req, resp);

        expect(resp.status).toHaveBeenCalledWith(500);
        expect(resp.send).toHaveBeenCalledWith({ status: 500, message: 'Internal Server Error' });
    });

    it('should send error response with status 500 and error message if error has message', () => {
        const error = {
            message: 'Some Error Occurred',
        };

        sendErrorResp(error, req, resp);

        expect(resp.status).toHaveBeenCalledWith(500);
        expect(resp.send).toHaveBeenCalledWith('Some Error Occurred');
    });

    it('should send error response with status and error object if error has status', () => {
        const error = {
            status: 400,
        };

        sendErrorResp(error, req, resp);

        expect(resp.status).toHaveBeenCalledWith(400);
        expect(resp.send).toHaveBeenCalledWith({
            message: 'Some Internal Server Error Occurred.',
            status: 400,
            error,
        });
    });
});
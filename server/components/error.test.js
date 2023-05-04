const { ErrorHandler, handleError } = require('./error');

describe('ErrorHandler', () => {
  it('should have status, statusCode, and message properties', () => {
    const error = new ErrorHandler(404, 'Not found');
    expect(error).toHaveProperty('status', 'error');
    expect(error).toHaveProperty('statusCode', 404);
    expect(error).toHaveProperty('message', 'Not found');
  });
});

describe('handleError', () => {
  it('should return an error response with status 500 and "An error occurred" message', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    handleError(new Error(), null, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      statusCode: 500,
      message: 'An error occurred',
    });
    expect(next).toHaveBeenCalled();
  });

  it('should return an error response with status and message properties from the thrown error', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    handleError(new ErrorHandler(404, 'Not found'), null, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      statusCode: 404,
      message: 'Not found',
    });
    expect(next).toHaveBeenCalled();
  });
});


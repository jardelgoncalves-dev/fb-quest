// import { describe, expect, it } from '@jest/globals';
import { errorResponse, successResponse } from '../response';

describe('Response unit test', () => {
  describe('when it is a successful response', () => {
    it('should return an object with the data and status property', () => {
      const data = { age: 1 };
      const response = successResponse(data, 200);
      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('status');
    });

    it('should return the same code and date informed in the function', () => {
      const data = { age: 1 };
      const response = successResponse(data, 201);
      expect(response.data).toEqual(data);
      expect(response.status).toEqual(201);
    });
  });

  describe('when it is a error response', () => {
    it('should return an object with the error property', () => {
      const data = { error: 'an error message' };
      const response = errorResponse(data, 400);
      expect(response.data).toHaveProperty('error');
      expect(response).toHaveProperty('status');
    });

    it('should return the same code and date informed in the function', () => {
      const data = { error: 'an error message' };
      const response = errorResponse(data, 400);
      expect(response.data).toEqual(data);
      expect(response.status).toEqual(400);
    });
  });
});

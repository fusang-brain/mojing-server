import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  constructor (message?: string) {
    super(message || 'Not Found', 404);
  }
};
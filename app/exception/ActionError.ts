import BaseError from './BaseError';

export default class ActionError extends BaseError {
  constructor (message) {
    super(message, 400);
  }
};


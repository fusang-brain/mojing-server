export default class BaseError extends Error {
  // status = 
  status: number = 200;
  errors: Array<any>;

  constructor (message, status = 200, errors?: Array<any>) {
    super(message);
    
    // this.status = status;
    this.status = status;
    this.errors = errors;
  }
};


class ErrorMessage extends Error {
  constructor(statusCode, message = "Something went wrong") {
    super(message);
    this.message = message;
    this.data = null;
    this.success = false;
    this.statusCode = statusCode;
  }
}

export {ErrorMessage};
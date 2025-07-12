class APIError extends Error {
  constructor(message, status, cause) {
    super(message);
    this.status = status;
    this.name = "APIError";
    this.cause = cause;

    // Ensures the stack trace is captured correctly
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }
}

export default APIError;

export class AppError extends Error {
    constructor(statusCode, message, errors) {
        super(message);

        this.statusCode = statusCode || 500;
        this.message = message || "Internal Server Error";

        if (Array.isArray(errors) && errors.length > 0) {
            this.errors = errors;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}
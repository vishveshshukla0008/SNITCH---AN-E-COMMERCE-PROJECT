export const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log(err.stack)
    let message = err.message || "Internal Server Error";
    if (err?.errors?.length) {
        const allErrors = err.errors.map((err) => err.msg);
        return res.status(statusCode).json({ success: false, message, errors: allErrors });
    }
    return res.status(statusCode).json({ success: false, message });
}
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: err.success ?? false,
    message: err.message || "Server Error",
    data: err.data ?? null
  });
};
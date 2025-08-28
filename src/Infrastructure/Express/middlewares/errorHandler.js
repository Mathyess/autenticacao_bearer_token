// src/Infrastructure/Express/middlewares/errorHandler.js
const errorHandler = async (err, req, res, next) => {
  console.error(err.stack); // Log do erro para depuração
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Em produção, evite enviar detalhes de erro internos
  });
};

module.exports = errorHandler;




// Middleware for error handling
const errorHandler = (err, req, res, next) => {
  console.error(err, req);
  res.redirect(`${KRATOS_URL}/self-service/login/browser`);
};

module.exports = errorHandler;

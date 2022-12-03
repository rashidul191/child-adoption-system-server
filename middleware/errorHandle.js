const errorHandle = (err, req, res, next) => {
  res.send(err.message);
};

module.exports = errorHandle;

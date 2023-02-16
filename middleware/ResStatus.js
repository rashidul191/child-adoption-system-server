module.exports.resStatusSuccess = (res, successText, resultData) => {
  res.status(200).json({
    status: "success",
    message: `Successfully ${successText}`,
    data: resultData,
  });
};

module.exports.resStatusError = (res, errorText, error) => {
  res.status(400).json({
    status: "fail",
    message: `couldn't ${errorText}`,
    error: error?.message,
  });
};

module.exports.resStatusErrorIf = (res, errorText) => {
  res.status(400).json({
    status: "fail",
    message: `couldn't ${errorText}`,
  });
};

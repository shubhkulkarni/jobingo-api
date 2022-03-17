exports.getCookieOptions = () => {
  return {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true
  };
};

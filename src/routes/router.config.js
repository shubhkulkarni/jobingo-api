const authRouter = require("./authRouter");

const router = [{ path: "/", router: authRouter }];

module.exports = router;

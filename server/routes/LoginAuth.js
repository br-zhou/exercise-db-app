const { registerUser, isValidCredentials } = require("./../utils/authenticate.js");
const { createToken, validateToken } = require("./../utils/webToken.js");

const createRoutes = (router) => {
    router.post("/login-auth", async(req, res) => {
        if (!req) return;
        const isValid = await isValidCredentials(req);
        const resData = { token: isValid && createToken(req.email, req.id) };
        res.status(isValid ? 200 : 403).send(resData);
      })
      

    router.post("/register", async (req, res) => {
        if (!req) return;

        const isValid = await registerUser(req);

        const resData = { token: isValid && createToken(req.email, req.id) };

        res.status(isValid ? 200 : 403).send(resData);
    });
}

module.exports = createRoutes;
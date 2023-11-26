const { registerUser, isValidCredentials } = require("./../utils/authenticate.js");
const { createToken, validateToken } = require("./../utils/webToken.js");

const createRoutes = (router) => {
    router.post("/login-auth", async(req, res) => {
        const inputData = validateLoginInput(req);
        if (!inputData) return;
        const isValid = await isValidCredentials(inputData);
        const resData = { token: isValid && createToken(inputData.email, inputData.id) };
        res.status(isValid ? 200 : 403).send(resData);
      })
      

    router.post("/register", async (req, res) => {
        const inputData = validateLoginInput(req);
        if (!inputData) return;

        const isValid = await registerUser(inputData);

        const resData = { token: isValid && createToken(inputData.email, inputData.id) };

        res.status(isValid ? 200 : 403).send(resData);
    });
}

module.exports = createRoutes;
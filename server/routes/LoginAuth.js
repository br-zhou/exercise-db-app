const { registerUser, isValidCredentials } = require("./../utils/authenticate.js");
const { createToken, validateToken } = require("./../utils/webToken.js");

const createRoutes = (router) => {
    router.post("/login-auth", async(req, res) => {
        if (!req) return;
        // console.log(req.body);
        const result = await isValidCredentials(req);

        // const resData = { token: result && createToken(req.email, req.id) };
        // res.status(result ? 200 : 403).send(resData);
        res.json({userid: result[0][0], name: result[0][1], email: result[0][2]});
      })
      

    router.post("/register", async (req, res) => {
        if (!req) return;

    });
}

module.exports = createRoutes;
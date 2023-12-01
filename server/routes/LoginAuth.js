const {
  registerUser,
  isValidCredentials,
} = require("./../utils/authenticate.js");
const { createToken, validateToken } = require("./../utils/webToken.js");
const userTable = require("./../tables/UsersTable");

const createRoutes = (router) => {
  router.post("/login-auth", async (req, res) => {
    if (!req) return;
    // console.log(req.body);
    const result = await isValidCredentials(req);
    if (result.length === 0) {
      res.send(false);
      return false;
    }
    // const resData = { token: result && createToken(req.email, req.id) };
    // res.status(result ? 200 : 403).send(resData);
    res.json({ userid: result[0][0], name: result[0][1], email: result[0][2] });
  });

  router.post("/register", async (req, res) => {
    const data = req.body;

    const invalidEmail = await userTable.fetchUser(data.email);
    if (invalidEmail.length != 0) {
      res.json({ error: "email already in use." });
      return;
    }

    const result = await userTable.insert(data.name, data.email, data.password);

    // !! HERE create other tables if paid user

    const userdata = await userTable.fetchUser(data.email);

    res.json({ name: data.name, email: data.email, userid: userdata[0][0] });
  });
};

module.exports = createRoutes;

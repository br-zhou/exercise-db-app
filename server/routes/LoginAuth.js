const UsersTable = require("./../tables/UsersTable");

const createRoutes = (router) => {
    router.post("/login-auth", async(req, res) => {
        // res.json(req);
        const username = req.body.username;
        const userExists = await UsersTable.fetchUser(username);
        if (userExists) {
            res.json({message: "User exists!"});
            return true;
        }
        else {
            res.json({message: "User does not exist!"})
            return false;
        }
      })
      
}

module.exports = createRoutes;
const userTable = require("./../tables/UsersTable");

const createRoutes = (router) => {
  router.get("/fuser-table", async (req, res) => {
    const tableContent = await userTable.fetch();
    res.json(tableContent);
  });
}

module.exports = createRoutes;
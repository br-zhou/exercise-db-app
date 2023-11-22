const userTable = require("./../tables/ProgressTable");

const createRoutes = (router) => {
  router.get("/preogress-table", async (req, res) => {
    const tableContent = await userTable.fetch();
    res.json(tableContent);
  });
}

module.exports = createRoutes;
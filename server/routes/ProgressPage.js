const userTable = require("./../tables/ProgressTable");

const createRoutes = (router) => {
  router.get("/progress-table", async (req, res) => {
    const tableContent = await userTable.fetchUserProgress(1);
    res.json(tableContent);
  });
}

module.exports = createRoutes;
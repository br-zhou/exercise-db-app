const exercisePlanTable = require("../tables/ExercisePlanTable");

const createRoutes = (router) => {
  router.get("/exerciseplan-table", async (req, res) => {
    const exContent = await exercisePlanTable.fetch();
    res.json(exContent);
  });
}

module.exports = createRoutes;
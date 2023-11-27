const exercisePlanTable = require("../tables/ExercisePlanTable");

const createRoutes = (router) => {
  router.get("/exerciseplan-table", async (req, res) => {
    const exContent = await exercisePlanTable.fetchUserPlans(req.body.userid);
    res.json(exContent);
  });
}

module.exports = createRoutes;
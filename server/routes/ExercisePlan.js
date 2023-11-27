const exercisePlanTable = require("../tables/ExercisePlanTable");
const planIncludes = require("./../tables/PlanIncludes");
const createRoutes = (router) => {
  router.post("/exerciseplan-table", async (req, res) => {
    const epid_list = await exercisePlanTable.fetchUserPlans(req.body.token.userid);
    console.log(epid_list)
    res.json(epid_list);
  });
}

module.exports = createRoutes;
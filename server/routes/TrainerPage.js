const userTable = require("./../tables/UsersTable");
const exercisePlanTable = require("./../tables/ExercisePlanTable");

const createRoutes = (router) => {
  router.get("/fuser-table", async (req, res) => {
    const tableContent = await userTable.fetch();
    res.json(tableContent);
  });

  router.post("/view", async (req, res) => {
    const tableContent = await exercisePlanTable.fetchUserPlans(1);
    res.json(tableContent);
  });
}

module.exports = createRoutes;
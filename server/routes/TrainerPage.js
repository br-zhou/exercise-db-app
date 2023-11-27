const userTable = require("./../tables/UsersTable");
const exercisePlanTable = require("./../tables/ExercisePlanTable");
const { withOracleDB } = require("./../utils/envUtil");

const createRoutes = (router) => {
  router.get("/fuser-table", async (req, res) => {
    const tableContent = await userTable.fetch();
    res.json(tableContent);
  });

  router.post("/get-clients", async (req, res) => {
    const arg = req.body;

    const tableContent = await userTable.fetchUsersWithTrainer(arg.tid);

    console.log(tableContent);

    res.json(tableContent || {sorry: "error"});
  });

  router.post("/view", async (req, res) => {
    const arg = req.body;
    
    console.log("view", arg);

    const tableContent = await exercisePlanTable.fetchUserPlans(1);
    res.json(tableContent);
  });
}

module.exports = createRoutes;
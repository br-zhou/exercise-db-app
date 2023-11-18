const exerciseTable = require("./../tables/ExerciseTable");

const createRoutes = (router) => {
  router.get("/exercise-table", async (req, res) => {
    const tableContent = await exerciseTable.fetch();
    res.json(tableContent);
  });
}

module.exports = createRoutes;
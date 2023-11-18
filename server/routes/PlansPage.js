const ExerciseTable = require("./../tables/ExerciseTable");

const createRoutes = (router) => {
  router.get("/exercise-table", async (req, res) => {
    const tableContent = await ExerciseTable.fetch();
    res.json(tableContent);
  });
}

module.exports = createRoutes;
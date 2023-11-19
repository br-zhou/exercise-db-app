const exerciseTable = require("./../tables/ExerciseTable");
const nutritionTable = require("./../tables/NutritionTable");

const createRoutes = (router) => {
  router.get("/nutrition-table", async (req, res) => {
    const nutriContent = await nutritionTable.fetch();
  })
  router.get("/exercise-table", async (req, res) => {
    const exContent = await exerciseTable.fetch();
    res.json(exContent);
  });
}

module.exports = createRoutes;
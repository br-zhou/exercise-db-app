const nutritionTable = require("./../tables/NutritionTable");

const createRoutes = (router) => {
    router.get("/nutrition-table", async (req, res) => {
        const nutriContent = await nutritionTable.fetchUserNutrition(4);
        res.json(nutriContent);
    })
}

module.exports = createRoutes;
const nutritionTable = require("./../tables/NutritionTable");

const createRoutes = (router) => {
    router.post("/nutrition-table", async (req, res) => {
        console.log(req.body.token.userid)
        const nutriContent = await nutritionTable.fetchUserNutrition(req.body.token.userid);
        res.json(nutriContent);
    })
}

module.exports = createRoutes;
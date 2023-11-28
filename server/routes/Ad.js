const adTable = require("./../tables/AdTable");

const createRoutes = (router) => {
  router.post("/get-ad", async (req, res) => {
    const userid = req.body.userid;
    const result = await adTable.fetch(userid);
    if (result.length > 0) {
      res.json(result[0]);
      // todo: add ad to table
    } else {
      res.json(false);
    }
  });
};

module.exports = createRoutes;

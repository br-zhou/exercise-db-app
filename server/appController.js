const express = require("express");
const appService = require("./appService");
const createTrainerRoutes = require("./routes/TrainerPage");
const createPlansRoutes = require("./routes/PlansPage");
const createNutritionRoutes = require("./routes/Nutrition");
const router = express.Router();

// !! CUSTOM ROUTES
createTrainerRoutes(router);
createPlansRoutes(router);
createNutritionRoutes(router);
// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get("/check-db-connection", async (req, res) => {
  const isConnect = await appService.testOracleConnection();
  if (isConnect) {
    res.send("connected");
  } else {
    res.send("unable to connect");
  }
});

router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchDemotableFromDb();
  res.json({ data: tableContent });
});

router.get("/count-demotable", async (req, res) => {
  const tableCount = await appService.countDemotable();
  if (tableCount >= 0) {
    res.json({
      success: true,
      count: tableCount,
    });
  } else {
    res.status(500).json({
      success: false,
      count: tableCount,
    });
  }
});

// ### CUSTOM API ROUTES

router.post("/initalize-tables", async (req, res) => {
  const initiateResult = await appService.initalizeAllTables();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post("/drop-all-tables", async (req, res) => {
  const initiateResult = await appService.dropAllTables();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
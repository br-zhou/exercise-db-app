const FUserTable = require("./tables/UsersTable");
const PaidUser1Table = require("./tables/PaidUser1Table");
const PaidUser2Table = require("./tables/PaidUser2Table");
const ExerciseTable = require("./tables/ExerciseTable");
const TrainerTable = require("./tables/TrainerTable");
const NutritionTable = require("./tables/NutritionTable");
const ContentTable = require("./tables/ContentTable");
const NotificationsTable = require("./tables/NotificationsTable");
const ProgressTable = require("./tables/ProgressTable");
const AdTable = require("./tables/AdTable");
const GoalsTable = require("./tables/GoalsTable");
const GoalReports = require("./tables/GoalReports");
const ExercisePlan = require("./tables/ExercisePlanTable");
const PlanIncludes = require("./tables/PlanIncludes");
const { withOracleDB } = require("./utils/envUtil");

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
  return await withOracleDB(async (connection) => {
    return true;
  }).catch(() => {
    return false;
  });
}

async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM PaidUser1");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM Content");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}


async function initalizeAllTables() {
  try {
    
    await TrainerTable.intializeTable();
    await TrainerTable.loadDummyData();
    console.log("trainer Table added!");

    await FUserTable.intializeTable();
    await FUserTable.loadDummyData();
    console.log("fuser Table added!");

    await PaidUser2Table.intializeTable();
    await PaidUser2Table.loadDummyData();
    console.log("paiduser2 Table added!");

    await PaidUser1Table.intializeTable();
    const FUserKeys = await FUserTable.fetchKeys();
    const Tids = await TrainerTable.fetchTids();
    PaidUser1Table.loadDummyData(FUserKeys, Tids);
    console.log("paiduser1 Table added!");

    await ExerciseTable.intializeTable();
    await ExerciseTable.loadDummyData();
    console.log("exercise Table added!");

    // await NutritionTable.intializeTable();
    // await NutritionTable.loadDummyData();
    // console.log("nutrition Table added!");
    
    await GoalsTable.intializeTable();
    await GoalsTable.loadDummyData();
    console.log("goals Table added!");

    // await AdTable.intializeTable();
    // await AdTable.loadDummyData();
    // console.log("ad Table added!");

    // await ContentTable.intializeTable();
    // await ContentTable.loadDummyData();
    // console.log("content Table added!");

    // await NotificationsTable.intializeTable();
    // await NotificationsTable.loadDummyData();
    // console.log("notifications Table added!");

    await ExercisePlan.intializeTable();
    await ExercisePlan.loadDummyData();
    console.log("experciseplan Table added!");

    // await PlanIncludes.intializeTable();
    // await PlanIncludes.loadDummyData();
    // console.log("planincludes Table added!");


    await ProgressTable.intializeTable();
    await ProgressTable.loadDummyData();
    console.log("progress Table added!");

    await GoalReports.intializeTable();
    await GoalReports.loadDummyData();
    console.log("goalsreports Table added!");
    
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function dropAllTables() {
  try {


    await PaidUser1Table.dropTable();
    await PaidUser2Table.dropTable();

    await ProgressTable.dropTable();
    await NotificationsTable.dropTable();
    await NutritionTable.dropTable();
    await ExerciseTable.dropTable();
    await GoalsTable.dropTable();
    await GoalReports.dropTable();
    await ExercisePlan.dropTable();
    await PlanIncludes.dropTable();
    await ContentTable.dropTable();


    await FUserTable.dropTable();
    await TrainerTable.dropTable();
    return true;
  } catch (e) {
    console.log("Couldnt drop tables");
    return false;
  }
}

module.exports = {
  testOracleConnection,
  fetchDemotableFromDb,
  countDemotable,
  initalizeAllTables,
  dropAllTables,
};

const FUserTable = require("./tables/UsersTable");
const PaidUser1Table = require("./tables/PaidUser1Table");
const PaidUser2Table = require("./tables/PaidUser2Table");
const ExerciseTable = require("./tables/ExerciseTable");
const NutritionTable = require("./tables/NutritionTable");
const ContentTable = require("./tables/ContentTable");
const NotificationsTable = require("./tables/NotificationsTable");
const GoalsTable = require("./tables/GoalsTable");
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
    const result = await connection.execute("SELECT * FROM Goals");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM Goals");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function initalizeAllTables() {
  try {
    await FUserTable.intializeTable();
    await FUserTable.loadDummyData();

    await ExerciseTable.intializeTable();
    await ExerciseTable.loadDummyData();

    await NutritionTable.intializeTable();
    await NutritionTable.loadDummyData();

    await PaidUser2Table.intializeTable();
    await PaidUser2Table.loadDummyData();

    await ContentTable.intializeTable();
    await ContentTable.loadDummyData();

    await GoalsTable.intializeTable();
    await GoalsTable.loadDummyData();

    await NotificationsTable.intializeTable();
    await NotificationsTable.loadDummyData();

    await PaidUser1Table.intializeTable();
    const FUserKeys = await FUserTable.fetchKeys();
    PaidUser1Table.loadDummyData(FUserKeys);
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
    
    await FUserTable.dropTable();
    await NutritionTable.dropTable();
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
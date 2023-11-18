const FUserTable = require("./tables/UsersTable");
const PaidUser1Table = require("./tables/PaidUser1Table");
const PaidUser2Table = require("./tables/PaidUser2Table");
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
    const result = await connection.execute("SELECT Count(*) FROM FUser");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function initalizeAllTables() {
  try {
    await FUserTable.intializeTable();
    await FUserTable.loadDummyData();

    await PaidUser2Table.intializeTable();
    PaidUser2Table.loadDummyData();

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
    return true;
  } catch (e) {
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

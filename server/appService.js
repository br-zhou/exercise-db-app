const {initializeTable: initializeFUserTable} = require("./tables/UsersTable");
const {initializeTable: initializeExerciseTable} = require("./tables/ExerciseTable");
const {withOracleDB} = require('./utils/envUtil');

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
        var result = await connection.execute('SELECT * FROM Exercise');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE Exercise`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
        CREATE SEQUENCE ExerciseSeq START WITH 1 INCREMENT BY 1;
        CREATE TABLE Exercise(
            eid INTEGER,
            name VARCHAR(50),
            type VARCHAR(50),
            PRIMARY KEY (eid),
        );
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Exercise (eid, name, type) VALUES (ExerciseSeq.NEXTVAL, :name, :type)`,
            [name, type],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Exercise SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM Exercise');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM Exercise');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function initalizeAllTables() {
    // return await initializeFUserTable();
    return await initializeExerciseTable();
}


module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable, 
    insertDemotable, 
    updateNameDemotable, 
    countDemotable,
    initalizeAllTables
};
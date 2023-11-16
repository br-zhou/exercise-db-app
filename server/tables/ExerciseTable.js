const {withOracleDB} = require('./../utils/envUtil');

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
        await connection.execute(`DROP TABLE FUser`);
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

    await loadDummyData();

    return true;
}).catch(() => {
    return false;
});
}

const loadDummyData = async () => {
    await insert("Barbell Front Squat", "Resistance/Conditioning");
    await insert("Barbell Back Squat", "Resistance/Conditioning");
    await insert("Running", "Cardio");
    await insert("Swimming", "Cardio");
    await insert("Grappling", "Martial Arts");
    await insert("Suicides", "Cardio");
}

async function insert(name, type) {
    const eid = Date.now();
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

async function fetch() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Exercise');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch
}
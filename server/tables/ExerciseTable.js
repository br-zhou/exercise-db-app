const {withOracleDB} = require('./../utils/envUtil');

const dropTable = async () => {
    return await withOracleDB(async (connection) => {
      try{
        await connection.execute(`DROP SEQUENCE eid_sequence`);
      } catch (e) {}
      try {
        await connection.execute(`DROP TRIGGER exercise_insert_trigger`);
      } catch (e) {}
      try {
        await connection.execute(`DROP TABLE Exercise`);
      } catch (e) {}
      
      return true;
    }).catch(() => {
      return false;
    });
  };

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
        await connection.execute(`DROP TABLE Exercise`);
    } 
    catch(err) {
        console.log('Table Exercise might not exist, proceeding to create...');
    }

    const result = await connection.execute(`
        CREATE TABLE Exercise(
            eid INTEGER,
            name VARCHAR(50),
            type VARCHAR(50),
            PRIMARY KEY (eid),
        );
    `);

    
    const sequence = await connection.execute(`
        CREATE SEQUENCE eid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER exercise_insert_trigger
        BEFORE INSERT
        ON Exercise
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT eid_sequence.nextval INTO :NEW.eid FROM dual;
        END;
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
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Exercise (name, type) VALUES (:name, :type)`,
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

async function fetchKeys() {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute("SELECT (eid) FROM Exercise");
      return result.rows;
    }).catch(() => {
      return [];
    });
  }

module.exports = {
  intializeTable,
  dropTable,
  fetch,
  fetchKeys,
  loadDummyData,
  fetch
}
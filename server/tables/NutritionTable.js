const {withOracleDB} = require('./../utils/envUtil');

const dropTable = async () => {
    return await withOracleDB(async (connection) => {
      try{
        await connection.execute(`DROP SEQUENCE nid_sequence`);
      } catch (e) {console.log('DB reset')}
      try {
        await connection.execute(`DROP TRIGGER nutrition_insert_trigger`);
      } catch (e) {}
      try {
        await connection.execute(`DROP TABLE Nutrition`);
      } catch (e) {}
      
      return true;
    }).catch(() => {
      return false;
    });
  };

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    try {
        const result = await connection.execute(`
        CREATE TABLE Nutrition(
            nid INTEGER,
            carbs INTEGER,
            fats INTEGER,
            protein INTEGER,
            PRIMARY KEY (nid)
        )
    `);
    } catch (e) {
        console.log('Couldnt create table');
    }

    
    try {
        const sequence = await connection.execute(`
        CREATE SEQUENCE nid_sequence
            START WITH 1
            INCREMENT BY 1
    `);
    } catch(e) {
        console.log('Couldnt create sequence');
    }

    try {
        const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER nutrition_insert_trigger
        BEFORE INSERT
        ON Nutrition
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT nid_sequence.nextval INTO :NEW.nid FROM dual;
        END;
    `);
    } catch (e) {
        console.log("Couldnt create trigger");
    }


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

async function insert(name, carbs, fats, protein) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Nutrition (name, carbs, fats, protein) VALUES (:name, :carbs, :fats, :protein)`,
            [name, carbs, fats, protein],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function fetch() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Nutrition');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchKeys() {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute("SELECT (nid) FROM Nutrition");
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
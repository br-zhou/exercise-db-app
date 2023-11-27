const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try{
      await connection.execute(`DROP SEQUENCE gid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER goals_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE Goals`);
    } catch (e) {}
    
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    
    const result = await connection.execute(`
        CREATE TABLE Goals(
            gid INTEGER,
            category VARCHAR(50),
            weight INTEGER,
            din VARCHAR(100),
            userid INTEGER,
            PRIMARY KEY (gid),
            FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
            
        )
    `);

 
    const sequence = await connection.execute(`
        CREATE SEQUENCE gid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER goals_insert_trigger
        BEFORE INSERT
        ON Goals
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT gid_sequence.nextval INTO :NEW.gid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};



const loadDummyData = async () => {
  try {
    await insert('Weight Loss', 100, '2023-dec-31', 1);
    await insert('Fitness', 45, '2023-1-21', 2);
    await insert('Weight Loss', 80, '2023-2-2', 3);
    await insert('Muscle Gain', 50, '2023-3-18', 4);
    await insert('Endurance', 66, '2023-4-3', 5);
    await insert('Maintain Weight', 60, '2023-5-28', 6);
    await insert('Toning', 65, '2023-6-20', 7);
    await insert('Agility', 49, '2023-1-11', 8);
    await insert('Bodybuilding', 70, '2023-2-21', 9);
    await insert('Posture Improvement', 58, '2023-3-30', 10);
    await insert('CrossFit', 78, '2023-4-12', 11);
    await insert('Balance Training', 67, '2023-5-25', 12);
    await insert('Rehabilitation', 85, '2023-6-13', 13);
    await insert('Speed Training', 56, '2023-1-3', 14);
    await insert('Functional Fitness', 63, '2023-2-15', 15);
    await insert('Powerlifting', 82, '2023-5-17', 16);
    await insert('Circuit Training', 68, '2023-4-21', 17);  
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};


async function insert(category, weight, din, userid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Goals (category, weight, din, userid) VALUES (:category, :weight, :din, :userid)`,
      [category, weight, din, userid],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Goals");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (gid) FROM Goals");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch,
  fetchKeys,
  dropTable,
};




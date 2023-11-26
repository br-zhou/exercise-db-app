const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE epid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER explan_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE ExercisePlan`);
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
        CREATE TABLE ExercisePlan(
            epid INTEGER,
            plantype VARCHAR(50),
            tid INTEGER,
            userid INTEGER,
            PRIMARY KEY (epid),
            FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE,
            FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE CASCADE
        )
      `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE epid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
      CREATE OR REPLACE TRIGGER explan_insert_trigger
      BEFORE INSERT
      ON ExercisePlan
      REFERENCING NEW AS NEW
      FOR EACH ROW
      BEGIN
      SELECT epid_sequence.nextval INTO :NEW.epid FROM dual;
      END;
      `);

    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  await insert("Exercise 1: Cardio", 1, 1);
  await insert("Exercise 2: Pilates", 2, 2);
  await insert("Exercise 3: Yoga", 3, 3);
  await insert("Exercise 4: HIIT", 4, 4);
  await insert("Exercise 5: Cycling", 5, 5);
  await insert("Exercise 6: Strength training", 6, 6);
  await insert("Exercise 7: Swimming", 7, 7);
  await insert("Exercise 8: CrossFit", 8, 8);
  await insert("Exercise 9: Yoga", 9, 9);
  await insert("Exercise 10: Cardio", 10, 10);
  await insert("Exercise 11: Pilates", 11, 11);
  await insert("Exercise 12: Strength training", 12, 12);
  await insert("Exercise 13: HIIT", 13, 13);
  await insert("Exercise 14: CrossFit", 14, 14);
  await insert("Exercise 15: Yoga", 15, 15);
  await insert("Exercise 16: Swimming", 16, 16);
  await insert("Exercise 17: Cardio", 17, 17);
  await insert("Exercise 18: Cycling", 18, 18);
  await insert("Exercise 19: Pilates", 19, 19);
  await insert("Exercise 20: Strength training", 20, 20);
};

async function insert(plantype, tid, userid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO ExercisePlan (plantype, tid, userid) VALUES (:plantype, :tid, :userid)`,
      [plantype, tid, userid],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM ExercisePlan");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchUserPlans(userid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT epid, plantype FROM ExercisePlan WHERE userid=${userid}`
    );
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (epid) FROM ExercisePlan");
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
  fetch,
  fetchUserPlans,
};

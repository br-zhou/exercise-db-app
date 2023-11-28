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
      await connection.execute(`ALTER TABLE ExercisePlan DROP CONSTRAINT userid`);
      await connection.execute(`ALTER TABLE ExercisePlan DROP CONSTRAINT tid`);
      await connection.execute(`DROP TABLE ExercisePlan`);
      console.log('ExercisePlan Table dropped.')
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

const loadDummyData = async (maxTrainers) => {
  await insert("Exercise Plan 1: Cardio", (1 % maxTrainers) + 1, 1);
  await insert("Exercise Plan 2: Pilates", (2 % maxTrainers) + 1, 2);
  await insert("Exercise Plan 3: Yoga", (3 % maxTrainers) + 1, 3);
  await insert("Exercise Plan 4: HIIT", (4 % maxTrainers) + 1, 4);
  await insert("Exercise Plan 5: Cycling", (5 % maxTrainers) + 1, 5);
  await insert("Exercise Plan 6: Strength training", (6 % maxTrainers) + 1, 6);
  await insert("Exercise Plan 7: Swimming", (7 % maxTrainers) + 1, 7);
  await insert("Exercise Plan 8: CrossFit", (8 % maxTrainers) + 1, 8);
  await insert("Exercise Plan 9: Yoga", (9 % maxTrainers) + 1, 9);
  await insert("Exercise Plan 10: Cardio", (10 % maxTrainers) + 1, 10);
  await insert("Exercise Plan 11: Pilates", (11 % maxTrainers) + 1, 11);
  await insert(
    "Exercise Plan 12: Strength training",
    (12 % maxTrainers) + 1,
    12
  );
  await insert("Exercise Plan 13: HIIT", (13 % maxTrainers) + 1, 13);
  await insert("Exercise Plan 14: CrossFit", (14 % maxTrainers) + 1, 14);
  await insert("Exercise Plan 15: Yoga", (15 % maxTrainers) + 1, 15);
  await insert("Exercise Plan 16: Swimming", (16 % maxTrainers) + 1, 16);
  await insert("Exercise Plan 17: Cardio", (17 % maxTrainers) + 1, 17);
  await insert("Exercise Plan 18: Cycling", (18 % maxTrainers) + 1, 18);
  await insert("Exercise Plan 19: Pilates", (19 % maxTrainers) + 1, 19);
  await insert(
    "Exercise Plan 20: Strength training",
    (20 % maxTrainers) + 1,
    20
  );

  await insert("Cardio", 2, 2);
  await insert("Pilates", 3, 3);
  await insert("Yoga", 4, 4);
  await insert("HIIT", 5, 5);
  await insert("Cycling", 1, 1);
  await insert("Strength training", 2, 2);
  await insert("Swimming", 3, 3);
  await insert("CrossFit", 4, 4);
  await insert("Yoga", 5, 5);
  await insert("Cardio (Extreme Edition)", 1, 1);
  await insert("Pilates", 2, 2);
  await insert("Strength training", 3, 3);
  await insert("HIIT", 4, 4);
  await insert("CrossFit", 5, 5);
  await insert("Yoga", 1, 1);
  await insert("Swimming", 2, 2);
  await insert("Cardio", 3, 3);
  await insert("Cycling", 4, 4);
  await insert("Pilates", 5, 5);
  await insert("Strength training", 1, 1);
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

async function updatePlanType(epid, newPlanType) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE ExercisePlan SET plantype = :plantype WHERE epid = :epid`,
      [newPlanType, epid],
      { autoCommit: true }
    );

    return true;
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

async function removeUsingId(epid) {
  return await withOracleDB(async (connection) => {
    await connection.execute(
      `DELETE FROM ExercisePlan WHERE epid=:epid`,
      [epid],
      { autoCommit: true }
    );
    return true;
  }).catch(() => {
    return false;
  });
}

async function getPlanName(userid) {
<<<<<<< HEAD
=======
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT epid, plantype FROM ExercisePlan WHERE userid=${userid}`
    );
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function getPlanName(epid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT plantype FROM ExercisePlan WHERE epid=${epid}`
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

async function fetchUserPlans(userid) {
>>>>>>> 4e03e7bbfe0be3b4ed8d64f63b0ed79490873cb6
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT epid, plantype FROM ExercisePlan WHERE userid=${userid}`
    );
    return result.rows;
  }).catch(() => {
    return [];
  });
}

<<<<<<< HEAD
async function getPlanName(epid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT plantype FROM ExercisePlan WHERE epid=${epid}`
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

=======
>>>>>>> 4e03e7bbfe0be3b4ed8d64f63b0ed79490873cb6
module.exports = {
  intializeTable,
  dropTable,
  fetch,
  fetchKeys,
  loadDummyData,
  insert,
  getPlanName,
  removeUsingId,
  fetchUserPlans,
  updatePlanType,
};

const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try{
      await connection.execute(`DROP SEQUENCE pid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER progress_insert_trigger`);
    } catch (e) {}
      await connection.execute(`DROP TABLE ProgressReport`);
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE ProgressReport(
            pid INTEGER,
            Satisfaction VARCHAR(20),
            reportDate INTEGER,
            userid INTEGER,
            PRIMARY KEY (pid),
            FOREIGN KEY (userid) REFERENCES FUser(userid)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE pid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER progress_insert_trigger
        BEFORE INSERT
        ON ProgressReport
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT pid_sequence.nextval INTO :NEW.pid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert("Successful", 1);
    await insert("Moderately Happy", 2);
    await insert("Ok", 3);
    await insert("Perfect", 4);
    await insert("No Progress", 5);
    await insert("Regression", 6);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(satisfaction, userid) {
  const date = Date.now();
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO ProgressReport (satisfaction, reportDate, userid) VALUES (:satisfaction, :reportDate, :userid)`,
      [satisfaction, date, userid],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM ProgressReport");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (pid) FROM ProgressReport");
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

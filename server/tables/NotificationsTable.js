const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try{
      await connection.execute(`DROP SEQUENCE rid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER notifications_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE Notifications`);
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
        CREATE TABLE Notifications(
            rid INTEGER,
            userid INTEGER,
            msg VARCHAR(150),
            PRIMARY KEY (rid, userid),
            FOREIGN KEY (userid) REFERENCES FUser(userid)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE rid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER notifications_insert_trigger
        BEFORE INSERT
        ON Notifications
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT rid_sequence.nextval INTO :NEW.rid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert(1, "Celebrate victories. Every step is a step toward health!");
    await insert(2, "Sunshine boosts mood. Get outside for fresh air.");
    await insert(3, "Listen to your body. Rest when feeling fatigued.");
    await insert(4, "Laugh often! Laughter has health benefits.");
    await insert(5, "Prioritize self-care. Take time to recharge daily.");
    await insert(6, "Build support. Workout buddies keep you accountable.");
    await insert(7, "Stay consistent. Small habits lead to big results.");
    await insert(8, "Hydrate with herbal teas for added flavor and benefits.");
    await insert(9, "Quality sleep fuels recovery. Aim for 7-9 hours nightly.");
    await insert(10, "Posture matters. Sit up straight, stand tall, support your spine.");
    await insert(11, "New goals, new challenges. Push your limits, see progress.");
    await insert(12, "Outdoor workouts boost mood. Find joy in movement.");
    await insert(13, "Cardio and strength for diversity. Keep workouts effective.");
    await insert(14, "Stay hydrated with infused water. Delicious and healthy.");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(userid, msg) {
  const id = Date.now();
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Notifications (userid, msg) VALUES (:userid, :msg)`,
      [userid, msg],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Notifications");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (rid) FROM Notifications");
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

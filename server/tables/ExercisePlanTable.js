const {withOracleDB} = require("./../utils/envUtil");

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
    }).catch(() => {return false;});
};


const intializeTable = async () => {
    return await withOracleDB(async (connection) => {
      await dropTable();
  
      const result = await connection.execute(`
        CREATE TABLE ExercisePlan(
            epid INTEGER,
            plantype VARCHAR(50),
            tid INTEGER,
            uid INTEGER,
            PRIMARY KEY (epid),
            FOREIGN KEY (uid) REFERENCES FUser(uid) ON DELETE CASCADE,
            FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE SET NULL
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
  }
  
  const loadDummyData = async () => {
      await insert("Barbell Front Squat", "Resistance/Conditioning");
      await insert("Barbell Back Squat", "Resistance/Conditioning");
      await insert("Running", "Cardio");
      await insert("Swimming", "Cardio");
      await insert("Grappling", "Martial Arts");
      await insert("Suicides", "Cardio");
  }
  
  async function insert(plantype, tid, uid) {
      return await withOracleDB(async (connection) => {
          const result = await connection.execute(
              `INSERT INTO Exercise (plantype, tid, uid) VALUES (:name, :plantype, :tid, :uid)`,
              [plantype, tid, uid],
              { autoCommit: true }
          );
  
          return result.rowsAffected && result.rowsAffected > 0;
      }).catch(() => {
          return false;
      });
  }
  
  async function fetch() {
      return await withOracleDB(async (connection) => {
          const result = await connection.execute('SELECT * FROM ExercisePlan');
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
    fetch
  }
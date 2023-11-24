const {withOracleDB} = require("./../utils/envUtil");

const dropTable = async () => {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE PlanIncludes`);
            return true; 
        } catch(e) {}
    }).catch(() => {return false;});
};


const intializeTable = async () => {
    return await withOracleDB(async (connection) => {
      await dropTable();
  
      const result = await connection.execute(`
        CREATE TABLE PlanIncludes(
            epid INTEGER,
            eid INTEGER,
            PRIMARY KEY(epid, eid),
            FOREIGN KEY(epid) REFERENCES ExercisePlan(epid) ON DELETE CASCADE,
            FOREIGN KEY(eid) REFERENCES Exercise(eid) ON DELETE CASCADE
        )
      `);
      return true;
  }).catch(() => {
      return false;
  });
  }
  
  const loadDummyData = async () => {
      await insert(1,1);
      await insert(1,2);
      await insert(1,3);
      await insert(2,1);
      await insert(2,3);
      await insert(3,2);

  }
  
  async function insert(epid, eid) {
      return await withOracleDB(async (connection) => {
          const result = await connection.execute(
              `INSERT INTO Exercise (epid, eid) VALUES (:epid, :eid)`,
              [epid, eid, ],
              { autoCommit: true }
          );
  
          return result.rowsAffected && result.rowsAffected > 0;
      }).catch(() => {
          return false;
      });
  }
  
  async function fetch() {
      return await withOracleDB(async (connection) => {
          const result = await connection.execute('SELECT * FROM Includes');
          return result.rows;
      }).catch(() => {
          return [];
      });
  }
  
  async function fetchKeys() {
      return await withOracleDB(async (connection) => {
        const result = await connection.execute("SELECT (epid) FROM Includes");
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
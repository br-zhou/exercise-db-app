const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try{
      await connection.execute(`DROP SEQUENCE cid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER content_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE Content`);
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
        CREATE TABLE Content(
            cid INTEGER,
            url VARCHAR(100),
            author VARCHAR(50),
            PRIMARY KEY (cid)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE cid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER content_insert_trigger
        BEFORE INSERT
        ON Content
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT cid_sequence.nextval INTO :NEW.cid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert("Ahmed Khan", "https://www.youtube.com");
    await insert("Maria Rodriguez", "https://www.youtube.com");
    await insert("Yuki Takahashi", "https://www.youtube.com");
    await insert("Carlos Silva", "https://www.youtube.com");
    await insert("Priya Patel", "https://www.youtube.com");
    await insert("Miguel Rodriguez", "https://www.youtube.com");
    await insert("Ananya Gupta", "https://www.youtube.com");
    await insert("Kenji Suzuki", "https://www.youtube.com");
    await insert("Fatima Al-Mansoori", "https://www.youtube.com");
    await insert("Darnell Washington", "https://www.youtube.com");
    await insert("Aisha Nkosi", "https://www.youtube.com");
    await insert("Ravi Menon", "https://www.youtube.com");
    await insert("Sofia Morales", "https://www.youtube.com");
    await insert("Khaled Abadi", "https://www.youtube.com");
    await insert("Aaliyah Rahman", "https://www.youtube.com");
    await insert("Juan Carlos Hernandez", "https://www.youtube.com");
    await insert("Zara Ali", "https://www.youtube.com");
    await insert("Javier Castillo", "https://www.youtube.com");
    await insert("Naomi Okafor", "https://www.youtube.com");
    await insert("Elijah Thompson", "https://www.youtube.com");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(url, author) {
  const id = Date.now();
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Content (url, author) VALUES (:url, :author)`,
      [url, author],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Content");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (cid) FROM Content");
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

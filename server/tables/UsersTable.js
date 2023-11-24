const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE uid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER fuser_insert_trigger`);
   } catch (e) {} 
    await connection.execute(`DROP TABLE FUser`);
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE FUser(
            userid INTEGER,
            name VARCHAR(50),
            email VARCHAR(50),
            PRIMARY KEY (userid),
            CONSTRAINT email_unique UNIQUE (email)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE uid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER fuser_insert_trigger
        BEFORE INSERT
        ON FUser
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT uid_sequence.nextval INTO :NEW.userid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert("Ahmed Khan", "ahmed.khan@gmail.com");
    await insert("Maria Rodriguez", "maria.rodriguez@hotmail.com");
    await insert("Yuki Takahashi", "yuki.takahashi@gmail.com");
    await insert("Carlos Silva", "carlos.silva@outlook.com");
    await insert("Priya Patel", "priya.patel@hotmail.com");
    await insert("Miguel Rodriguez", "miguel.rodriguez@gmail.com");
    await insert("Ananya Gupta", "ananya.gupta@outlook.com");
    await insert("Kenji Suzuki", "kenji.suzuki@hotmail.com");
    await insert("Fatima Al-Mansoori", "fatima.almansoori@gmail.com");
    await insert("Darnell Washington", "darnell.washington@outlook.com");
    await insert("Aisha Nkosi", "aisha.nkosi@hotmail.com");
    await insert("Ravi Menon", "ravi.menon@gmail.com");
    await insert("Sofia Morales", "sofia.morales@outlook.com");
    await insert("Khaled Abadi", "khaled.abadi@hotmail.com");
    await insert("Aaliyah Rahman", "aaliyah.rahman@gmail.com");
    await insert("Juan Carlos Hernandez", "juan.hernandez@outlook.com");
    await insert("Zara Ali", "zara.ali@hotmail.com");
    await insert("Javier Castillo", "javier.castillo@gmail.com");
    await insert("Naomi Okafor", "naomi.okafor@outlook.com");
    await insert("Elijah Thompson", "elijah.thompson@gmail.com");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(name, email) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO FUser (name, email) VALUES (:name, :email)`,
      [name, email],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM FUser");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (userid) FROM FUser");
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

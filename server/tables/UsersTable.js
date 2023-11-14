const {withOracleDB} = require('./../utils/envUtil');

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
        await connection.execute(`DROP TABLE FUser`);
    } catch(err) {
        console.log('Table might not exist, proceeding to create...');
    }

    const result = await connection.execute(`
        CREATE TABLE FUser(
            userid INTEGER,
            name VARCHAR(50),
            email VARCHAR(50),
            PRIMARY KEY (userid),
            CONSTRAINT email_unique UNIQUE (email)
        )
    `);

    await loadDummyData();

    return true;
}).catch(() => {
    return false;
});
}

const loadDummyData = async () => {
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
}

async function insert(name, email) {
    const id = Date.now();
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO FUser (userid, name, email) VALUES (:id, :name, :email)`,
            [id, name, email],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function fetch() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM FUser');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch
}
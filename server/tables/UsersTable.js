const intializeTable = async (withOracleDB) => {
  return await withOracleDB(async (connection) => {
    try {
        await connection.execute(`DROP TABLE DEMOTABLE`);
    } catch(err) {
        console.log('Table might not exist, proceeding to create...');
    }

    const result = await connection.execute(`
        CREATE TABLE DEMOTABLE (
            id NUMBER PRIMARY KEY,
            name VARCHAR2(20)
        )
    `);
    return true;
}).catch(() => {
    return false;
});
}

const loadDummyData = async () => {

}


module.exports = {
  intializeTable,
  loadDummyData
}
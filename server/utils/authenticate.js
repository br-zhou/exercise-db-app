const { fetchPassword, insert } = require("../tables/UsersTable");
// const { compare} = require("bcryptjs");

const isValidCredentials = async (req) => {
    console.log()
    const dbPassword = fetchPassword(req.body.email);
    if (!dbPassword) { return false;}
    return compare(dbPassword, req.body.password);
}

const registerUser = async ({name, email, password}) => {
    return insert(name, email, password);
}

module.exports = {isValidCredentials, registerUser};
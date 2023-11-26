const { fetchUser, insert } = require("../tables/UsersTable");
// const { compare} = require("bcryptjs");

const isValidCredentials = async (req) => {
    // console.log(req)
    const dbEmail = await fetchUser(req.body.email);
    return dbEmail;
}

const registerUser = async ({name, email, password}) => {
    return insert(name, email, password);
}

module.exports = {isValidCredentials, registerUser};
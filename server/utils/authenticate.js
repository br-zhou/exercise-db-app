import { fetchPassword, insert } from "../tables/UsersTable";
const { compare} = require("bcryptjs");


const isValidCredentials = async ({email, password}) => {
    const dbPassword = fetchPassword(email);
    if (!dbPassword) { return false;}
    return compare(dbPassword, password, () => {console.log("Password does not match!")});
}

const registerUser = async ({name, email, password}) => {
    return insert(name, email, password);
}

module.exports = {isValidCredentials, registerUser};
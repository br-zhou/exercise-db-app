import { fetchPassword, insert } from "../tables/UsersTable";
const { compare} = require("bcryptjs");


const isValidCredentials = async ({email, password}) => {
    const dbPassword = fetchPassword(email);
    if (!dbPassword) { return false;}
    return compare(dbPassword, password, () => {console.log("Password does not match!")});
}

module.exports = {isValidCredentials};
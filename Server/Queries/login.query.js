const loginQuery={
    getUserByUserName: `SELECT * from users where username = ?;`,
    getUserById: `SELECT * from users where userId = ?;`
}

module.exports = loginQuery
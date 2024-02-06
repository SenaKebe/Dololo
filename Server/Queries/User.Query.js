const userQuery = {
getAllUsers: `SELECT *from users`,
getAllUsersInfo : `SELECT u.userId,u.role,u.username, p.firstname, p.lastname, p.gender
FROM huludeig_dololo.users u
JOIN huludeig_dololo.profile p ON u.userId = p.userId;`,
getSingleUser: `SELECT * from users where userId = ?;`,
getSingleUserByUsername: `SELECT * from users where username = ?;`,
deleteSingleUser: `DELETE from users where userId = ?;`,
deleteSingleUserProfile: `DELETE from profile where userId = ?;`,
updateSingleUser: `UPDATE users set username = ?, password = ? where userId = ?;`,
updateSingleUserProfile: `UPDATE profile SET firstname = ?, lastname = ?, gender = ?,imageURL = ? WHERE userId = ?;`,
registerSingleUser: `INSERT into users (username, password,role) values (?, ?,?);`,

}
module.exports = userQuery




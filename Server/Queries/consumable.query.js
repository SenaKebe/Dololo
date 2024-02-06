const consumableQuery ={
    getAllConsumables: `SELECT consumables.*,  category.categoryName AS categoryName
    FROM consumables
    JOIN category ON consumables.categoryId = category.categoryId;
    ;`,
    getSingleConsumableById: `SELECT * from consumables where consumableId = ?;`, 
    getConsumableByCategory: `SELECT * from consumables where categoryId = ?;`,
    getConsumableByUser: `SELECT * from consumables where userId = ?;`,
    updateSingleConsumable: `UPDATE consumables set categoryId = ? , consumableName =? , amharicName = ?, price =? where foodId = ?;`,
    deleteSingleConsumable: `DELETE from consumables where consumableId = ?`,
    createSingleConsumable: `INSERT  into consumables (categoryId, consumableName, amharicName, price, imageURL) values (?,?,?,?,?); ` 
}
 module.exports = consumableQuery;




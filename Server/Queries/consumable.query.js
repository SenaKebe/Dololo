const consumableQuery ={
    getAllConsumables: 'SELECT * from consumables;',
    getSingleConsumableById: 'SELECT * from consumables where consumableId = ?;',
    getConsumableByCategory: 'SELECT * from consumables where categoryId = ?;',
    getConsumableByUser: 'SELECT * from consumables where id = userId ?;',
    updateSingleConsumable: `UPDATE consumables set consumableName =? , amharicName = ?, price =?, imageURL = ?;`,
    deleteSingleConsumable: `DELETE from consumables where consumableId = ?`,
    createSingleCategory: `INSERT  into consumables (consumableId, consumableName, amharicName, price, imageURL) values (?,?,?,?,?) `
}
 module.exports = consumableQuery;

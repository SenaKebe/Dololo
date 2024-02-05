const categoryQuery = {
   getAllCategories: `SELECT * from category;`,
   getSingleCategory: `SELECT * from category where categoryId = ?;` ,
   updateSingleCategory : `UPDATE category SET categoryName = ?, amharicName = ?, imageURL = ?`,
   deleteSingleCategory : `DELETE from category where categoryId = ?;`,
   createSingleCategory: `INSERT into category (categoryId, categoryName, amharicName, imageURL ) values (? , ? ,?, ?)`

}
module.exports = categoryQuery;


 
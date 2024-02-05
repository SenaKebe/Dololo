const orderQuery = {

    getAllDeletedOrders: `       
    SELECT
    JSON_OBJECT(
    'waiter', JSON_OBJECT('fullName', w.fullName),
    'username', u.username,
    'orderId', o.orderId,
    'totalPrice', o.totalPrice,
    'deletedDate', o.deletedDate,
    'createdDate', o.createdDate,
    'itemCount', o.totalItem,
    'singleOrders', IFNULL(
        JSON_ARRAYAGG(
        JSON_OBJECT(
            'foodName', f.foodName,
            'imageUrl',f.imageUrl,
            'amharicName', f.amharicName,
            'category', c.categoryName,  
            'amount', so.amount,
            'singleTotal', so.singleTotal,
            'singleOrderId',so.singleOrderId
        )
        ),
        JSON_ARRAY()
    )
    ) AS orderData
    FROM huludeig_order.deleteOrders o
    JOIN huludeig_order.waiter w ON w.waiterId = o.waiterId
    JOIN huludeig_order.users u ON u.userId = o.userId
    LEFT JOIN huludeig_order.deleteSingleOrder so ON so.orderId = o.orderId
    LEFT JOIN huludeig_order.foods f ON f.foodId = so.foodId
    LEFT JOIN huludeig_order.category c ON c.categoryId = f.categoryId  
    GROUP BY o.orderId ORDER BY o.createdDate DESC;
    `,
    copyOrder: `INSERT INTO deleteOrders (orderId, createdDate, waiterId, userId, totalItem, totalPrice, deletedDate)
    SELECT orderId, createdDate, waiterId, userId, totalItem, totalPrice, NOW()
    FROM orders
    WHERE orderId = ?;    
    `,
    copySingleOrder: `
    INSERT INTO deleteSingleOrder (singleOrderId,orderId, foodId, amount, singleTotal)
SELECT singleOrderId, orderId, foodId, amount, singleTotal
FROM singleOrder
WHERE orderId = ?;`,

   getAllOrders: `
   
SELECT
JSON_OBJECT(
  'waiter', JSON_OBJECT('fullName', w.fullName),
  'username', u.username,
  'orderId', o.orderId,
  'totalPrice', o.totalPrice,
  'createdDate', o.createdDate,
  'itemCount', o.totalItem,
  'singleOrders', IFNULL(
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'foodName', f.foodName,
        'imageUrl',f.imageUrl,
        'amharicName', f.amharicName,
        'category', c.categoryName,  
        'amount', so.amount,
        'singleTotal', so.singleTotal,
        'singleOrderId',so.singleOrderId
      )
    ),
    JSON_ARRAY()
  )
) AS orderData
FROM huludeig_order.orders o
JOIN huludeig_order.waiter w ON w.waiterId = o.waiterId
JOIN huludeig_order.users u ON u.userId = o.userId
LEFT JOIN huludeig_order.singleOrder so ON so.orderId = o.orderId
LEFT JOIN huludeig_order.foods f ON f.foodId = so.foodId
LEFT JOIN huludeig_order.category c ON c.categoryId = f.categoryId  
WHERE o.userId = ?
GROUP BY o.orderId ORDER BY o.createdDate DESC;
`,
   getAllOrdersInfo: `
   SELECT
   o.orderId,
   so.singleOrderId,
   o.createdDate,
   w.fullName AS waiterFullName,
   p.firstname,
   p.lastname,
   c.categoryName,
   f.foodName,
   f.price,
   so.amount,
   so.singleTotal AS totalPrice
FROM
   huludeig_order.singleOrder so
JOIN
   huludeig_order.orders o ON o.orderId = so.orderId
JOIN
   huludeig_order.waiter w ON w.waiterId = o.waiterId
JOIN
   huludeig_order.users u ON u.userId = o.userId
JOIN
   huludeig_order.profile p ON p.userId = u.userId
JOIN
   huludeig_order.foods f ON f.foodId = so.foodId
JOIN
   huludeig_order.category c ON c.categoryId = f.categoryId ORDER BY o.createdDate DESC;
  `,
   getSingleOrder: `select * from orders where orderId = ?;`,
   deleteSingleOrder: `delete from orders where orderId = ?;`,
   updateSingleOrder: `update orders set waiterId = ?, userId = ? where orderId = ?;`,
   createOrder: `insert into orders (createdDate,waiterId, userId,totalItem,totalPrice) values (now(),?, ?,?,?);`,
   createSingleOrders: `insert into singleOrder (orderId, foodId,amount,singleTotal) values (?, ?,?,?);`,
   getAllOrdersSum : `SELECT
   o.orderId,
   so.singleOrderId,
   o.createdDate,
   w.fullName AS waiterFullName,
   p.firstname,
   p.lastname,
   c.categoryName,
   f.foodName,
   f.price,
   so.amount,
   so.singleTotal AS totalPrice
FROM
   huludeig_order.singleOrder so
JOIN
   huludeig_order.orders o ON o.orderId = so.orderId
JOIN
   huludeig_order.waiter w ON w.waiterId = o.waiterId
JOIN
   huludeig_order.users u ON u.userId = o.userId
JOIN
   huludeig_order.profile p ON p.userId = u.userId
JOIN
   huludeig_order.foods f ON f.foodId = so.foodId
JOIN
   huludeig_order.category c ON c.categoryId = f.categoryId;
  `,
   getSingleOrder: `select * from orders where orderId = ?;`,
   deleteSingleOrder2: `delete from singleOrder where orderId = ?;`,
   updateSingleOrder: `update orders set waiterId = ?, userId = ? where orderId = ?;`,
   createOrder: `insert into orders (createdDate,waiterId, userId,totalItem,totalPrice) values (now(),?, ?,?,?);`,
   createSingleOrders: `insert into singleOrder (orderId, foodId,amount,singleTotal) values (?, ?,?,?);`,
   getAllOrdersSum : `
   SELECT
   DISTINCT orderDates.orderDate,
   COALESCE(SUM(subquery.dailyTotal), 0) AS totalDailySum,
   JSON_ARRAYAGG(
       JSON_OBJECT(
           'userId', subquery.userId,
           'lastname', subquery.lastname,
           'firstname', subquery.firstname,
           'userTotalSum', COALESCE(userTotalSubquery.userTotalSum, 0)
       )
   ) AS userTotals
FROM (
   SELECT DISTINCT DATE(createdDate) AS orderDate
   FROM orders
) AS orderDates
LEFT JOIN (
   SELECT
       DATE(o.createdDate) AS orderDate,
       u.userId,
       p.firstname,
       p.lastname,
       SUM(o.totalPrice) AS dailyTotal
   FROM
       orders o
   JOIN
       users u ON o.userId = u.userId
   JOIN
       profile p ON u.userId = p.userId
   GROUP BY
       orderDate, u.userId, p.firstname, p.lastname
) AS subquery ON orderDates.orderDate = subquery.orderDate
LEFT JOIN (
   SELECT
       DATE(o.createdDate) AS orderDate,
       u.userId,
       p.firstname,
       p.lastname,
       SUM(o.totalPrice) AS userTotalSum
   FROM
       orders o
   JOIN
       users u ON o.userId = u.userId
   JOIN
       profile p ON u.userId = p.userId
   GROUP BY
       orderDate, u.userId, p.firstname, p.lastname
) AS userTotalSubquery ON subquery.orderDate = userTotalSubquery.orderDate AND subquery.userId = userTotalSubquery.userId
GROUP BY orderDates.orderDate ORDER BY orderDates.orderDate DESC;

`,

getTotalOnly: `SELECT
DATE(createdDate) AS orderDate,
SUM(totalPrice) AS totalDailySum
FROM
orders
GROUP BY
orderDate
ORDER BY
orderDate DESC;`,

getTotalOnlydetaile2: `
SELECT
    DATE(createdDate) AS orderDate,
    SUM(totalPrice) AS totalDailySum,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'fname', p.firstname,
            'lname', p.lastname,
            'userSum', SUM(totalPrice)
        )
    ) AS users
FROM
    orders o
JOIN
    users u ON o.userId = u.userId
JOIN
    profile p ON u.userId = p.userId
WHERE
    DATE(createdDate) = DATE(CONVERT_TZ(?, '+00:00', '+00:00'))
GROUP BY
    orderDate
ORDER BY
    orderDate DESC;
`,


getDetailSum:`SELECT 
orderDate,
JSON_ARRAYAGG(JSON_OBJECT('userId', userId, 'fname', firstname, 'totalAmount', totalAmount)) AS userAmounts
FROM (
SELECT 
    CONVERT_TZ(DATE(o.createdDate), 'SYSTEM', 'UTC') AS orderDate,
    o.userId,
    p.firstname,
    SUM(o.totalPrice) AS totalAmount
FROM 
    orders o
    JOIN profile p ON o.userId = p.userId
WHERE 
    DATE(o.createdDate) = ?
GROUP BY 
    orderDate, o.userId, p.firstname
) AS subquery
GROUP BY 
orderDate
ORDER BY 
orderDate;
`,

 getAllOrdersSum : `SELECT
   o.orderId,
   so.singleOrderId,
   o.createdDate,
   w.fullName AS waiterFullName,
   p.firstname,
   p.lastname,
   c.categoryName,
   f.foodName,
   f.price,
   so.amount,
   so.singleTotal AS totalPrice
FROM
   huludeig_order.singleOrder so
JOIN
   huludeig_order.orders o ON o.orderId = so.orderId
JOIN
   huludeig_order.waiter w ON w.waiterId = o.waiterId
JOIN
   huludeig_order.users u ON u.userId = o.userId
JOIN
   huludeig_order.profile p ON p.userId = u.userId
JOIN
   huludeig_order.foods f ON f.foodId = so.foodId
JOIN
   huludeig_order.category c ON c.categoryId = f.categoryId;
  `,
   getSingleOrder: `select * from orders where orderId = ?;`,
   deleteSingleOrder: `delete from orders where orderId = ?;`,
   updateSingleOrder: `update orders set waiterId = ?, userId = ? where orderId = ?;`,
   createOrder: `insert into orders (createdDate,waiterId, userId,totalItem,totalPrice) values (now(),?, ?,?,?);`,
   createSingleOrders: `insert into singleOrder (orderId, foodId,amount,singleTotal) values (?, ?,?,?);`,
   getTotalOnly : `SELECT
   DISTINCT orderDates.orderDate,
   COALESCE(SUM(subquery.dailyTotal), 0) AS totalDailySum,
   JSON_ARRAYAGG(
       JSON_OBJECT(
           'userId', subquery.userId,
           'lastname', subquery.lastname,
           'firstname', subquery.firstname,
           'userTotalSum', COALESCE(userTotalSubquery.userTotalSum, 0)
       )
   ) AS userTotals
FROM (
   SELECT DISTINCT DATE(orders.createdDate) AS orderDate
   FROM orders
) AS orderDates
LEFT JOIN (
   SELECT
       DATE(o.createdDate) AS orderDate,
       u.userId,
       p.firstname,
       p.lastname,
       SUM(o.totalPrice) AS dailyTotal
   FROM
       orders o
   JOIN
       users u ON o.userId = u.userId
   JOIN
       profile p ON u.userId = p.userId
   GROUP BY
       orderDate, u.userId, p.firstname, p.lastname
) AS subquery ON orderDates.orderDate = subquery.orderDate
LEFT JOIN (
   SELECT
       DATE(o.createdDate) AS orderDate,
       u.userId,
       p.firstname,
       p.lastname,
       SUM(o.totalPrice) AS userTotalSum
   FROM
       orders o 
   JOIN
       users u ON o.userId = u.userId
   JOIN
       profile p ON u.userId = p.userId
   GROUP BY
       orderDate, u.userId, p.firstname, p.lastname
) AS userTotalSubquery ON subquery.orderDate = userTotalSubquery.orderDate AND subquery.userId = userTotalSubquery.userId
GROUP BY orderDates.orderDate ORDER BY orderDates.orderDate DESC;
`,
}

module.exports = orderQuery;


const orderService = require('../services/order.service');
const orderController ={
   getAllorder: async (req,res)=>{
      const id = req.params.id.substring(1);
      //console.log(id);
      const rows = await orderService.getAllOrder(id);
      res.status(200).json({
         sucess: true,
         data: rows
      });
   },

   getDeletedOrder:async (req,res)=>{
      const rows = await orderService.getAllDeletedOrder();
      res.status(200).json({
         sucess: true,
         data: rows
      });
   },


   getAllorderSum: async (req,res)=>{
      const rows = await orderService.getAllOrderSum();
      res.status(200).json({
         sucess: true,
         data: rows
      });
   },

   getAllorderSumdetaile: async (req,res)=>{
      const id = req.params.id.substring(1);
      const rows = await orderService.getAllOrderSumdetaile(id);
      res.status(200).json({
         sucess: true,
         data: rows
      });
   },


   getAllorderInfo: async (req,res)=>{
      const rows = await orderService.getAllOrdersInfo();
      res.status(200).json({
         sucess: true,
         data: rows
      });
   },

   getSingleategory: async (req,res)=>{
      const id = req.params.id.substring(1);
      const rows = await orderService.getSingleOrder(id);
      res.status(200).json({
         success: true,
         data: rows
      })

   },

   deleteorder: async (req,res)=>{
      const id = req.params.id.substring(1);
     // console.log(id);
      const order1 = await orderService.copyOrder(id);
      const singleOrder1 = await orderService.copySingleOrder(id);
      const isDelated = await orderService.deleteSingleOrder(id);
      if(!isDelated){
        return  res.status(500).json({
            sucess: false,
            message: `fail to delete single order`
         })

      }
      const isDelated2 = await orderService.deleteorder(id);
      //console.log(isDelated2)

      res.status(200).json({
         sucess: true,
         data: "order delated sucessfully"
      })
   

   },

   updateorder: async (req,res)=>{
      const id = req.params.id.substring(1);
      const {orderName, amharicName , price, categoryId} = req.body;

      if(!orderName || !amharicName || !id || !price || !categoryId){
         return res.status(500).json({
            success: false,
            message: 'all fields are required '
          });
       }

       req.body.orderId = id;
    const isorderUpdated = await orderService.updateSingleOrder(req.body); 

    if(!isorderUpdated){
      return res.status(500).json({
          success: false,
          message: 'fail to  update catagory '
        });
     }
     
     return res.status(200).json({
       success: true,
       message: 'catagory updated sucessfully'
     });
 

   },
  

   createorder: async (req,res)=>{
      const { userId, waiterId, orders, totalItem, totalPrice } = req.body;
    //  console.log(req.body);

      if (!userId || !waiterId || !totalItem || !orders || !totalPrice) {
        return res.status(500).json({
          success: false,
          message: 'All fields are required.',
        });
      }


      const isOrderAdded = await orderService.createOrder({
         waiterId,
         userId,
         totalItem,
         totalPrice,
       });
   
       if (!isOrderAdded) {
         return res.status(500).json({
           success: false,
           message: 'Failed to add order.',
         });
       }

       const orderId = isOrderAdded.insertId;

    for (const element of orders) {
     // console.log(element.price* element.amount);
      await orderService.createSingleOrder({
        orderId,
        foodId: element.foodId,
        amount: element.amount,
        singleTotal: element.price* element.amount,
      });
    }


    return res.status(200).json({
      success: true,
      message: 'order completed  sucessfully'
    });

     

   },

   getAllorderByCategory:  async (req,res)=>{
      const id = req.params.id.substring(1);
      const rows = await orderService.getAllorderByCategory(id);
      res.status(200).json({
         success: true,
         data: rows
      })

   },



}

module.exports = orderController;
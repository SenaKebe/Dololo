const query = require('../config/db');
const orderQuery = require('../queries/order.query');

const orderService = {
   getAllOrder: async (id)=>{
     try{
      const rows = await query(orderQuery.getAllOrders,[id]);
      return rows;
     }
     catch(e){
      console.log(e);
      return null;
     }

   },

   getAllDeletedOrder:async ()=>{
    try{
     const rows = await query(orderQuery.getAllDeletedOrders);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },
  

   getSingleOrder: async (id)=>{
    try{
     const rows = await query(orderQuery.getSingleOrders,[id]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },
  copyOrder: async (id)=>{
    try{
     const rows = await query(orderQuery.copyOrder,[id]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },
  copySingleOrder: async (id)=>{
    try{
     const rows = await query(orderQuery.copySingleOrder,[id]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },




   getAllOrderSum: async ()=>{
    try{
     const rows = await query(orderQuery.getTotalOnly);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },

  getAllOrderSumdetaile: async (data)=>{
    try{
     const rows = await query(orderQuery.getDetailSum,[data]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },



   getAllOrdersInfo: async ()=>{
    try{
     const rows = await query(orderQuery.getAllOrdersInfo);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },

   getSingleOrder: async (id)=>{
      try{
       const rows = await query(orderQuery.getSingleOrder,[id]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

  updateSingleOrder: async (id)=>{
    try{
      const rows = await query(orderQuery.updateSingleOrder,[id]);
      return rows;
    }
    catch(e){
      console.log(e);
      return null;
    }

  },

  deleteSingleOrder: async (id)=>{
    try{
      const rows = await query(orderQuery.deleteSingleOrder2,[id]);
      return rows;
    }
    catch(e){
      console.log(e);
      return null;
    }

  },

  deleteorder: async (id)=>{
    try{
      const rows = await query(orderQuery.deleteSingleOrder,[id]);
      return rows;
    }
    catch(e){
      console.log(e);
      return null;
    }

  },

  createSingleOrder: async (data)=>{
    //orderId, foodId,amount,singleTotal
    try{
     // console.log(data.orderId, data.foodId,data.amount,data.singleTotal);
      const rows = await query(orderQuery.createSingleOrders,[data.orderId, data.foodId,data.amount,data.singleTotal]);
      return rows;
    }
    catch(e){
      console.log(e);
      return null;
    }

  },

  createOrder: async (data)=>{
    // console.log(data)
    // console.log(orderQuery.createOrder)
    try{
      const rows = await query(orderQuery.createOrder,[data.waiterId,data.userId,data.totalItem,data.totalPrice]);
     //console.log(rows)
      return rows;
    }
    catch(e){
      console.log(e);
      return null;
    }

  },

}

module.exports = orderService;





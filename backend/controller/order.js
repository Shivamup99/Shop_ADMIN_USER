import OrderItem from "../model/order-item.js";
import Order from "../model/order.js";
import mongoose from "mongoose";
export const createOrder =async(req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem)=>{
        let newOrderItem = new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id
    }))
    let ordersIds = await orderItemsIds;
    const totalPrices = await Promise.all(ordersIds.map(async(orderItemId)=>{
        let orderItem =await OrderItem.findById(orderItemId).populate('product','price')
        const totalMoney = orderItem.product.price * orderItem.quantity
        // console.log(orderItem.product.price)
        return totalMoney;
    }))
   // console.log(totalPrices) 
   // to get the array of price
    // for merging th array vlaue we use reduce

    const totalPrice = totalPrices.reduce((a,b)=>a+b,0);

    try {
        let order = new Order({
            orderItems:ordersIds,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            country:req.body.country,
            city:req.body.city,
            phone:req.body.phone,
            status:req.body.status,
            zip:req.body.zip,
            totalPrice:totalPrice,
            user:req.body.user
        })
        if (!order) return res.status(400).json({ success: false });
        let newOrder = await order.save();
        res
          .status(201)
          .json({
            success: true,
            message: "order created successfully",
            result: newOrder,
          });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchOrder=async(req,res)=>{
    try {
        const order = await Order.find().populate('user' ,'name').sort({'dateOrderd':-1});
        if(!order){
         return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, result: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchOrderById = async (req, res) => {
    try {
      let order = await Order.findById(req.params.id).populate({ path : 'orderItems', populate:{path:'product',populate:'category'} }).populate('user','name');
      if (!order)
        return res
          .status(404)
          .json({ message: "order not found by this ID !" });
      res.status(200).json({ success: true, result: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // update status 

  export const updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );
      res.status(200).json({ success: true, result: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const deleteOrder = async (req, res) => {
    try {
      let order = await Order.findByIdAndRemove(req.params.id);
      if (order) {
        order.orderItems.map(async (orderItem) => {
              await OrderItem.findByIdAndRemove(orderItem);
          })
        res
          .status(200)
          .json({ success: true, message: "the order deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "order not found !" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // for total sales

  export const totalSales = async(req,res)=>{
    try {
        const totalSales = await Order.aggregate([
            {$group:{_id:mongoose.Types.ObjectId(),totalSales:{$sum:'$totalPrice'}}}
        ])
        if(!totalSales) return res.status(404).json({ success: false, message: "total sales not found !" });
       // res.status(200).json({totalSales:totalSales})
       // just get only total sales
        res.status(200).json({totalSales:totalSales.pop().totalSales})
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
  }

  export const countOrder =async(req,res)=>{
    try {
        let order = await Order.countDocuments()
        if(!order) return res.status(404).json({success:false});
        res.status(200).json({count:order})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }

  // user order history

  export const orderUserHistory = async(req,res)=>{
    try {
        const order = await Order.find({user:req.params.userid})
    .populate({ path : 'orderItems', populate:{path:'product',populate:'category'} }).sort({'dateOrdered':-1})
    if(!order){
        return res.status(404).json({ success: false });
   }
   res.status(200).json({ success: true, result: order });
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }

  }
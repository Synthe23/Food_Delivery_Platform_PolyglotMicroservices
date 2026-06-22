import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
  } from "../services/order.service.js";
  
  export const create = async (req, res, next) => {
    try {
      const order = await createOrder(
        req.user.userId,
        req.body
      );
  
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const myOrders = async (
    req,
    res,
    next
  ) => {
    try {
      const orders = await getMyOrders(
        req.user.userId
      );
  
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getById = async (
    req,
    res,
    next
  ) => {
    try {
      const order = await getOrderById(
        req.params.id
      );
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
  
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateStatus = async (
    req,
    res,
    next
  ) => {
    try {
      const order = await updateOrderStatus(
        req.params.id,
        req.body.status
      );
  
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      next(error);
    }
  };
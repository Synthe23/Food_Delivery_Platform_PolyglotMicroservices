import {
    createMenuItem,
    getRestaurantMenu,
    updateMenuItem,
    deleteMenuItem,
  } from "../services/menu.service.js";
  
  export const createMenu = async (
    req,
    res,
    next
  ) => {
    try {
      const menu = await createMenuItem(
        req.params.id,
        req.user.userId,
        req.body
      );
  
      res.status(201).json({
        success: true,
        menu,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getMenu = async (
    req,
    res,
    next
  ) => {
    try {
      const menu = await getRestaurantMenu(
        req.params.id
      );
  
      res.status(200).json({
        success: true,
        menu,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateMenu = async (
    req,
    res,
    next
  ) => {
    try {
      const menu = await updateMenuItem(
        req.params.id,
        req.user.userId,
        req.body
      );
  
      res.status(200).json({
        success: true,
        menu,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const removeMenu = async (
    req,
    res,
    next
  ) => {
    try {
      await deleteMenuItem(
        req.params.id,
        req.user.userId
      );
  
      res.status(200).json({
        success: true,
        message: "Menu item deleted",
      });
    } catch (error) {
      next(error);
    }
  };
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
  } from "../services/restaurant.service.js";
  
  export const create = async (req, res, next) => {
    try {
      const restaurant = await createRestaurant(
        req.body,
        req.user.userId
      );
  
      res.status(201).json({
        success: true,
        restaurant,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getAll = async (req, res, next) => {
    try {
      const restaurants = await getAllRestaurants();
  
      res.status(200).json({
        success: true,
        restaurants,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getById = async (req, res, next) => {
    try {
      const restaurant = await getRestaurantById(
        req.params.id
      );
  
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }
  
      res.status(200).json({
        success: true,
        restaurant,
      });
    } catch (error) {
      next(error);
    }
  };
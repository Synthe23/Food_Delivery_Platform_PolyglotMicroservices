import { prisma } from "../config/prisma.js";

export const createRestaurant = async (data, ownerId) => {
  return prisma.restaurant.create({
    data: {
      name: data.name,
      description: data.description,
      address: data.address,
      ownerId,
    },
  });
};

export const getAllRestaurants = async () => {
  return prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRestaurantById = async (id) => {
  return prisma.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      menus: true,
    },
  });
};

export const updateRestaurant = async (
  restaurantId,
  ownerId,
  data
) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  if (restaurant.ownerId !== ownerId) {
    throw new Error("Not authorized");
  }

  return prisma.restaurant.update({
    where: {
      id: restaurantId,
    },
    data,
  });
};

export const deleteRestaurant = async (
  restaurantId,
  ownerId
) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  if (restaurant.ownerId !== ownerId) {
    throw new Error("Not authorized");
  }

  await prisma.restaurant.delete({
    where: {
      id: restaurantId,
    },
  });

  return true;
};
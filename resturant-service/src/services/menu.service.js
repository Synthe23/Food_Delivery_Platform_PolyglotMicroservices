import { prisma } from "../config/prisma.js";

export const createMenuItem = async (
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

  return prisma.menu.create({
    data: {
      restaurantId,
      name: data.name,
      description: data.description,
      price: data.price,
      available: data.available ?? true,
    },
  });
};

export const getRestaurantMenu = async (
  restaurantId
) => {
  return prisma.menu.findMany({
    where: {
      restaurantId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateMenuItem = async (
  menuId,
  ownerId,
  data
) => {
  const menu = await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
    include: {
      restaurant: true,
    },
  });

  if (!menu) {
    throw new Error("Menu item not found");
  }

  if (menu.restaurant.ownerId !== ownerId) {
    throw new Error("Not authorized");
  }

  return prisma.menu.update({
    where: {
      id: menuId,
    },
    data,
  });
};

export const deleteMenuItem = async (
  menuId,
  ownerId
) => {
  const menu = await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
    include: {
      restaurant: true,
    },
  });

  if (!menu) {
    throw new Error("Menu item not found");
  }

  if (menu.restaurant.ownerId !== ownerId) {
    throw new Error("Not authorized");
  }

  await prisma.menu.delete({
    where: {
      id: menuId,
    },
  });

  return true;
};
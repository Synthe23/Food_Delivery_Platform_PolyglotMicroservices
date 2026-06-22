import { prisma } from "../config/prisma.js";

export const createOrder = async (customerId, data) => {
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return prisma.order.create({
    data: {
      customerId,
      restaurantId: data.restaurantId,
      totalAmount,

      items: {
        create: data.items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },

    include: {
      items: true,
    },
  });
};

export const getMyOrders = async (customerId) => {
  return prisma.order.findMany({
    where: {
      customerId,
    },

    include: {
      items: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      items: true,
    },
  });
};

export const updateOrderStatus = async (orderId, status) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },

    data: {
      status,
    },
  });
};

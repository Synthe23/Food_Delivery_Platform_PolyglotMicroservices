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
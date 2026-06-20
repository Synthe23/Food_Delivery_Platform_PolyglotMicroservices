import bcrypt from "bcrypt";
import crypto from "crypto";

import { prisma } from "../config/prisma.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const registerUser = async ({ name, email, password, phone }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone,
    },
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
  });

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  const tokenHash = crypto

    .createHash("sha256")

    .update(refreshToken)

    .digest("hex");

  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      tokenHash,
    },
  });

  if (
    !storedToken ||
    storedToken.revoked ||
    storedToken.expiresAt < new Date()
  ) {
    throw new Error("Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = signAccessToken({
    userId: user.id,

    role: user.role,
  });

  return { accessToken };
};

export const logoutUser = async (refreshToken) => {
  const tokenHash = crypto

    .createHash("sha256")

    .update(refreshToken)

    .digest("hex");

  await prisma.refreshToken.updateMany({
    where: {
      tokenHash,
    },

    data: {
      revoked: true,
    },
  });
};

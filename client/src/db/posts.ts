import { Prisma } from "@prisma/client";
import prisma from "./db";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const getPostsFromDB = unstable_cache(
  cache(
    async ({
      query,
      userId,
    }: {
      query?: string;
      userId?: string | number;
    } = {}) => {
      await wait(2000);

      const where: Prisma.PostFindManyArgs["where"] = {};
      if (query) {
        where.OR = [
          { title: { contains: query } },
          { body: { contains: query } },
        ];
      }

      if (userId) {
        where.userId = Number(userId);
      }

      return prisma.post.findMany({ where });
    }
  ),
  ["posts"]
);

export async function getPostFromDB(postId: string | number) {
  await wait(2000);
  return prisma.post.findUnique({ where: { id: Number(postId) } });
}

export async function getUserPostsFromDB(userId: string | number) {
  await wait(2000);
  return prisma.post.findMany({ where: { userId: Number(userId) } });
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

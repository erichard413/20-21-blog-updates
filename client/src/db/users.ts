import prisma from "./db";

export async function getUsersFromDB() {
  await wait(2000);

  return prisma.user.findMany();
}

export async function getUserFromDB(userId: string | number) {
  await wait(2000);
  return prisma.user.findUnique({ where: { id: Number(userId) } });
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

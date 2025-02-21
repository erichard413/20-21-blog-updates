import prisma from "./db";

export async function getTodosFromDB() {
  await wait(2000);

  return prisma.todo.findMany();
}

export async function getUserTodosFromDB(userId: string | number) {
  await wait(2000);
  return prisma.todo.findMany({ where: { userId: Number(userId) } });
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

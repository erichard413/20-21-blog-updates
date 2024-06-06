import { getTodosFromDB, getUserTodosFromDB } from "@/db/todos";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos() {
  await wait(2000);
  // return fetch(`${process.env.API_URL}/todos`)
  //   .then(res => res.json())
  //   .then(data => data as Todo[]);
  return await getTodosFromDB();
}

export async function getUserTodos(userId: string | number) {
  await wait(2000);
  // return fetch(`${process.env.API_URL}/todos?userId=${userId}`)
  //   .then(res => res.json())
  //   .then(data => data as Todo[]);
  return await getUserTodosFromDB(userId);
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

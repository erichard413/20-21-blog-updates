import { getUserFromDB, getUsersFromDB } from "@/db/users";

type User = {
  id: number;
  name: string;
  email: string;
  website: string;
  city: string;
  street: string;
  zipcode: string;
  suite: string;
  companyName: string;
};

export async function getUsers() {
  await wait(2000);
  return await getUsersFromDB();
}

export async function getUser(userId: string | number) {
  await wait(2000);
  return await getUserFromDB(userId);
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

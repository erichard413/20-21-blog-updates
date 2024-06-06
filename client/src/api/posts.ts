import { getPostFromDB, getPostsFromDB, getUserPostsFromDB } from "@/db/posts";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export async function getPosts(query: string, userId: string | number) {
  await wait(2000);
  return await getPostsFromDB({ query, userId });
}

export async function getPost(postId: string | number) {
  await wait(2000);
  return await getPostFromDB(postId);
}

export async function getUserPosts(userId: string | number) {
  await wait(2000);
  return await getUserPostsFromDB(userId);
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

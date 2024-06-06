import { getPostCommentsFromDB } from "@/db/comments";

type Comment = {
  id: number;
  email: string;
  body: string;
  postId: number;
};

export async function getPostComments(postId: string | number) {
  await wait(2000);
  // return fetch(`${process.env.API_URL}/posts/${postId}/comments`)
  //   .then(res => res.json())
  // .then(data => data as Comment[])
  return await getPostCommentsFromDB(postId);
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

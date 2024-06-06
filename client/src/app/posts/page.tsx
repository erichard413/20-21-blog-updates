import { getPosts } from "@/api/posts";
import { getUsers } from "@/api/users";
import { FormGroup } from "@/components/FormGroup";
import { PostCard, SkeletonPostCard } from "@/components/PostCard";
import { SkeletonList } from "@/components/Skeleton";
import { Suspense } from "react";

type PageProps = {
  searchParams: { query?: string; userId?: string };
};

export default function PostsPage({
  searchParams: { query = "", userId = "" },
}: PageProps) {
  return (
    <>
      <h1 className="page-title">Posts</h1>

      <SearchForm userId={userId} query={query} />

      <div className="card-grid">
        <Suspense
          key={`${userId}-${query}`}
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <PostGrid userId={userId} query={query} />
        </Suspense>
      </div>
    </>
  );
}

async function PostGrid({ userId, query }: { userId: string; query: string }) {
  const posts = await getPosts(query, userId);

  return posts.map(post => <PostCard key={post.id} {...post} />);
}

function SearchForm({ userId, query }: { userId: string; query: string }) {
  return (
    <form className="form mb-4">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="query">Query</label>
          <input
            type="search"
            name="query"
            id="query"
            defaultValue={query !== "" ? query : ""}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId">
            <Suspense fallback={<option value="">Loading...</option>}>
              <UserSelect userId={userId} />
            </Suspense>
          </select>
        </FormGroup>
        <button className="btn">Filter</button>
      </div>
    </form>
  );
}

async function UserSelect({ userId }: { userId: string }) {
  const users = await getUsers();

  return (
    <>
      <option value="">Any</option>
      {users.map(user => (
        <option
          key={user.id}
          value={user.id}
          selected={user.id == +userId ? true : false}
        >
          {user.name}
        </option>
      ))}
    </>
  );
}

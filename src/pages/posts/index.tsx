import Link from "next/link";

import { Post } from "@prisma/client";

import { trpc } from "../../utils/trpc";

function postsPage() {

    const { data, isLoading } = trpc.useQuery(['posts.getPosts'])

    if (isLoading) {
      return <p>Loading...</p>
    }
  
    return (
      <div>
        {data?.map((post: Post) => {
          return (
            <article key={post.id}>
              <p>{post.title}</p>
              <Link href={`/posts/${post.id}`}>Read post</Link>
            </article>
          )
        })}
      </div>
    )
}

export default postsPage;
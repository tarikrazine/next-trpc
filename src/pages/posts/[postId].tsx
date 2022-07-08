import { useRouter } from "next/router";
import Error from "next/error";

import { trpc } from "../../utils/trpc";

function postPage() {

    const router = useRouter()

    const postId = router.query.postId as string

    const { data, isLoading } = trpc.useQuery(['posts.getPost', { postId }])

    if (isLoading) {
        return <p>Loading posts...</p>
    }

    if (!data) {
        return <Error statusCode={404} />
    }

    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.content}</p>
        </div>
    )
}

export default postPage;
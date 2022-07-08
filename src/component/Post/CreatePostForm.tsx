import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

const CreatePostForm = () => {

    const router = useRouter();

    const { register, handleSubmit } = useForm<CreatePostInput>();

    const { mutate, error } = trpc.useMutation(['posts.createPost'], {
        onSuccess: ({ id }) => {
            router.push(`/posts/${id}`);
        }
    })

    function handleFormSubmit(data: CreatePostInput) {
        mutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                { error && <div>{error.message}</div> }
                <label>
                    Title:
                    <input type="text" {...register('title')} />
                </label>
                <label>
                    Content:
                    <textarea {...register('title')} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePostForm;
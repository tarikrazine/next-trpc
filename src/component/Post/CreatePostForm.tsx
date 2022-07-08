import { useForm } from "react-hook-form";

import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

const CreatePostForm = () => {

    const { register, handleSubmit } = useForm<CreatePostInput>();

    const { mutate } = trpc.useMutation(['posts.createPost'])

    function handleFormSubmit(data: CreatePostInput) {
        mutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
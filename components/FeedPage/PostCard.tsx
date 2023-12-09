import { ReactElement } from 'react'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

export type PostCardProps = {
	userHandle: string
	postContent: string
	postMedia?: string[]
	likes: number
}

export default function PostCard({
	userHandle,
	postContent,
	likes,
	postMedia
}: PostCardProps): ReactElement {
	return (
		<section className='p-2 bg-gray-800 rounded-lg'>
			<PostHeader userHandle={userHandle} />
			<PostBody postContent={postContent} postMedia={postMedia} />
			<PostFooter likes={likes} />
		</section>
	)
}

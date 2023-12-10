import { ReactElement, useState } from 'react'
// import PostCard from '@/components/FeedPage/PostCard'

export default function Activity(): ReactElement {
	const [posts, setPosts] = useState([])

	if (!posts.length) {
		return <h1 className='text-gray-700'>There is no activity yet</h1>
	}

	return (
		<div className='space-y-2 w-full'>
			{/* <PostCard
				userHandle='chris-arevalo'
				postContent='sssss'
				likes={30}
				postMedia={['img1', 'ime1']}
			/>
			<PostCard
				userHandle='chris-arevalo'
				postContent='sssss'
				likes={30}
				postMedia={['img1', 'ime1']}
			/>
			<PostCard
				userHandle='chris-arevalo'
				postContent='sssss'
				likes={30}
				postMedia={['img1', 'ime1']}
			/> */}
		</div>
	)
}

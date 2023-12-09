import { ReactElement } from 'react'
import FeedFooter from './FeedFooter'
import FeedPosts from './FeedPosts'
import FeedProfileCard from './FeedProfileCard'
import FeedSuggested from './FeedSuggested'

export default function Feed(): ReactElement {
	return (
		<div className='flex md:gap-2 p-2 w-full h-full text-zinc-300'>
			<FeedProfileCard />
			<FeedPosts />
			<div className='hidden md:block w-1/4 sticky top-3 h-fit'>
				<FeedSuggested />
				<FeedFooter />
			</div>
		</div>
	)
}

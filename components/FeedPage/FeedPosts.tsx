import { ReactElement } from 'react'
import ShareAPost from './ShareAPost'
import {
	ExplorePublicationType,
	ExplorePublicationsOrderByType,
	useExplorePublications
} from '@lens-protocol/react-web'
import { Publication, Theme } from '@lens-protocol/widgets-react'
//import { Audio } from 'react-loader-spinner'
import Loader from '../Loader'

export default function FeedPosts(): ReactElement {
	const { data: publications, loading } = useExplorePublications({
		where: {
			publicationTypes: [ExplorePublicationType.Post],
			customFilters: []
		},
		orderBy: ExplorePublicationsOrderByType.Latest
	})
	
	return (
		<div className='p-2 bg-gray-900 rounded-xl flex flex-col gap-2 items-center w-full max-w-[600px]'>
			<ShareAPost />
			{loading && <Loader />}
			{publications?.map(publication => {
				return (
					<div
						className='post-container'
						style={{ width: '100%' }}
						key={publication.id}
					>
						<Publication
							theme={Theme.dark}
							//publicationData={publication}
							publicationId={publication.id}
						/>
					</div>
				)
			})}
		</div>
	)
}

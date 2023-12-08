'use client'

import React, { ReactNode } from 'react'
import Feed from '@/components/FeedPage/Feed'
import {
	ExplorePublicationType,
	ExplorePublicationsOrderByType,
	useExplorePublications
} from '@lens-protocol/react-web'

export default function Home(): ReactNode {
	const { data: publications } = useExplorePublications({
		where: {
			publicationTypes: [ExplorePublicationType.Post]
		},
		orderBy: ExplorePublicationsOrderByType.TopCommented
	})

	console.log(publications)
	return <Feed />
}

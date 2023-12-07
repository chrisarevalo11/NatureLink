import { ReactElement } from 'react'

type ProjectBannerProps = {
	bannerImage: string
}

export default function ProjectBanner({
	bannerImage
}: ProjectBannerProps): ReactElement {
	return (
		<figure
			style={{
				backgroundImage: `url(${bannerImage})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover'
			}}
			className='h-48 rounded-xl'
		></figure>
	)
}

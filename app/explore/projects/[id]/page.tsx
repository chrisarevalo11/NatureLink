'use client'

import { formValuesTypes } from '@/app/create/page'
import Apply from '@/components/ProjectPage/Apply'
import Donate from '@/components/ProjectPage/Donate'
import Information from '@/components/ProjectPage/Information'
import { Project } from '@/models/contract-functions-args.model'
import { AppDispatch, useAppSelector } from '@/store'
import { getprojectById } from '@/store/slides/projectSlide'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const test: formValuesTypes = {
	projectName: 'Project Name',
	bannerImage:
		'https://pbs.twimg.com/media/F_KOERzXkAAaXFC?format=jpg&name=small',
	logo: 'https://pbs.twimg.com/profile_images/1494316842503925764/eJ-0xwBV_400x400.jpg',
	link: 'https://www.google.com',
	description:
		'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
	amount: 18000,
	startDate: '2024-01-01',
	endDate: '2022-02-01',
	scopeTags: 'tag1, tag2, tag3',
	contributors: '0x12e3e1, Juan, Rookie'
}

type Props = {
	id: string
}

export default function Page(props: Props): JSX.Element {
	const project: Project | null = useAppSelector(
		state => state.project.projectSelected
	)

	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()
	const pathname: string = usePathname()

	useEffect(() => {
		const pathnameSplited: string[] = pathname.split('/')
		const slug: string = pathnameSplited[pathnameSplited.length - 1]
		const slugNumber: number = parseInt(slug)
		dispatch(getprojectById(slugNumber))

		if (project === null) {
			router.push('/explore')
		}
	}, [dispatch])

	return (
		<section className='w-full grid lg:grid-cols-2 rounded-xl mt-2'>
			<Information project={test} />

			<div className='flex flex-col justify-center rounded-br-xl rounded-bl-xl lg:rounded-bl-none py-4 px-5 lg:rounded-tr-xl bg-slate-950'>
				<Donate RequiredAmount={test.amount} project={project} />
				<div className='divider'>OR</div>
				<Apply project={project} />
			</div>
		</section>
	)
}

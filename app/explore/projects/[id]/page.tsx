'use client'

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

export default function Page(): JSX.Element {
	const project: Project | null = useAppSelector(
		state => state.project.projectSelected
	)

	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()
	const pathname: string = usePathname()

	console.log('💥 project 💥', project)

	useEffect(() => {
		const pathnameSplited: string[] = pathname.split('/')
		const slug: string = pathnameSplited[pathnameSplited.length - 1]
		const slugNumber: number = parseInt(slug)
		dispatch(getprojectById(slugNumber))

		if (project === null) {
			router.push('/explore')
			return
		}
	}, [dispatch])

	return (
		<section className='w-full grid lg:grid-cols-2 rounded-xl mt-2'>
			{project !== null && <Information project={project} />}

			<div className='flex flex-col justify-center rounded-br-xl rounded-bl-xl lg:rounded-bl-none py-4 px-5 lg:rounded-tr-xl bg-slate-950'>
				{project !== null && (
					<>
						<Donate project={project} />
						<div className='divider'>OR</div>
						<Apply project={project} />
					</>
				)}
			</div>
		</section>
	)
}

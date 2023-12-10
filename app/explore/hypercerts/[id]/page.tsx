'use client'

import Information from '@/components/ProjectPage/Information'
import { Fragment, useEffect } from 'react'
import Contributors from '@/components/ProjectPage/HypercertPage/Contributors'
import Evaluators from '@/components/ProjectPage/HypercertPage/Evaluators'
import Results from '@/components/ProjectPage/ResultsSection/Results'
import ActionButton from '@/components/ProjectPage/HypercertPage/ActionButton'
import { AppDispatch, useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { Project } from '@/models/contract-functions-args.model'
import { usePathname, useRouter } from 'next/navigation'
import { getprojectById } from '@/store/slides/projectSlide'

export default function Page(): JSX.Element {
	const project: Project | null = useAppSelector(
		state => state.project.projectSelected
	)

	console.log(project)

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
			return
		}
	}, [dispatch])

	return (
		<Fragment>
			<section className='w-full grid lg:grid-cols-2 rounded-xl mt-2'>
				{project !== null && <Information project={project} />}
				<div className='flex flex-col justify-between rounded-br-xl rounded-bl-xl lg:rounded-bl-none py-5 px-2 lg:px-5 lg:rounded-tr-xl bg-slate-950'>
					<Contributors contributors={project?.stake.stakers} />
					<Evaluators evaluators={project?.evaluation.evaluatorsSelected} />
					<ActionButton />
				</div>
			</section>
			<Results />
		</Fragment>
	)
}

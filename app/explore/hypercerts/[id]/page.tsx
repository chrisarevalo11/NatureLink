import Information from '@/components/ProjectPage/Information'
import { Fragment, ReactNode } from 'react'
import Contributors from '@/components/ProjectPage/HypercertPage/Contributors'
import Evaluators from '@/components/ProjectPage/HypercertPage/Evaluators'
import Results from '@/components/ProjectPage/ResultsSection/Results'
import ActionButton from '@/components/ProjectPage/HypercertPage/ActionButton'
import { test } from '@/constants/constants'

export default function Page(): JSX.Element {
	return (
		<Fragment>
			<section className='w-full grid lg:grid-cols-2 rounded-xl mt-2'>
				<Information project={test} />
				<div className='flex flex-col justify-between rounded-br-xl rounded-bl-xl lg:rounded-bl-none py-5 px-2 lg:px-5 lg:rounded-tr-xl bg-slate-950'>
					<Contributors />
					<Evaluators />
					<ActionButton />
				</div>
			</section>
			<Results />
		</Fragment>
	)
}

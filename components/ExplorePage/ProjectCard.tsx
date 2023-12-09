'use client'

import { Project } from '@/models/contract-functions-args.model'
import { getCrowdfundingContract } from '@/services/projects.services'
import { Contract, ethers } from 'ethers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
	project: Project
}

const handleDate = (date: number): string => {
	const dateObject: Date = new Date(date * 1000)

	const year = dateObject.getFullYear()
	const month = dateObject.getMonth() + 1
	const day = dateObject.getDate()

	const dateFormatted = `${year}-${month}-${day}`

	return dateFormatted
}

export default function ProjectCard({ project }: Props): JSX.Element | null {
	const { id } = project
	const { info, projectTimeStart, projectTimeEnd, amount } = project?.proposal
	const { getMissingAmount } = project.stake
	const infoArray: string[] = info.split(',')

	const [projectName, bannerImage, logo, description, , , contributors] =
		infoArray

	const contributedAmount: number = amount - getMissingAmount

	return (
		<div className='card card-compact md:card-normal w-full bg-gray-900  shadow-xl overflow-hidden group relative'>
			<Link href={`/explore/projects/${id}`}>
				<figure
					className='w-full h-44'
					style={{
						backgroundImage: `url(${bannerImage})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover'
					}}
				></figure>
				<div className='card-body relative'>
					<span
						className='h-12 w-12 absolute -top-6 right-4 rounded-full'
						style={{
							backgroundImage: `url(${logo})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover'
						}}
					></span>
					<h2 className='card-title'>{projectName}</h2>
					<h2 className='-mt-2 text-green-300'>
						<span className='font-bold'>By:</span>{' '}
						{contributors?.split(',').join(', ')}
					</h2>
					<h3 className='text-slate-400 text-sm -mt-2 mb-2'>
						{handleDate(projectTimeStart)} - {handleDate(projectTimeEnd)}
					</h3>
					<p className='line-clamp-2 text-sm h-[40px]'>{description}</p>
					<div className='flex justify-center items-center mt-2 gap-3'>
						<progress
							className='progress progress-primary w-full'
							value={contributedAmount}
							max={amount}
						></progress>
						<span>{Math.round((contributedAmount / amount) * 100)}%</span>
					</div>
					<div className='card-actions justify-end'>
						<button className='btn btn-primary relative w-full -bottom-24 group-hover:bottom-0 transition-all mt-3 hover-enabled'>
							See more
						</button>
					</div>
				</div>
			</Link>
		</div>
	)
}

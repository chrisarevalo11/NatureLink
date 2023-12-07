import { Propousal } from '@/models/contract-functions-args.model'
import { getProposals } from '@/services/projects.services'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: Request, res: Response) {
	const proposals: Propousal[] = await getProposals()
	// console.log("projects: ", projects);
	return new Response('Hello World')
}

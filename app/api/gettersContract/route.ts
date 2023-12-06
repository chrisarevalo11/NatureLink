import { getAllProjects } from '@/services/projects.services'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: Request, res: Response) {
	const projects = await getAllProjects()
	// console.log("projects: ", projects);
	return new Response('Hello World')
}

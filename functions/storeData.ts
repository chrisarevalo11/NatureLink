import { File, Web3Storage } from 'web3.storage'

export interface Attribute {
	trait_type: string
	value: string | number
}

export interface OpenSeaStandard {
	image: string
	image_data?: string
	external_url?: string
	description: string
	name: string
	background_color?: string
	attributes?: Attribute[]
	animation_url?: string
	youtube_url?: string
}

export interface OpenSeaStandardDto {
	image: File
	image_data?: string
	external_url?: string
	description: string
	name: string
	background_color?: string
	attributes?: Attribute[]
	animation_url?: string
	youtube_url?: string
}

const ipfs = 'https://w3s.link/ipfs'

function getAccessToken() {
	if (!process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN) {
		throw new Error('NEXT_PUBLIC_WEB3STORAGE_TOKEN not found in .env file')
	}

	return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN
}

function makeStorageClient() {
	return new Web3Storage({ token: getAccessToken() })
}

export async function storageFile(file: File): Promise<string> {
	const client = makeStorageClient()

	const cid = await client.put([file], {
		wrapWithDirectory: false
	})


	return `${ipfs}/${cid}`
}

export async function storeOpenSeaMetadata(
	data: OpenSeaStandardDto
): Promise<string> {
	const client = makeStorageClient()

	const imageUrl = await storageFile(data.image)

	const obj: OpenSeaStandard = {
		...data,
		image: imageUrl
	}

	const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
	const files = [new File([blob], 'metadata.json')]


	const cid = await client.put(files, {
		wrapWithDirectory: false
	})


	return `${ipfs}/${cid}`
}

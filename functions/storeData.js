import { File, Web3Storage } from 'web3.storage'
import dotenv from 'dotenv'
dotenv.config()

const { NEXT_PUBLIC_WEB3STORAGE_TOKEN } = process.env

const ipfs = 'https://w3s.link/ipfs'

function getAccessToken() {
	if (!NEXT_PUBLIC_WEB3STORAGE_TOKEN) {
		throw new Error('NEXT_PUBLIC_WEB3STORAGE_TOKEN not found in .env file')
	}

	return NEXT_PUBLIC_WEB3STORAGE_TOKEN
}

function makeStorageClient() {
	return new Web3Storage({ token: getAccessToken() })
}

async function storeImage(imageFile) {
	const client = makeStorageClient()

	const cid = await client.put([imageFile], {
		wrapWithDirectory: false
	})

	console.log('Stored image with CID: ', `${ipfs}/${cid}`)

	return cid
}

export const storeMetadata = async (data, imageFile) => {
	let obj

	const imagecid = await storeImage(imageFile)
	const imageUrl = `${ipfs}/${imagecid}`

	obj = {
		description: data.description,
		image: imageUrl,
		name: data.name
	}

	const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
	const files = [new File([blob], 'metadata.json')]

	console.log('Uploading metadata to IPFS via web3.storage')

	const client = makeStorageClient()

	const cid = await client.put(files, {
		wrapWithDirectory: false
	})

	console.log('Stored files with CID:', `${ipfs}/${cid}`)

	return `${ipfs}/${cid}`
}

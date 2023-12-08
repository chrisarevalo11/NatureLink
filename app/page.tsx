'use client'
import { useClaimHandle, useLogin } from '@lens-protocol/react-web'
import { useAddress } from '@thirdweb-dev/react'

export default function Home() {
	const address = useAddress()
	const { execute: executeLogin, loading, data, error } = useLogin()
	const { execute: executeClaimHandle } = useClaimHandle()

	const handleClaim = async () => {
		if (address) {
			try {
				const result = await executeClaimHandle({ localName: 'test777' })
				console.log(result)
			} catch (err) {
				console.error(err)
			}
		} else {
			console.error('Wallet address not found. Please connect your wallet.')
		}
	}

	const login = async () => {
		if (address) {
			try {
				const result = await executeLogin({ address })
				console.log(result)
			} catch (err) {
				console.error('Error during login:', err)
			}
		} else {
			console.error('Wallet address not found. Please connect your wallet.')
		}
	}

	return (
		<div>
			{loading && <p>Cargando perfil...</p>}
			{error && <p>Error al cargar el perfil: {error.message}</p>}
			{data && <h1>{JSON.stringify(data)}</h1>}
			<button className={'btn btn-primary'} onClick={login}>
				Login
			</button>
			<button className={'btn btn-primary'} onClick={handleClaim}>
				Claim Handle
			</button>
		</div>
	)
}

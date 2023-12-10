import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import { loadSlim } from 'tsparticles-slim'

export default function Snow(): JSX.Element | null {
	const pathname = usePathname()

	// Inicialización de las partículas
	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine)
		await loadSlim(engine)
	}, [])

	// Carga de las partículas
	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			await console.log(container)
		},
		[]
	)

	// Si el pathname no es '/', retornar null antes de renderizar el componente
	if (pathname !== '/') {
		return null
	}

	return (
		<Particles
			id='tsparticles'
			options={{
				particles: {
					color: {
						value: '#fff'
					},
					number: {
						value: 100
					},
					opacity: {
						value: { min: 0.3, max: 0.7 }
					},
					shape: {
						type: 'circle'
					},
					size: {
						value: { min: 1, max: 2 }
					},
					move: {
						direction: 'bottom-right',
						enable: true,
						speed: { min: 1, max: 2 },
						straight: true
					}
				}
			}}
			init={particlesInit}
			loaded={particlesLoaded}
		/>
	)
}

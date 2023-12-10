'use client'

import { usePathname } from "next/navigation";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function Snow(): JSX.Element | null {
    const pathname = usePathname()

    if (pathname !== '/') {
        return null
    }

    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
        <Particles id="tsparticles" options={{
            particles: {
                color: {
                    value: "#fff"
                },
                number: {
                    value: 100
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 }
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 2 }
                },
                move: {
                    direction: "bottom-right",
                    enable: true,
                    speed: { min: 1, max: 2 },
                    straight: true
                }
            }
        }} init={particlesInit} loaded={particlesLoaded} />
    );
};
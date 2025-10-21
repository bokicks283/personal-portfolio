import {useEffect, useState, type JSX} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "./particles.json";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

function ParticleBackground({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative min-h-screen z-10">
            {init && <Particles id="tsparticles" options={particlesOptions as unknown as RecursivePartial<IOptions>}/>}
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}

export default ParticleBackground;

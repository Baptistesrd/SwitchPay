// src/components/AnimatedParticles.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function AnimatedParticles() {
  const init = useCallback(async (engine) => {
    // Charge le bundle "slim" (inclut les links, move, opacity, size…)
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      options={{
        background: { color: { value: "transparent" } },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 900 } },
          color: { value: "#7aa2ff" },
          links: { enable: true, color: "#7aa2ff", opacity: 0.2, distance: 120 },
          move: { enable: true, speed: 1.2, outModes: { default: "bounce" } },
          opacity: { value: 0.35 },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}


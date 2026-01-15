"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Environment, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";

/*
  INSTRUCTIONS FOR USER:
  1. Place your .glb file in the 'public/models' folder.
  2. Update the FILENAME constant below to match your file name (e.g., "my-strap.glb").
  3. The model will automatically load, center, and cast shadows.
*/

const FILENAME = "digital_watch.glb"; // <--- CHANGE THIS TO YOUR FILE NAME

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2 min-w-[200px]">
                <span className="text-[var(--text-secondary)] text-xs tracking-widest uppercase font-medium">
                    Loading {progress.toFixed(0)}%
                </span>
                <div className="w-32 h-[1px] bg-[var(--card-border)]">
                    <div
                        className="h-full bg-[var(--foreground)] transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </Html>
    );
}

function Model(props: any) {
    // This hook loads the GLTF file. 
    // Note: It might throw an error if the file doesn't exist yet, which is handled by Suspense fallback.
    const { scene } = useGLTF(`/models/${FILENAME}`);

    // Optional: Auto-rotate logic is now handled by OrbitControls for better UX (pauses on interaction)
    const ref = useRef<THREE.Group>(null);

    return <primitive ref={ref} object={scene} {...props} />;
}

export default function Strap3DViewer() {
    return (
        <div className="w-full h-[500px] md:h-[600px] bg-[var(--background)] relative">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 4] }} className="z-10 bg-transparent">
                <Suspense fallback={<Loader />}>
                    <Stage environment="city" intensity={0.6} adjustCamera={false}>
                        {/* 
                We use Error Boundary concept implicitly here via Suspense. 
                If the model isn't found, it might show blank. 
                Ensure the file exists in public/models/strap.glb 
            */}
                        <Model scale={[0.01, 0.01, 0.01]} /> {/* Adjust scale if your model is too huge/small */}
                    </Stage>

                    <OrbitControls
                        enableZoom={false}
                        enableRotate={false}
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={1.5}
                        makeDefault
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload to avoid waterfall
useGLTF.preload(`/models/${FILENAME}`);

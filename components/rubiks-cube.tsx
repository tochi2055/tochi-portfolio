"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

interface RubiksCubeProps {
  size?: number
  autoRotate?: boolean
  className?: string
  interactive?: boolean
}

// Custom shader for gradient blacks and surface imperfections
const GradientBlackMaterial = ({
  baseColor = "#1a1a1a",
  gradientColor = "#000000",
  imperfectionIntensity = 0.3,
  chromeIntensity = 0.8,
  mirrorEffect = 0.95,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform vec3 baseColor;
    uniform vec3 gradientColor;
    uniform float imperfectionIntensity;
    uniform float chromeIntensity;
    uniform float mirrorEffect;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    // Noise function for surface imperfections
    float noise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
    }
    
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for(int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    void main() {
      // Gradient based on position
      float gradientFactor = smoothstep(-1.0, 1.0, vPosition.y);
      vec3 color = mix(baseColor, gradientColor, gradientFactor * 0.6);
      
      // Surface imperfections
      float imperfection = fbm(vWorldPosition * 15.0 + time * 0.1) * imperfectionIntensity;
      color = mix(color, color * 0.7, imperfection);
      
      // Chrome-like reflections
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);
      
      // Dynamic reflection based on time
      float dynamicReflection = sin(time * 0.5 + vWorldPosition.x * 2.0) * 0.1 + 0.9;
      
      // Mirror effect
      vec3 reflectedColor = mix(color, vec3(0.8, 0.9, 1.0), fresnel * mirrorEffect * dynamicReflection);
      
      // Chrome finish
      reflectedColor = mix(reflectedColor, vec3(0.9, 0.95, 1.0), chromeIntensity * fresnel);
      
      gl_FragColor = vec4(reflectedColor, 1.0);
    }
  `

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        time: { value: 0 },
        baseColor: { value: new THREE.Color(baseColor) },
        gradientColor: { value: new THREE.Color(gradientColor) },
        imperfectionIntensity: { value: imperfectionIntensity },
        chromeIntensity: { value: chromeIntensity },
        mirrorEffect: { value: mirrorEffect },
      }}
    />
  )
}

function DynamicLights() {
  const light1Ref = useRef<THREE.PointLight>(null!)
  const light2Ref = useRef<THREE.PointLight>(null!)
  const light3Ref = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.7) * 4
      light1Ref.current.position.z = Math.cos(time * 0.7) * 4
      light1Ref.current.intensity = 0.8 + Math.sin(time * 2) * 0.3
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 0.5) * 3
      light2Ref.current.position.y = 3 + Math.sin(time * 0.8) * 1
      light2Ref.current.intensity = 0.6 + Math.cos(time * 1.5) * 0.2
    }

    if (light3Ref.current) {
      light3Ref.current.position.z = Math.sin(time * 0.3) * 5
      light3Ref.current.position.x = Math.cos(time * 0.9) * 2
      light3Ref.current.intensity = 0.7 + Math.sin(time * 1.2) * 0.25
    }
  })

  return (
    <>
      <pointLight ref={light1Ref} position={[4, 5, 4]} intensity={0.8} color="#ffffff" />
      <pointLight ref={light2Ref} position={[3, 3, -3]} intensity={0.6} color="#e6f3ff" />
      <pointLight ref={light3Ref} position={[-2, 4, 5]} intensity={0.7} color="#fff8e6" />
    </>
  )
}

function ReflectiveSphere() {
  const sphereRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 2
    }
  })

  return (
    <mesh ref={sphereRef} position={[0, 2, 0]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshPhysicalMaterial color="#ffffff" roughness={0.0} metalness={1.0} envMapIntensity={2.4} reflectivity={0.8} />
    </mesh>
  )
}

// Single Rubik's cube piece
function CubePiece({
  position,
  rotationOffset = [0, 0, 0],
  isHovered = false,
}: {
  position: [number, number, number]
  rotationOffset?: [number, number, number]
  isHovered?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      // Apply subtle individual rotation to each piece
      const hoverMultiplier = isHovered ? 2 : 1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + rotationOffset[0]) * 0.05 * hoverMultiplier
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3 + rotationOffset[1]) * 0.05 * hoverMultiplier
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + rotationOffset[2]) * 0.05 * hoverMultiplier
    }
  })

  const cubeSize = 0.32
  const gap = 0.03
  const totalSize = cubeSize + gap

  return (
    <mesh
      ref={meshRef}
      position={[position[0] * totalSize, position[1] * totalSize, position[2] * totalSize]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshPhysicalMaterial
        color={isHovered ? "#1a1a1a" : "#0a0a0a"}
        roughness={0.016}
        metalness={0.76}
        clearcoat={0.8}
        clearcoatRoughness={0.008}
        transmission={0.0}
        thickness={0.5}
        ior={2.4}
        envMapIntensity={isHovered ? 2.4 : 2.0}
        reflectivity={0.784}
        normalScale={new THREE.Vector2(0.3, 0.3)}
      />
      <GradientBlackMaterial
        baseColor={isHovered ? "#2a2a2a" : "#1a1a1a"}
        gradientColor="#000000"
        imperfectionIntensity={0.4}
        chromeIntensity={isHovered ? 0.8 : 0.72}
        mirrorEffect={0.76}
      />
    </mesh>
  )
}

// Complete Rubik's Cube
function RubiksCube() {
  const groupRef = useRef<THREE.Group>(null!)
  const [isHovered, setIsHovered] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0.2)

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire cube with variable speed
      groupRef.current.rotation.x += rotationSpeed * 0.01
      groupRef.current.rotation.y += rotationSpeed * 0.015

      // Add subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Generate all cube positions for a 3x3x3 Rubik's Cube
  const positions: [number, number, number][] = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Skip the inner cube (not visible)
        if (Math.abs(x) !== 1 && Math.abs(y) !== 1 && Math.abs(z) !== 1) continue
        positions.push([x, y, z])
      }
    }
  }

  const handleClick = () => {
    setRotationSpeed((prev) => (prev === 0.2 ? 1.5 : 0.2))
  }

  return (
    <group
      ref={groupRef}
      scale={2.2}
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {positions.map((pos, index) => (
        <CubePiece
          key={index}
          position={pos}
          rotationOffset={[index * 0.5, index * 0.3, index * 0.7]}
          isHovered={isHovered}
        />
      ))}
    </group>
  )
}

function Scene({ interactive = true }: { interactive?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      <DynamicLights />
      <ReflectiveSphere />

      <RubiksCube />

      <Environment preset="city" background={false} />
      <OrbitControls
        enableZoom={interactive}
        enablePan={interactive}
        enableRotate={interactive}
        autoRotate={!interactive}
        autoRotateSpeed={interactive ? 0 : 1.2}
        maxPolarAngle={Math.PI / 1.2}
        minPolarAngle={Math.PI / 6}
        maxDistance={interactive ? 15 : 8}
        minDistance={interactive ? 3 : 5}
      />
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-b from-gray-800 to-black rounded-md animate-pulse shadow-lg"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-gray-600 to-gray-900 rounded-md animate-bounce shadow-md"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
      </div>
    </div>
  )
}

export default function RubiksCubeModel({
  size = 320,
  autoRotate = false,
  className = "",
  interactive = true,
}: RubiksCubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  )
}

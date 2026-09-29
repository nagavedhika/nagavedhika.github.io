"use client"

import { Component, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { Group, MathUtils } from 'three'

const palette = { shell: '#eff3f7', visor: '#080b10', metal: '#8b96a7', light: '#abd5ed' }

function Robot({ greeting }: { greeting: boolean }) {
  const group = useRef<Group>(null)
  const head = useRef<Group>(null)
  const arm = useRef<Group>(null)
  const eyes = useRef<Group>(null)
  useFrame(({ clock, pointer }, delta) => {
    const time = clock.getElapsedTime()
    if (group.current) group.current.position.y = Math.sin(time * 1.7) * 0.05
    if (head.current) {
      head.current.rotation.y = MathUtils.damp(head.current.rotation.y, pointer.x * 0.35, 4, delta)
      head.current.rotation.z = Math.sin(time * 0.75) * 0.045
    }
    if (arm.current) arm.current.rotation.z = greeting ? 1.25 + Math.sin(time * 6) * 0.22 : 0.2 + Math.sin(time) * 0.1
    if (eyes.current) eyes.current.scale.y = time % 5 > 4.8 ? 0.15 : 1
  })
  return (
    <group ref={group} rotation={[0.04, -0.1, 0]}>
      <group ref={head} position={[0, 0.4, 0]}>
        <mesh scale={[0.92, 0.83, 0.7]}><sphereGeometry args={[1, 40, 32]} /><meshStandardMaterial color={palette.shell} metalness={0.65} roughness={0.22} /></mesh>
        <mesh position={[0, 0.02, 0.32]} scale={[0.78, 0.66, 0.52]}><sphereGeometry args={[1, 40, 32]} /><meshStandardMaterial color={palette.visor} metalness={0.25} roughness={0.14} /></mesh>
        {[-1, 1].map((side) => <group key={side} position={[side * 0.9, 0, 0]}><mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.28, 0.28, 0.18, 32]} /><meshStandardMaterial color={palette.metal} metalness={0.8} roughness={0.25} /></mesh><mesh position={[side * 0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.18, 0.18, 0.015, 24]} /><meshStandardMaterial color={palette.light} emissive={palette.light} emissiveIntensity={0.6} /></mesh></group>)}
        <group ref={eyes} position={[0, 0.06, 0.81]}>{[-1, 1].map((side) => <RoundedBox key={side} args={[0.22, 0.115, 0.05]} radius={0.05} smoothness={4} position={[side * 0.29, 0, 0]}><meshStandardMaterial color={palette.light} emissive={palette.light} emissiveIntensity={2} toneMapped={false} /></RoundedBox>)}</group>
      </group>
      <mesh position={[0, -0.51, 0]}><cylinderGeometry args={[0.18, 0.2, 0.4, 24]} /><meshStandardMaterial color={palette.metal} metalness={0.8} roughness={0.25} /></mesh>
      <mesh position={[0, -0.93, 0]} scale={[0.58, 0.59, 0.4]}><sphereGeometry args={[1, 32, 24]} /><meshStandardMaterial color={palette.shell} metalness={0.5} roughness={0.25} /></mesh>
      <mesh position={[0, -0.8, 0.4]}><sphereGeometry args={[0.07, 20, 20]} /><meshStandardMaterial color={palette.light} emissive={palette.light} emissiveIntensity={2} /></mesh>
      <group ref={arm} position={[-0.55, -0.65, 0]}><mesh position={[0, -0.25, 0]}><capsuleGeometry args={[0.13, 0.32, 6, 14]} /><meshStandardMaterial color={palette.shell} metalness={0.5} roughness={0.2} /></mesh></group>
      <mesh position={[0.62, -0.9, 0]} rotation={[0, 0, 0.2]}><capsuleGeometry args={[0.13, 0.32, 6, 14]} /><meshStandardMaterial color={palette.shell} metalness={0.5} roughness={0.2} /></mesh>
    </group>
  )
}

function Fallback() { return <Image src="/images/nova-hero.png" alt="Nova" fill sizes="128px" className="rounded-xl object-cover object-top" /> }

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <Fallback /> : this.props.children }
}

export default function NovaScene({ greeting = true }: { greeting?: boolean }) {
  return <SceneBoundary><Canvas camera={{ position: [0, 0, 4.3], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={<Fallback />} aria-hidden="true"><ambientLight intensity={1.5} /><directionalLight position={[3, 5, 5]} intensity={4} color={palette.shell} /><directionalLight position={[-4, 1, 1]} intensity={3} color={palette.light} /><Robot greeting={greeting} /></Canvas></SceneBoundary>
}

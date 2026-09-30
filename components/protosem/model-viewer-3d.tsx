"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  RotateCcw,
  Play,
  Pause,
  Box,
  Sun,
  Maximize2,
  Minimize2,
  Download,
  HelpCircle,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ModelViewer3DProps {
  src: string
  title?: string
  subtitle?: string
  fallbackImage?: string
  downloadUrl?: string
}

export function ModelViewer3D({
  src,
  title = "3D Printed Prototype Model",
  subtitle = "Interactive 360° GLB CAD Model · Steve Harrington Figurine",
  downloadUrl = "/photos/06week/vedhi.stl"
}: ModelViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'vibrant'>('studio')
  const [isFullscreen, setIsFullscreen] = useState(false)

  // References to keep control of Three.js objects
  const controlsRef = useRef<OrbitControls | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const initialCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 50, 150))
  const initialTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 40, 0))
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([])
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    setLoading(true)
    setError(null)

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x0a0e17)

    // Camera
    const width = container.clientWidth || 800
    const height = container.clientHeight || 520
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2000)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 1.6
    // Allow full 360 degree rotation from all angles (overhead to underneath)
    controls.minPolarAngle = 0.05
    controls.maxPolarAngle = Math.PI - 0.05
    controls.minDistance = 20
    controls.maxDistance = 600

    // Pause auto-rotate on user interaction
    controls.addEventListener('start', () => {
      // User grabbed the model
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(0xabd5ed, 0x1a202c, 0.85)
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 1.8)
    keyLight.position.set(70, 160, 110)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.camera.near = 10
    keyLight.shadow.camera.far = 450
    keyLight.shadow.bias = -0.0005
    scene.add(keyLight)
    keyLightRef.current = keyLight

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.9)
    fillLight.position.set(-80, 120, 80)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    rimLight.position.set(0, 150, -110)
    scene.add(rimLight)

    // Build plate / Ground grid
    const gridHelper = new THREE.GridHelper(160, 32, 0x38bdf8, 0x223247)
    gridHelper.position.y = -0.05
    scene.add(gridHelper)

    // Circular pedestal
    const pedestalGeo = new THREE.CylinderGeometry(85, 88, 3, 48)
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.2
    })
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat)
    pedestal.position.y = -1.5
    pedestal.receiveShadow = true
    scene.add(pedestal)

    // Shadow receiver plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(240, 240)
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 })
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = 0.01
    shadowPlane.receiveShadow = true
    scene.add(shadowPlane)

    // Load GLB
    const loader = new GLTFLoader()
    materialsRef.current = []

    loader.load(
      src,
      (gltf) => {
        const model = gltf.scene

        // Ensure upright standing orientation
        // If depth (Z) is significantly larger than height (Y), rotate to stand upright
        const initialBox = new THREE.Box3().setFromObject(model)
        const initialSize = initialBox.getSize(new THREE.Vector3())
        if (initialSize.z > initialSize.y * 1.25) {
          model.rotation.x = -Math.PI / 2
          model.updateMatrixWorld(true)
        }

        // Recompute bounds after orientation
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        // Place feet base on grid at y=0, centered horizontally
        model.position.x = -center.x
        model.position.y = -box.min.y
        model.position.z = -center.z

        // Traverse meshes for shadows & material styling
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh
            m.castShadow = true
            m.receiveShadow = true

            // Silk PLA appearance matching the real Stranger Things figurine
            const mat = new THREE.MeshStandardMaterial({
              color: 0xf1efe9,
              roughness: 0.32,
              metalness: 0.06,
              wireframe: wireframe
            })
            m.material = mat
            materialsRef.current.push(mat)
          }
        })

        scene.add(model)

        // Set camera position and target centered at figurine chest
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5
        cameraDistance = Math.max(cameraDistance, 140)

        const camPos = new THREE.Vector3(maxDim * 0.25, size.y * 0.6, cameraDistance)
        const targetPos = new THREE.Vector3(0, size.y * 0.5, 0)

        camera.position.copy(camPos)
        controls.target.copy(targetPos)
        initialCamPosRef.current.copy(camPos)
        initialTargetRef.current.copy(targetPos)

        controls.update()
        setLoading(false)
      },
      (xhr) => {
        if (xhr.total > 0) {
          setProgress(Math.round((xhr.loaded / xhr.total) * 100))
        }
      },
      (err) => {
        console.error('Error loading 3D GLB model:', err)
        setError('Failed to load 3D model')
        setLoading(false)
      }
    )

    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [src])

  // Update controls auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
    }
  }, [autoRotate])

  // Update wireframe
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.wireframe = wireframe
    })
  }, [wireframe])

  // Update lighting preset
  useEffect(() => {
    if (keyLightRef.current && sceneRef.current) {
      if (lightingPreset === 'vibrant') {
        keyLightRef.current.color.setHex(0x38bdf8)
        keyLightRef.current.intensity = 2.4
      } else {
        keyLightRef.current.color.setHex(0xfff6ea)
        keyLightRef.current.intensity = 1.8
      }
    }
  }, [lightingPreset])

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.copy(initialCamPosRef.current)
      controlsRef.current.target.copy(initialTargetRef.current)
      controlsRef.current.update()
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <div className="my-7 flex flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card/80 shadow-2xl backdrop-blur-md">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/30 px-5 py-3.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3" /> Interactive 3D Model
            </span>
            <span className="text-xs text-muted-foreground">GLB / STL</span>
          </div>
          <h4 className="text-base font-semibold text-foreground tracking-tight">{title}</h4>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
            className="h-8 gap-1.5 text-xs"
            title={autoRotate ? "Pause 360° auto-rotation" : "Start 360° auto-rotation"}
          >
            {autoRotate ? <Pause className="size-3.5 text-primary" /> : <Play className="size-3.5" />}
            <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Rotate'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetCamera}
            className="h-8 gap-1.5 text-xs"
            title="Reset camera angle"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button
            variant={wireframe ? "secondary" : "outline"}
            size="sm"
            onClick={() => setWireframe(!wireframe)}
            className="h-8 gap-1.5 text-xs"
            title="Toggle CAD mesh wireframe"
          >
            <Box className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Wireframe</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setLightingPreset(lightingPreset === 'studio' ? 'vibrant' : 'studio')}
            className="h-8 gap-1.5 text-xs"
            title="Switch lighting ambiance"
          >
            <Sun className="size-3.5" />
            <span className="hidden sm:inline">{lightingPreset === 'studio' ? 'Studio' : 'Cyber'}</span>
          </Button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground hover:bg-muted hover:text-foreground transition-all"
              title="Download 3D CAD STL file"
            >
              <Download className="size-3.5 text-primary" />
              <span className="hidden sm:inline">STL</span>
            </a>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 size-8 p-0"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </Button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#090d16] via-[#0d131f] to-[#080c14]"
      >
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/85 backdrop-blur-sm">
            <div className="relative size-12">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <div className="size-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-sm font-medium text-foreground">Loading 3D Prototype...</span>
              <span className="font-mono text-xs text-primary">{progress > 0 ? `${progress}%` : 'Parsing geometry mesh'}</span>
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/90 p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Floating Interaction Guide Badge */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-lg backdrop-blur-md">
          <HelpCircle className="size-3.5 text-primary" />
          <span className="hidden sm:inline">Drag to rotate 360° · Scroll to zoom · Right-click to pan</span>
          <span className="sm:hidden">Touch & drag to inspect 360°</span>
        </div>

        {/* Dimension & Material Badge */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground shadow-lg backdrop-blur-md">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>FDM PLA · 0.2mm Layer Resolution</span>
        </div>
      </div>

      {/* Bottom Information Caption */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border/70 bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary shrink-0" />
          <span>Complete 3D digital asset reconstructed from <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">vedhi.stl</code> and serialized into high-performance <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">vedhi.glb</code></span>
        </span>
        <span className="font-mono text-[11px] text-primary/80">Full OrbitControls · 360° Free Pitch/Yaw</span>
      </div>
    </div>
  )
}

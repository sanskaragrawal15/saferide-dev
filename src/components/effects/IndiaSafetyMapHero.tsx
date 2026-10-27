'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { INDIA_GEO_JSON } from './indiaGeoJson'

interface IndiaSafetyMapHeroProps {
  children?: React.ReactNode
}

export function IndiaSafetyMapHero({ children }: IndiaSafetyMapHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Geographic center & projection scale
    const C_LON = 79.0
    const C_LAT = 22.6
    const K = 2.9
    const proj = (lon: number, lat: number): [number, number] => [(lon - C_LON) * K, (lat - C_LAT) * K]

    // GeoJSON centroid offset to center India at (0, 0, 0) in 3D
    const OFFSET_X = 10.9
    const OFFSET_Z = -2.0

    /* ---------- Renderer ---------- */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x060806, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060806, 0.0022)
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 2000)

    // Brand Dual-Tone Palette (Obsidian + Olive Sage from Logo)
    const BRAND_SAGE = 0xa2bd86
    const BRAND_SAGE_SOFT = 0xd6ebc6
    const BRAND_PINE = 0x445b42
    const BRAND_OBSIDIAN = 0x060806

    // Atmospheric architectural lighting
    scene.add(new THREE.HemisphereLight(BRAND_SAGE_SOFT, BRAND_OBSIDIAN, 0.75))
    
    const sun = new THREE.DirectionalLight(0xffffff, 1.25)
    sun.position.set(-60, 150, 80)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    Object.assign(sun.shadow.camera, { left: -110, right: 110, top: 110, bottom: -110, near: 10, far: 400 })
    sun.shadow.bias = -0.0006
    scene.add(sun)

    const rim = new THREE.PointLight(BRAND_SAGE, 0.85, 380, 2)
    rim.position.set(90, 60, -70)
    scene.add(rim)

    // Soft shadow receiving ground
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), new THREE.ShadowMaterial({ opacity: 0.5 }))
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.02
    ground.receiveShadow = true
    scene.add(ground)

    const world = new THREE.Group()
    scene.add(world)

    /* ---------- Materials: Dark Obsidian Forest Top + Satin Sheen + Sage Accents ---------- */
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x141f16, // Dark obsidian pine slate matching the logo palette
      roughness: 0.36,
      metalness: 0.12,
    })
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x090f0a, // Deep charcoal obsidian side
      roughness: 0.78,
      metalness: 0.04,
    })
    const borderMat = new THREE.LineBasicMaterial({
      color: 0x2e4433, // Fine state boundary hairline
      transparent: true,
      opacity: 0.85,
    })
    const countryMat = new THREE.LineBasicMaterial({
      color: BRAND_SAGE, // Olive Sage brand color for the outer border
      transparent: true,
      opacity: 0.95,
    })

    const DEPTH = 3.6
    const TOP = DEPTH + 0.32

    function ringToVec(ring: [number, number][]) {
      return ring.map(([lo, la]) => {
        const [x, y] = proj(lo, la)
        return new THREE.Vector2(x - OFFSET_X, y - OFFSET_Z)
      })
    }

    function addPolygon(rings: [number, number][][]) {
      if (!rings || !rings[0] || rings[0].length < 3) return
      const shape = new THREE.Shape(ringToVec(rings[0]))
      for (let i = 1; i < rings.length; i++) {
        if (rings[i] && rings[i].length >= 3) {
          shape.holes.push(new THREE.Path(ringToVec(rings[i])))
        }
      }

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.2,
        bevelSegments: 1,
        curveSegments: 1,
      })
      const mesh = new THREE.Mesh(geo, [capMat, sideMat])
      mesh.rotation.x = -Math.PI / 2
      mesh.castShadow = true
      mesh.receiveShadow = true
      world.add(mesh)

      rings.forEach((ring) => {
        const pts = ring.map(([lo, la]) => {
          const [x, y] = proj(lo, la)
          return new THREE.Vector3(x - OFFSET_X, TOP + 0.02, -(y - OFFSET_Z))
        })
        world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), borderMat))
      })
    }

    const features = INDIA_GEO_JSON.features || []
    features.forEach((f: any) => {
      const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
      polys.forEach(addPolygon)
    })

    /* National border outline */
    features.forEach((f: any) => {
      const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
      polys.forEach((p: any) => {
        if (!p[0] || p[0].length < 60) return
        const pts = p[0].map(([lo, la]: [number, number]) => {
          const [x, y] = proj(lo, la)
          return new THREE.Vector3(x - OFFSET_X, TOP + 0.06, -(y - OFFSET_Z))
        })
        world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), countryMat))
      })
    })

    /* ---------- Major City Beacons ---------- */
    const cities: [string, number, number, number][] = [
      ['Delhi', 77.2, 28.6, 1],
      ['Mumbai', 72.9, 19.1, 1],
      ['Kolkata', 88.4, 22.6, 1],
      ['Chennai', 80.3, 13.1, 1],
      ['Bengaluru', 77.6, 12.97, 1],
      ['Hyderabad', 78.5, 17.4, 1],
      ['Ahmedabad', 72.6, 23.0, 1],
      ['Pune', 73.9, 18.5, 1],
      ['Jaipur', 75.8, 26.9, 2],
      ['Lucknow', 80.9, 26.8, 2],
      ['Patna', 85.1, 25.6, 2],
      ['Guwahati', 91.7, 26.1, 2],
      ['Kochi', 76.3, 9.9, 2],
      ['Bhopal', 77.4, 23.3, 2],
      ['Nagpur', 79.1, 21.1, 2],
      ['Chandigarh', 76.8, 30.7, 2],
      ['Bhubaneswar', 85.8, 20.3, 2],
      ['Visakhapatnam', 83.3, 17.7, 2],
      ['Srinagar', 74.8, 34.1, 2],
      ['Raipur', 81.6, 21.3, 2],
    ]

    const cityPos: Record<string, THREE.Vector3> = {}
    const pulses: { ring: THREE.Mesh; phase: number; big: boolean }[] = []
    const signals: { s: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number; speed: number }[] = []

    cities.forEach(([n, lo, la, tier], i) => {
      const [x, y] = proj(lo, la)
      const posX = x - OFFSET_X
      const posZ = -(y - OFFSET_Z)
      const p = new THREE.Vector3(posX, TOP + 0.3, posZ)
      cityPos[n] = p
      const big = tier === 1
      const h = big ? 4.5 : 2.2

      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, h, 6),
        new THREE.MeshBasicMaterial({ color: BRAND_SAGE })
      )
      pillar.position.set(posX, TOP + 0.3 + h / 2, posZ)
      world.add(pillar)

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(big ? 0.28 : 0.16, 12, 12),
        new THREE.MeshBasicMaterial({ color: BRAND_SAGE_SOFT })
      )
      head.position.set(posX, TOP + 0.3 + h, posZ)
      world.add(head)

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(big ? 0.75 : 0.5, big ? 0.9 : 0.62, 36),
        new THREE.MeshBasicMaterial({ color: BRAND_SAGE, transparent: true, opacity: 0.65, side: THREE.DoubleSide })
      )
      ring.rotation.x = -Math.PI / 2
      ring.position.set(posX, TOP + 0.34, posZ)
      world.add(ring)
      pulses.push({ ring, phase: i * 0.4, big })
    })

    const pairs: [string, string][] = [
      ['Delhi', 'Mumbai'],
      ['Delhi', 'Kolkata'],
      ['Mumbai', 'Chennai'],
      ['Chennai', 'Kolkata'],
      ['Bengaluru', 'Hyderabad'],
      ['Delhi', 'Chennai'],
      ['Mumbai', 'Kolkata'],
      ['Delhi', 'Guwahati'],
      ['Hyderabad', 'Kolkata'],
      ['Ahmedabad', 'Delhi'],
      ['Pune', 'Bengaluru'],
      ['Kochi', 'Bengaluru'],
      ['Jaipur', 'Mumbai'],
      ['Lucknow', 'Patna'],
      ['Patna', 'Guwahati'],
      ['Nagpur', 'Hyderabad'],
      ['Chandigarh', 'Delhi'],
      ['Srinagar', 'Delhi'],
      ['Bhubaneswar', 'Kolkata'],
    ]

    const sigGeo = new THREE.SphereGeometry(0.12, 8, 8)
    const sigMat = new THREE.MeshBasicMaterial({ color: 0xf5f8f2 })

    pairs.forEach(([a, b], idx) => {
      const A = cityPos[a]
      const B = cityPos[b]
      if (!A || !B) return
      const mid = A.clone().add(B).multiplyScalar(0.5)
      mid.y += A.distanceTo(B) * 0.16
      const curve = new THREE.QuadraticBezierCurve3(A, mid, B)
      world.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
          new THREE.LineBasicMaterial({ color: BRAND_SAGE, transparent: true, opacity: 0.4 })
        )
      )
      const s = new THREE.Mesh(sigGeo, sigMat)
      world.add(s)
      signals.push({ s, curve, t: (idx * 0.29) % 1, speed: 0.10 + (idx % 6) * 0.02 })
    })

    /* ---------- Responsive Full-Page Fit Calculation ---------- */
    let currentDist = 175
    function resize() {
      const w = container ? container.clientWidth : window.innerWidth
      const h = container ? container.clientHeight : window.innerHeight
      renderer.setSize(w, h, false)
      const aspect = w / h
      camera.aspect = aspect

      // Calculate camera distance so India gracefully fills screen on all aspect ratios
      if (aspect < 0.8) {
        // Mobile portrait: fit full north-south height
        camera.fov = 36
        currentDist = 205 / Math.max(aspect, 0.52)
      } else if (aspect < 1.3) {
        // Tablet / Square
        camera.fov = 32
        currentDist = 190
      } else {
        // Desktop / Ultrawide
        camera.fov = 30
        currentDist = 172
      }
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)
    resize()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }

    const onPointerMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5
      target.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    let animId = 0
    function frame() {
      const t = clock.getElapsedTime()
      cur.x += (target.x - cur.x) * 0.04
      cur.y += (target.y - cur.y) * 0.04

      // Gentle spatial rotation around geographic center
      world.rotation.y = (reduce ? 0 : Math.sin(t * 0.12) * 0.05) + cur.x * 0.22

      const pitch = 0.88 - cur.y * 0.08
      camera.position.set(
        Math.sin(-0.25) * Math.cos(pitch) * currentDist,
        Math.sin(pitch) * currentDist,
        Math.cos(-0.25) * Math.cos(pitch) * currentDist
      )
      // Camera looks directly at the geographic center of India
      camera.lookAt(0, TOP * 0.5, 0)

      pulses.forEach((p) => {
        const k = (Math.sin(t * 1.6 + p.phase) + 1) / 2
        const s = 1 + k * (p.big ? 0.85 : 0.55)
        p.ring.scale.set(s, s, s)
        ;(p.ring.material as THREE.MeshBasicMaterial).opacity = 0.65 * (1 - k * 0.7)
      })

      signals.forEach((sg) => {
        if (!reduce) sg.t = (sg.t + sg.speed * 0.006) % 1
        sg.s.position.copy(sg.curve.getPointAt(sg.t))
      })

      renderer.render(scene, camera)
      animId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-[#060806] select-none">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />

      {/* Clean Architectural Shadow Edge - Zero Neon Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_55%,rgba(6,8,6,0.85)_100%)]" />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  )
}

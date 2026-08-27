import './style.css'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

document.querySelector('#app').innerHTML = `
  <main class="site-shell">
    <header class="site-header">
      <a class="site-mark" href="#orbital-study">GROUND STATE</a>
      <a href="#about">ABOUT THE STUDY</a>
    </header>

    <section class="page-intro" id="orbital-study">
      <p>INTERACTIVE SYSTEM / V1</p>
      <h1>GROUND<br><em>STATE</em></h1>
      <p class="intro-description">An interactive system translating live earthquake activity into movement and deformation. The system responds to seismic activity and the person interacting with it.</p>
      <p class="invitation">The ground is never completely still.</p>
    </section>

    <section class="orb-stage" id="orb-stage" aria-label="Interactive reflective earthquake orb">
      <canvas id="orb-canvas"></canvas>
      <aside class="telemetry" aria-label="Earthquake telemetry">
        <div class="telemetry-title">EARTHQUAKE ACTIVITY</div>
        <div class="telemetry-row"><span>Events</span><strong id="event-count">Loading</strong></div>
        <div class="telemetry-row"><span>Strongest</span><strong id="strongest-event">Loading</strong></div>
        <div class="telemetry-live"><i id="feed-dot"></i><span id="feed-status">CONNECTING</span><span id="feed-updated">--:--:--</span></div>
      </aside>
      <button class="fullscreen-toggle" id="fullscreen-toggle" type="button" aria-label="Enter fullscreen">FULLSCREEN</button>
    </section>

    <section class="experience-control" aria-live="polite">
      <button class="experience-button" id="experience-button" type="button">Experience an Earthquake</button>
      <span class="experience-status" id="experience-status">Use recent earthquakes as they arrive.</span>
    </section>

    <section class="seismic-controls" aria-label="Seismic controls">
      <button class="mode-toggle" id="mode-toggle" type="button">API</button>
      <label class="intensity-control" for="intensity-slider">
        <span>CALM</span>
        <input id="intensity-slider" type="range" min="0" max="100" value="35" disabled>
        <span>MAJOR</span>
      </label>
    </section>

    <p class="api-note">This orb responds to live earthquake activity from the <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson" target="_blank" rel="noreferrer">USGS Earthquake Hazards Program API</a>.</p>

    <section class="info-grid" id="about">
      <article class="info-block rules">
        <p class="section-label">01 / RULES</p>
        <h2>System behavior</h2>
        <ol>
          <li>Earthquake activity changes the intensity of movement.</li>
          <li>Recent and stronger events create deeper, faster ripples.</li>
          <li>The system gradually returns toward a resting state.</li>
          <li>Dragging the orb changes its orientation without moving its position.</li>
        </ol>
      </article>

      <article class="info-block controls">
        <p class="section-label">02 / CONTROLS</p>
        <h2>Stay with the surface</h2>
        <p class="gesture-label">GESTURE / ROTATE</p>
        <dl>
          <dt>Hold + drag</dt><dd>Across the surface.</dd>
          <dt>Horizontal</dt><dd>Changes orientation.</dd>
          <dt>Vertical</dt><dd>Changes viewing angle.</dd>
          <dt>Manual</dt><dd>Switch modes and pull the slider toward major.</dd>
        </dl>
      </article>

      <article class="info-block live-info">
        <p class="section-label">03 / LIVE EARTHQUAKE INFORMATION</p>
        <h2>What it is hearing</h2>
        <div class="live-grid">
          <span>Events today</span><strong id="detail-event-count">--</strong>
          <span>Strongest event</span><strong id="detail-strongest-event">--</strong>
          <span>Latest location</span><strong id="latest-location">--</strong>
          <span>Depth</span><strong id="latest-depth">--</strong>
        </div>
        <p class="source-note">DATA SOURCE / USGS EARTHQUAKE HAZARDS PROGRAM</p>
      </article>

      <article class="info-block status-info">
        <p class="section-label">04 / SYSTEM STATUS</p>
        <h2><span class="status-dot"></span><span id="system-status">CALM</span></h2>
        <p class="note-copy">Live sensors shape the surface. Manual input is available above.</p>
      </article>

      <article class="info-block reflection">
        <p class="section-label">05 / V1 REFLECTION</p>
        <h2>The surface listens to the planet.</h2>
        <p class="reflection-copy">The system can now combine live seismic data, a reflective material, and direct human input in one continuous experience. Before this, the experiments could show isolated motion, but not a surface that responds to the world and the person at once. The tendency of the orb to absorb a disturbance and let the light fold across it feels most like my intention. I wanted the interaction to feel physical without making the object travel across the screen. The effect drifts into generic territory when the ripple becomes only a visual signal for intensity. In V2, I will make the deformation respond to the earthquake&apos;s distance as well as its magnitude.</p>
      </article>

      <article class="info-block atmosphere">
        <p class="section-label">06 / ATMOSPHERE</p>
        <h2>Reflective tension</h2>
        <p class="reflection-copy">A dark field, restrained glow, and reflected light keep the surface feeling physical while seismic motion remains visible.</p>
      </article>

      <article class="info-block chart-block">
        <div class="chart-heading">
          <div>
            <p class="section-label">07 / SEISMIC SCALE</p>
            <h2>How earthquakes are categorized</h2>
          </div>
          <span class="chart-period">LAST 24 HOURS</span>
        </div>
        <div class="quake-chart" id="quake-chart" aria-label="Earthquakes categorized by magnitude"></div>
        <div class="chart-axis">
          <span>MICRO</span><span>MINOR</span><span>LIGHT</span><span>MODERATE</span><span>STRONG</span>
        </div>
      </article>
    </section>

    <footer class="site-footer">
      <span>GROUND STATE / V1</span>
      <span>BUILT BY TATE / 2026</span>
    </footer>
  </main>
`

const canvas = document.querySelector('#orb-canvas')
const stage = document.querySelector('#orb-stage')
const fullscreenToggle = document.querySelector('#fullscreen-toggle')
const modeToggle = document.querySelector('#mode-toggle')
const intensitySlider = document.querySelector('#intensity-slider')
const experienceButton = document.querySelector('#experience-button')
const experienceStatus = document.querySelector('#experience-status')
const eventCount = document.querySelector('#event-count')
const strongestEvent = document.querySelector('#strongest-event')
const detailEventCount = document.querySelector('#detail-event-count')
const detailStrongestEvent = document.querySelector('#detail-strongest-event')
const latestLocation = document.querySelector('#latest-location')
const latestDepth = document.querySelector('#latest-depth')
const systemStatus = document.querySelector('#system-status')
const quakeChart = document.querySelector('#quake-chart')
const feedDot = document.querySelector('#feed-dot')
const feedStatus = document.querySelector('#feed-status')
const feedUpdated = document.querySelector('#feed-updated')

let recentEarthquakes = []
let experienceTimer = null
let experienceStartedAt = 0
let experienceEventIndex = 0
let experienceWasManual = false
const experienceDuration = 30000

// --- Scene ---

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
camera.position.set(0, 0.05, 8.6)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.15

const environment = new RoomEnvironment(renderer)
const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(environment, 0.04).texture
environment.dispose()
pmrem.dispose()

// --- Room backdrop ---

const room = new THREE.Group()
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x07120f })
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x040a08 })

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(18, 14), wallMaterial)
backWall.position.set(0, 2.2, -5.5)
room.add(backWall)

const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 14), floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.position.set(0, -3.5, -0.5)
room.add(floor)

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), wallMaterial)
leftWall.rotation.y = Math.PI / 2
leftWall.position.set(-6, 2.2, -0.5)
room.add(leftWall)

const rightWall = leftWall.clone()
rightWall.rotation.y = -Math.PI / 2
rightWall.position.x = 6
room.add(rightWall)

const lightPanelMaterial = new THREE.MeshBasicMaterial({ color: 0x8ca9a0, transparent: true, opacity: 0.13 })
for (const [x, y, width, height] of [[-3.3, 1.4, 0.08, 7], [2.6, 0.7, 0.05, 5], [0, -1.8, 6.5, 0.025]]) {
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(width, height), lightPanelMaterial)
  panel.position.set(x, y, -5.44)
  room.add(panel)
}

const buildingLineMaterial = new THREE.LineBasicMaterial({ color: 0x020806, transparent: true, opacity: 0.78 })
const buildings = new THREE.Group()

function addBuildingOutline(x, width, height, roofHeight = 0) {
  const base = -3.48
  const left = x - width / 2
  const right = x + width / 2
  const top = base + height
  const points = [
    new THREE.Vector3(left, base, -5.34),
    new THREE.Vector3(left, top, -5.34),
    new THREE.Vector3(x, top + roofHeight, -5.34),
    new THREE.Vector3(right, top, -5.34),
    new THREE.Vector3(right, base, -5.34),
  ]
  buildings.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), buildingLineMaterial))
  if (roofHeight > 0) {
    const antenna = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, top + roofHeight, -5.34),
      new THREE.Vector3(x, top + roofHeight + 0.34, -5.34),
    ])
    buildings.add(new THREE.Line(antenna, buildingLineMaterial))
  }
}

addBuildingOutline(-4.8, 1.05, 2.2)
addBuildingOutline(-3.45, 0.78, 3.05, 0.22)
addBuildingOutline(3.65, 1.15, 2.55)
addBuildingOutline(5.05, 0.72, 1.75, 0.18)
room.add(buildings)

// --- Orb ---

const seismic = { intensity: 0.12, speed: 2.4, manual: false }

function createEarthTexture() {
  const textureCanvas = document.createElement('canvas')
  textureCanvas.width = 2048
  textureCanvas.height = 1024
  const context = textureCanvas.getContext('2d')
  const width = textureCanvas.width
  const height = textureCanvas.height
  const project = ([longitude, latitude]) => [(longitude + 180) / 360 * width, (90 - latitude) / 180 * height]
  const continent = (points) => {
    context.beginPath()
    points.map(project).forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
    context.closePath()
    context.fill()
    context.stroke()
  }

  const oceanGradient = context.createLinearGradient(0, 0, 0, height)
  oceanGradient.addColorStop(0, '#071923')
  oceanGradient.addColorStop(.5, '#0a2930')
  oceanGradient.addColorStop(1, '#041016')
  context.fillStyle = oceanGradient
  context.fillRect(0, 0, width, height)

  context.strokeStyle = 'rgba(113, 191, 184, .14)'
  context.lineWidth = 2
  for (let longitude = -150; longitude <= 150; longitude += 30) {
    const [x] = project([longitude, 0])
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()
  }
  for (let latitude = -60; latitude <= 60; latitude += 30) {
    const [, y] = project([0, latitude])
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }

  context.fillStyle = '#617d6e'
  context.strokeStyle = '#9db58a'
  context.lineWidth = 3
  continent([[-168, 63], [-145, 71], [-125, 65], [-104, 54], [-91, 49], [-82, 27], [-98, 15], [-117, 22], [-130, 39], [-153, 47]])
  continent([[-81, 12], [-66, 8], [-58, -10], [-62, -32], [-72, -55], [-81, -35], [-87, -8]])
  continent([[-12, 36], [8, 42], [31, 35], [47, 22], [39, 5], [20, -7], [4, 5], [-11, 20]])
  continent([[48, 28], [75, 39], [108, 55], [143, 48], [154, 25], [130, 8], [112, 17], [86, 7], [62, 12]])
  continent([[113, -12], [153, -17], [145, -39], [119, -36]])
  continent([[-58, -65], [-18, -64], [26, -70], [45, -78], [-40, -80]])

  context.fillStyle = 'rgba(238, 246, 239, .82)'
  context.strokeStyle = 'rgba(255, 255, 255, .76)'
  context.lineWidth = 2
  continent([[-180, 90], [180, 90], [180, 78], [145, 80], [110, 78], [72, 81], [32, 78], [-5, 80], [-46, 78], [-92, 80], [-132, 78], [-180, 80]])
  continent([[-180, -90], [180, -90], [180, -78], [144, -80], [103, -78], [61, -81], [20, -78], [-21, -82], [-64, -78], [-105, -80], [-145, -78], [-180, -80]])

  const faultLines = [
    [[-150, 62], [-128, 38], [-112, 10], [-82, -20], [-72, -48]],
    [[-82, 12], [-72, 2], [-62, -14], [-56, -34], [-50, -54]],
    [[-42, 64], [-29, 42], [-18, 24], [-8, 4], [8, -17], [24, -38]],
    [[58, 32], [75, 18], [91, 7], [108, -5], [133, -21]],
    [[-178, -4], [-151, -18], [-126, -30], [-100, -42]],
    [[-8, 52], [20, 48], [45, 43], [72, 41], [101, 36], [132, 28]],
  ]
  context.strokeStyle = '#f0bd70'
  context.shadowColor = '#e8674f'
  context.shadowBlur = 14
  context.lineWidth = 5
  faultLines.forEach((line) => {
    context.beginPath()
    line.map(project).forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
    context.stroke()
  })
  context.shadowBlur = 0
  context.strokeStyle = 'rgba(255, 222, 143, .9)'
  context.lineWidth = 2
  faultLines.forEach((line) => {
    context.beginPath()
    line.map(project).forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
    context.stroke()
  })

  const texture = new THREE.CanvasTexture(textureCanvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const orbMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x9aa59b,
  map: createEarthTexture(),
  metalness: 0.72,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.06,
  envMapIntensity: 2.5,
  iridescence: 0.16,
  iridescenceIOR: 1.35,
})

orbMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 }
  shader.uniforms.uIntensity = { value: seismic.intensity }
  shader.uniforms.uSpeed = { value: seismic.speed }
  shader.vertexShader = `uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;
  ${shader.vertexShader}`
  orbMaterial.userData.shader = shader
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      #include <begin_vertex>
      float waveA = sin(position.y * 8.0 + position.x * 3.5 + uTime * uSpeed);
      float waveB = sin(position.z * 12.0 - position.y * 4.0 + uTime * uSpeed * 1.7);
      float waveC = sin((position.x + position.z) * 18.0 + uTime * uSpeed * 2.3);
      float ripple = (waveA * 0.5 + waveB * 0.3 + waveC * 0.2) * uIntensity;
      transformed += objectNormal * ripple;
      vec3 rippleGradient = vec3(
        cos(position.y * 8.0 + position.x * 3.5 + uTime * uSpeed) * 1.75 + cos((position.x + position.z) * 18.0 + uTime * uSpeed * 2.3) * 3.6,
        cos(position.y * 8.0 + position.x * 3.5 + uTime * uSpeed) * 4.0 - cos(position.z * 12.0 - position.y * 4.0 + uTime * uSpeed * 1.7) * 1.2,
        cos(position.z * 12.0 - position.y * 4.0 + uTime * uSpeed * 1.7) * 3.6 + cos((position.x + position.z) * 18.0 + uTime * uSpeed * 2.3) * 3.6
      );
      objectNormal = normalize(objectNormal - rippleGradient * uIntensity * 0.22);
    `,
  )
}

const orb = new THREE.Mesh(new THREE.SphereGeometry(1.62, 128, 96), orbMaterial)
orb.rotation.set(0.14, -0.4, 0.08)
scene.add(orb)

// --- Earthquake feed ---

async function readEarthquakes() {
  try {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    if (!response.ok) throw new Error(`USGS request failed: ${response.status}`)
    const feed = await response.json()
    recentEarthquakes = feed.features

    const now = Date.now()
    const activity = feed.features.reduce((total, feature) => {
      const magnitude = Math.max(feature.properties.mag || 0, 0)
      const ageHours = Math.max((now - feature.properties.time) / 3600000, 0)
      return total + Math.pow(Math.min(magnitude / 6, 1), 2.2) * Math.exp(-ageHours / 18)
    }, 0)
    const normalizedActivity = THREE.MathUtils.clamp(activity / 4, 0, 1)
    if (!seismic.manual) {
      seismic.intensity = THREE.MathUtils.lerp(0.008, 0.06, normalizedActivity)
      seismic.speed = THREE.MathUtils.lerp(2.5, 10, THREE.MathUtils.clamp(activity / 3, 0, 1))
    }

    const strongestMagnitude = feed.features.reduce(
      (strongest, feature) => Math.max(strongest, feature.properties.mag || 0),
      0,
    )

    const categories = [
      { label: 'Micro', min: 0, max: 2 },
      { label: 'Minor', min: 2, max: 4 },
      { label: 'Light', min: 4, max: 5 },
      { label: 'Moderate', min: 5, max: 6 },
      { label: 'Strong', min: 6, max: Infinity },
    ]
    const categoryCounts = categories.map(({ min, max }) =>
      feed.features.filter((feature) => {
        const magnitude = feature.properties.mag || 0
        return magnitude >= min && magnitude < max
      }).length,
    )
    const chartMax = Math.max(...categoryCounts, 1)
    quakeChart.innerHTML = categoryCounts
      .map(
        (count, index) => `
          <div class="chart-column">
            <div class="chart-value">${count}</div>
            <div class="chart-bar" style="height: ${Math.max((count / chartMax) * 100, 4)}%"><span></span></div>
          </div>
        `,
      )
      .join('')

    eventCount.textContent = feed.features.length
    strongestEvent.textContent = `M${strongestMagnitude.toFixed(1)}`

    const latestFeature = feed.features
      .filter((feature) => feature.properties.time)
      .sort((a, b) => b.properties.time - a.properties.time)[0]
    const latestProperties = latestFeature?.properties || {}

    detailEventCount.textContent = feed.features.length
    detailStrongestEvent.textContent = `M${strongestMagnitude.toFixed(1)}`
    latestLocation.textContent = latestProperties.place || 'Unknown'
    latestDepth.textContent = latestFeature?.geometry?.coordinates?.[2]
      ? `${latestFeature.geometry.coordinates[2].toFixed(1)} km`
      : '--'
    systemStatus.textContent = normalizedActivity > 0.7 ? 'HIGH TENSION' : normalizedActivity > 0.3 ? 'ELEVATED' : 'CALM'
    feedStatus.textContent = 'CONNECTED'
    feedDot.classList.add('is-connected')
    feedUpdated.textContent = new Date().toLocaleTimeString([], { hour12: false })
  } catch (error) {
    eventCount.textContent = '--'
    strongestEvent.textContent = 'Offline'
    detailEventCount.textContent = '--'
    detailStrongestEvent.textContent = 'Offline'
    latestLocation.textContent = '--'
    latestDepth.textContent = '--'
    systemStatus.textContent = 'OFFLINE'
    feedStatus.textContent = 'OFFLINE'
    feedDot.classList.remove('is-connected')
    console.warn('Earthquake feed unavailable; using a calm baseline.', error)
  }
}
readEarthquakes()
window.setInterval(readEarthquakes, 60000)

// --- Ring, halo, dust, lighting ---

const halo = new THREE.Mesh(
  new THREE.RingGeometry(2.22, 2.225, 128),
  new THREE.MeshBasicMaterial({ color: 0xb9c8c2, transparent: true, opacity: 0.28, side: THREE.DoubleSide }),
)
halo.rotation.x = Math.PI / 2
scene.add(halo)

const dustGeometry = new THREE.BufferGeometry()
const dustPositions = new Float32Array(180 * 3)
for (let index = 0; index < dustPositions.length; index += 3) {
  const radius = 3.4 + Math.random() * 2.1
  const angle = Math.random() * Math.PI * 2
  dustPositions[index] = Math.cos(angle) * radius
  dustPositions[index + 1] = (Math.random() - 0.5) * 4.6
  dustPositions[index + 2] = Math.sin(angle) * radius - 1
}
dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
scene.add(new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xa7b8b1, size: 0.012, transparent: true, opacity: 0.45 })))

scene.add(new THREE.HemisphereLight(0xd9e4de, 0x171d1e, 1.5))
const keyLight = new THREE.DirectionalLight(0xfff1d6, 4)
keyLight.position.set(-3, 4, 5)
scene.add(keyLight)
const rimLight = new THREE.PointLight(0x8fb8b6, 16, 7)
rimLight.position.set(3, -1, 2)
scene.add(rimLight)

// --- Drag to rotate ---

let dragging = false
let lastX = 0
let lastY = 0

canvas.addEventListener('pointerdown', (event) => {
  dragging = true
  lastX = event.clientX
  lastY = event.clientY
  canvas.setPointerCapture(event.pointerId)
  canvas.classList.add('is-dragging')
})
canvas.addEventListener('pointermove', (event) => {
  if (!dragging) return
  orb.rotation.y += (event.clientX - lastX) * 0.008
  orb.rotation.x += (event.clientY - lastY) * 0.005
  lastX = event.clientX
  lastY = event.clientY
})
const releaseDrag = (event) => {
  dragging = false
  canvas.releasePointerCapture?.(event.pointerId)
  canvas.classList.remove('is-dragging')
}
canvas.addEventListener('pointerup', releaseDrag)
canvas.addEventListener('pointercancel', releaseDrag)

// --- Manual / API mode ---

modeToggle.addEventListener('click', () => {
  if (experienceTimer) stopExperience()
  seismic.manual = !seismic.manual
  intensitySlider.disabled = !seismic.manual
  modeToggle.textContent = seismic.manual ? 'MANUAL' : 'API'
  modeToggle.classList.toggle('is-manual', seismic.manual)
  intensitySlider.classList.toggle('is-active', seismic.manual)
  if (!seismic.manual) readEarthquakes()
})
intensitySlider.addEventListener('input', (event) => {
  const value = Number(event.target.value) / 100
  seismic.intensity = THREE.MathUtils.lerp(0.008, 0.16, value)
  seismic.speed = THREE.MathUtils.lerp(2.5, 14, value)
})

// --- "Experience an Earthquake" playback ---

function showExperienceEvent(feature) {
  const magnitude = Math.max(feature.properties.mag || 0, 0)
  const severity = THREE.MathUtils.clamp(magnitude / 7, 0, 1)
  seismic.intensity = THREE.MathUtils.lerp(0.035, 0.19, severity)
  seismic.speed = THREE.MathUtils.lerp(5, 18, severity)
  intensitySlider.value = Math.round(severity * 100)
  strongestEvent.textContent = `M${magnitude.toFixed(1)}`
  experienceStatus.textContent = `${feature.properties.place || 'Recent event'} / M${magnitude.toFixed(1)}`
}

function stopExperience() {
  window.clearInterval(experienceTimer)
  experienceTimer = null
  seismic.manual = experienceWasManual
  intensitySlider.disabled = !seismic.manual
  intensitySlider.classList.toggle('is-active', seismic.manual)
  modeToggle.textContent = seismic.manual ? 'MANUAL' : 'API'
  modeToggle.classList.toggle('is-manual', seismic.manual)
  experienceButton.disabled = false
  experienceButton.textContent = 'Experience an Earthquake'
  experienceStatus.textContent = 'Use recent earthquakes as they arrive.'
  intensitySlider.value = 35
  if (!seismic.manual) readEarthquakes()
}

async function startExperience() {
  if (experienceTimer) return
  if (!recentEarthquakes.length) await readEarthquakes()
  const events = recentEarthquakes
    .filter((feature) => feature.properties?.time)
    .sort((first, second) => second.properties.time - first.properties.time)
  if (!events.length) {
    experienceStatus.textContent = 'Recent earthquake data is unavailable.'
    return
  }

  experienceWasManual = seismic.manual
  seismic.manual = true
  intensitySlider.disabled = false
  intensitySlider.classList.add('is-active')
  modeToggle.textContent = 'MANUAL'
  modeToggle.classList.add('is-manual')
  experienceButton.disabled = true
  experienceStartedAt = performance.now()
  experienceEventIndex = 0
  showExperienceEvent(events[experienceEventIndex])
  experienceButton.textContent = 'Experiencing... 30s'
  experienceTimer = window.setInterval(() => {
    const elapsed = performance.now() - experienceStartedAt
    if (elapsed >= experienceDuration) {
      stopExperience()
      return
    }
    experienceEventIndex = (experienceEventIndex + 1) % events.length
    showExperienceEvent(events[experienceEventIndex])
    experienceButton.textContent = `Experiencing... ${Math.ceil((experienceDuration - elapsed) / 1000)}s`
  }, 3000)
}
experienceButton.addEventListener('click', startExperience)

// --- Fullscreen ---

fullscreenToggle.addEventListener('click', async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen()
  } else {
    await stage.requestFullscreen()
  }
})
document.addEventListener('fullscreenchange', () => {
  const isFullscreen = document.fullscreenElement === stage
  fullscreenToggle.textContent = isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'
  fullscreenToggle.setAttribute('aria-label', isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen')
})

// --- Resize / render loop ---

function resize() {
  const { clientWidth, clientHeight } = canvas
  renderer.setSize(clientWidth, clientHeight, false)
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
}
window.addEventListener('resize', resize)
resize()

function animate(time) {
  if (orbMaterial.userData.shader) {
    orbMaterial.userData.shader.uniforms.uTime.value = time * 0.001
    orbMaterial.userData.shader.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      orbMaterial.userData.shader.uniforms.uIntensity.value,
      seismic.intensity,
      0.035,
    )
    orbMaterial.userData.shader.uniforms.uSpeed.value = THREE.MathUtils.lerp(
      orbMaterial.userData.shader.uniforms.uSpeed.value,
      seismic.speed,
      0.035,
    )
  }
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

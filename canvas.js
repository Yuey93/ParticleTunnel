const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.lifetime = 800
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.lifetime --
  }
}

// Implementation
let particles
function init() {
  particles = []
}

let hue = 0
let hueRadians = 0

function generateRing() {
  setTimeout(generateRing, 100)

  hue = Math.sin(hueRadians)

  const particleCount = 40

  for (let i = 0; i < particleCount; i++) {
    // full circle = pi * 2 radians
    const radian = (Math.PI * 2) / particleCount
    const x = mouse.x
    const y = mouse.y

    particles.push(new Particle(
      x, y, 8, `hsl(${
        Math.abs (hue * 360)}, 50%, 50%)`, {
        x: Math.cos(radian * i) * 4,
        y: Math.sin(radian * i) * 4
      })
    )
  }

  hueRadians += 0.01
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  
  c.fillStyle = 'rgba(0, 0, 0, 0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((Particle, i) => {

    if (Particle.lifetime < 0){
      particles.splice(i, 1)
    } else {

      Particle.update()
    }
  })
}

init()
animate()
generateRing()

import confetti from 'canvas-confetti'
import gsap from 'gsap'
import yraAudio from '@/assets/audio/yra.mp3'

export const useCelebrate = () => {
  const celebrate = () => {
    const audio = new Audio(yraAudio)
    audio.volume = 0.5
    audio.play().catch((error) => console.log('Audio playback failed:', error))

    const duration = 8000
    const animationEnd = Date.now() + duration
    const defaults = {
      startVelocity: 32,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
      colors: ['#fb7185', '#f472b6', '#fdba74', '#fde68a', '#f9a8d4'],
    }

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    const hearts = document.querySelectorAll('.heart')
    hearts.forEach((heart) => {
      const startX = Math.random() * window.innerWidth
      const size = Math.random() * 1.4 + 0.7
      const delay = Math.random() * 1.4

      gsap.set(heart, {
        x: startX,
        y: window.innerHeight + 60,
        scale: size,
        opacity: 1,
      })

      gsap.to(heart, {
        y: -120,
        opacity: 0,
        duration: 4,
        delay,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(heart, {
            y: window.innerHeight + 60,
            opacity: 1,
          })
        },
      })
    })
  }

  return { celebrate }
}

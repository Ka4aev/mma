import { computed, onMounted, onUnmounted, ref } from 'vue'

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const startDate = new Date('2022-09-14T00:00:00')
const targetDays = 1300
const targetDate = new Date(startDate.getTime() + targetDays * MILLISECONDS_IN_DAY)

const calculateDuration = (diff) => {
  const safeDiff = Math.max(diff, 0)

  return {
    days: Math.floor(safeDiff / MILLISECONDS_IN_DAY),
    hours: Math.floor((safeDiff % MILLISECONDS_IN_DAY) / (1000 * 60 * 60)),
    minutes: Math.floor((safeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((safeDiff % (1000 * 60)) / 1000),
  }
}

export const useRelationshipTimers = () => {
  const timeElapsed = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const timeToTarget = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false })
  let timerId = null

  const updateTimers = () => {
    const now = new Date()
    const elapsedDiff = now - startDate
    const targetDiff = targetDate - now

    timeElapsed.value = calculateDuration(elapsedDiff)
    timeToTarget.value = {
      ...calculateDuration(targetDiff),
      isComplete: targetDiff <= 0,
    }
  }

  onMounted(() => {
    updateTimers()
    timerId = window.setInterval(updateTimers, 1000)
  })

  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId)
    }
  })

  return {
    startDate,
    targetDate,
    targetDays,
    timeElapsed,
    timeToTarget,
    daysTogetherLabel: computed(() => `${timeElapsed.value.days} дней вместе`),
    daysRemainingLabel: computed(() => {
      if (timeToTarget.value.isComplete) {
        return `${targetDays} дней уже наступили`
      }

      return `До ${targetDays} дней осталось совсем чуть-чуть`
    }),
    padNumber: (value) => String(value).padStart(2, '0'),
  }
}

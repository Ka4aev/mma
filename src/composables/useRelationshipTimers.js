import { computed, onMounted, onUnmounted, ref } from 'vue'

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const startDate = new Date('2022-09-14T00:00:00')

const calculateDuration = (diff) => {
  const safeDiff = Math.max(diff, 0)

  return {
    days: Math.floor(safeDiff / MILLISECONDS_IN_DAY),
    hours: Math.floor((safeDiff % MILLISECONDS_IN_DAY) / (1000 * 60 * 60)),
    minutes: Math.floor((safeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((safeDiff % (1000 * 60)) / 1000),
  }
}

const pluralize = (value, forms) => {
  const absoluteValue = Math.abs(Number(value)) % 100
  const lastDigit = absoluteValue % 10

  if (absoluteValue > 10 && absoluteValue < 20) {
    return forms[2]
  }

  if (lastDigit > 1 && lastDigit < 5) {
    return forms[1]
  }

  if (lastDigit === 1) {
    return forms[0]
  }

  return forms[2]
}

export const formatTimeUnitLabel = (unit, value) => {
  const normalizedValue = Number(value)

  switch (unit) {
    case 'days':
      return pluralize(normalizedValue, ['день', 'дня', 'дней'])
    case 'hours':
      return pluralize(normalizedValue, ['час', 'часа', 'часов'])
    case 'minutes':
      return pluralize(normalizedValue, ['минута', 'минуты', 'минут'])
    case 'seconds':
      return pluralize(normalizedValue, ['секунда', 'секунды', 'секунд'])
    default:
      return ''
  }
}

export const getMilestoneDate = (days) => new Date(startDate.getTime() + days * MILLISECONDS_IN_DAY)

export const useRelationshipMilestone = (targetDays) => {
  const targetDate = getMilestoneDate(targetDays)
  const timeToTarget = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false })
  const timeSinceTarget = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false })
  let timerId = null

  const updateMilestone = () => {
    const now = new Date()
    const targetDiff = targetDate - now
    const elapsedSinceTargetDiff = now - targetDate

    timeToTarget.value = {
      ...calculateDuration(targetDiff),
      isComplete: targetDiff <= 0,
    }
    timeSinceTarget.value = {
      ...calculateDuration(elapsedSinceTargetDiff),
      isComplete: elapsedSinceTargetDiff >= 0,
    }
  }

  onMounted(() => {
    updateMilestone()
    timerId = window.setInterval(updateMilestone, 1000)
  })

  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId)
    }
  })

  return {
    targetDate,
    targetDays,
    timeToTarget,
    timeSinceTarget,
    milestoneStatusLabel: computed(() => (
      timeToTarget.value.isComplete
        ? `${targetDays} дней уже наступили`
        : `До ${targetDays} дней осталось совсем чуть-чуть`
    )),
    formatTimeUnitLabel,
    padNumber: (value) => String(value).padStart(2, '0'),
  }
}

export const useRelationshipTimers = () => {
  const defaultMilestone = useRelationshipMilestone(1300)
  const timeElapsed = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  let timerId = null

  const updateTimers = () => {
    const now = new Date()
    const elapsedDiff = now - startDate

    timeElapsed.value = calculateDuration(elapsedDiff)
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
    timeElapsed,
    targetDate: defaultMilestone.targetDate,
    targetDays: defaultMilestone.targetDays,
    timeToTarget: defaultMilestone.timeToTarget,
    timeSinceTarget: defaultMilestone.timeSinceTarget,
    daysTogetherLabel: computed(() => `${timeElapsed.value.days} дней вместе`),
    daysRemainingLabel: defaultMilestone.milestoneStatusLabel,
    formatTimeUnitLabel,
    padNumber: defaultMilestone.padNumber,
  }
}

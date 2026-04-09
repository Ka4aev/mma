<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import PasswordScreen from '@/components/PasswordScreen.vue'
import Our3 from '@/assets/page2/happy-birthday.jpg'
import Our5 from '@/assets/page2/lepka.jpg'
import Our6 from '@/assets/page2/pizza.jpg'
import Our7 from '@/assets/page2/wedding.jpg'
import Our8 from '@/assets/page2/our-gpt.png'
import { useCelebrate } from '@/composables/useCelebrate'
import { useRelationshipMilestone, useRelationshipTimers } from '@/composables/useRelationshipTimers'

const { daysTogetherLabel, daysRemainingLabel, formatTimeUnitLabel, padNumber, targetDate, timeToTarget } = useRelationshipTimers()
const { timeSinceTarget: timeSince1300 } = useRelationshipMilestone(1300)
const { celebrate } = useCelebrate()
const unlockModalStorageKey = 'page-two-unlock-modal-shown'
const specialVideoPasswordHash = '661678a7bd4010dd19a04016283fb24d6dafce714a7499c15656e58a49fd9b1a'

const storyCards = [
  {
    tag: 'Ты',
    title: 'Уже 1300..',
    text: 'Не просто дата, а ощущение, что ещё одна красивая точка в нашей истории уже очень близко.',
  },
  {
    tag: 'моя',
    title: 'У нас есть свой ритм',
    text: 'Свои прогулки, свои шутки, свои тёплые моменты и свои маленькие странности, за которые и любишь ещё сильнее.',
  },
  {
    tag: 'умничка',
    title: 'И хочется только дальше',
    text: 'Новые поездки, видео, вечерние сериалы, спонтанные планы и ощущение, что вместе всё становится красивее.',
  },
]

const miniStories = [
  'кусочек дня, который не хочется терять',
  'видео как маленький архив нас',
  'сцены, в которых и есть самое важное',
]

const showSecretMessage = ref(false)
const telegramUsername = 'mamamakysa'
const telegramMessage = 'ятлж'
const isUnlockModalOpen = ref(false)
const isTestUnlocked = ref(false)
const isPageUnlocked = computed(() => timeToTarget.value.isComplete || isTestUnlocked.value)
const displayTimeToTarget = computed(() => (
  isTestUnlocked.value
    ? { days: 0, hours: 0, minutes: 0, seconds: 0 }
    : timeToTarget.value
))

const lockScreenNotes = [
  'Мы через многое прошли: через тёплое, грустное и моменты, когда всё шло совсем не туда.',
  'Но если что-то и важно по-настоящему, так это не забывать любить друг друга даже в сложные дни.',
]

const floatingPhraseTexts = [
  'ты мое счастье',
  'вместе навсегда',
  'люблю тебя',
  'моя малышка',
  'бубубу',
  'бесячка',
  'ты мой дом',
  'наша история',
  'с тобой легко',
  'ты мой свет',
  'мои любимые глаза',
  'китя',
  '-Нуну',
  '-"Ебааааать"',
  'душнилки',
  'жопищеее',
  'съехаться с тобой',
  'ты и я',
  'самая родная',
  'нежность',
  'молодец',
  'умничка',
  'обнять тебя',
  'го няшиться',
  'кьюти',
  'мой вайб',
  'два пушистика',
  'ты космос',
  'влюбляться снова',
  'смотреть на тебя',
  'тепло рядом',
  'мой человек',
  'ты чудо',
  'улыбайся чаще',
  'маленькое счастье',
  'валяться с тобой',
  'кифас',
  'балбеска',
  'с тобой комфортно',
  'злюка',
  'барсики',
  'малышка босс',
  'кринжуля моя',
  'любимка',
  'дальше вместе',
  'жопка',
  'вдруг бывает только',
  'so cute',
  'все про нас',
  'врушка',
]

const floatingColors = [
  'rgba(244, 114, 182, 0.3)',
  'rgba(251, 146, 60, 0.2)',
  'rgba(244, 63, 94, 0.5)',
  'rgba(168, 85, 247, 0.45)',
  'rgba(14, 165, 233, 0.35)',
  'rgba(251, 191, 36, 0.55)',
  'rgba(129, 140, 248, 0.25)',
  'rgba(16, 185, 129, 0.4)',
]

const floatingFonts = [
  'Georgia, serif',
  '"Trebuchet MS", sans-serif',
  '"Times New Roman", serif',
  'Verdana, sans-serif',
  '"Courier New", monospace',
  '"Palatino Linotype", serif',
  'Arial, sans-serif',
  'Tahoma, sans-serif',
]

const floatingPhrases = floatingPhraseTexts.map((text, index) => {
  const left = (index * 9 + (index % 5) * 7) % 92
  const size = 1 + (index % 6) * 0.28
  const duration = 18 + (index % 7) * 3
  const delay = -(index * 1.8)
  const rotate = -16 + (index % 9) * 4
  const color = floatingColors[index % floatingColors.length]
  const fontFamily = floatingFonts[index % floatingFonts.length]
  const weight = 400 + (index % 4) * 100
  const letterSpacing = `${(index % 4) * 0.05}em`

  return {
    text,
    style: {
      left: `${left}%`,
      bottom: `${-18 - (index % 6) * 8}%`,
      color,
      fontFamily,
      fontSize: `${size}rem`,
      fontWeight: String(weight),
      letterSpacing,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      '--phrase-rotate': `${rotate}deg`,
    },
  }
})

const isVideoModalOpen = ref(false)
const isSpecialVideoPasswordOpen = ref(false)
const isSpecialVideoUnlocked = ref(false)
const unlockAudioRef = ref(null)
const unlockAudioCurrentTime = ref(0)
const unlockAudioDuration = ref(0)
const isUnlockAudioPlaying = ref(false)
const hasUnlockAudioCelebrated = ref(false)
const unlockAudioProgress = computed(() => (
  unlockAudioDuration.value > 0
    ? (unlockAudioCurrentTime.value / unlockAudioDuration.value) * 100
    : 0
))

const syncBodyOverflow = () => {
  document.body.style.overflow = (
    isVideoModalOpen.value
    || isUnlockModalOpen.value
    || isSpecialVideoPasswordOpen.value
  ) ? 'hidden' : 'auto'
}

const openVideoModal = () => {
  if (!isSpecialVideoUnlocked.value) {
    isSpecialVideoPasswordOpen.value = true
    syncBodyOverflow()
    return
  }

  isVideoModalOpen.value = true
  syncBodyOverflow()
}

const closeSpecialVideoPassword = () => {
  isSpecialVideoPasswordOpen.value = false
  syncBodyOverflow()
}

const handleSpecialVideoAuthenticated = () => {
  isSpecialVideoUnlocked.value = true
  isSpecialVideoPasswordOpen.value = false
  isVideoModalOpen.value = true
  syncBodyOverflow()
}

const revealSecretMessage = () => {
  showSecretMessage.value = true
}

const openTelegramMessage = () => {
  const encodedMessage = encodeURIComponent(telegramMessage)
  const telegramAppUrl = `tg://resolve?domain=${telegramUsername}&text=${encodedMessage}`
  const telegramWebUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`

  window.location.href = telegramAppUrl

  window.setTimeout(() => {
    window.open(telegramWebUrl, '_blank', 'noopener,noreferrer')
  }, 250)
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
  syncBodyOverflow()
}

const openUnlockModal = () => {
  if (typeof window === 'undefined') {
    return
  }

  const hasShownModal = window.localStorage.getItem(unlockModalStorageKey) === 'true'

  if (hasShownModal) {
    return
  }

  isUnlockModalOpen.value = true
  window.localStorage.setItem(unlockModalStorageKey, 'true')
  syncBodyOverflow()
}

const closeUnlockModal = () => {
  if (unlockAudioRef.value) {
    unlockAudioRef.value.pause()
    unlockAudioRef.value.currentTime = 0
  }

  isUnlockModalOpen.value = false
  syncBodyOverflow()
}

const forceUnlockForTest = () => {
  isTestUnlocked.value = true

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(unlockModalStorageKey)
  }

  isUnlockModalOpen.value = true
  syncBodyOverflow()
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isUnlockModalOpen.value) {
    closeUnlockModal()
    return
  }

  if (event.key === 'Escape' && isSpecialVideoPasswordOpen.value) {
    closeSpecialVideoPassword()
    return
  }

  if (event.key === 'Escape' && isVideoModalOpen.value) {
    closeVideoModal()
  }
}

const formatAudioTime = (value) => {
  const totalSeconds = Math.max(0, Math.floor(value))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const syncUnlockAudioState = () => {
  if (!unlockAudioRef.value) {
    return
  }

  unlockAudioCurrentTime.value = unlockAudioRef.value.currentTime
  unlockAudioDuration.value = Number.isFinite(unlockAudioRef.value.duration) ? unlockAudioRef.value.duration : 0
  isUnlockAudioPlaying.value = !unlockAudioRef.value.paused
}

const toggleUnlockAudio = async () => {
  if (!unlockAudioRef.value) {
    return
  }

  if (unlockAudioRef.value.paused) {
    try {
      await unlockAudioRef.value.play()
      isUnlockAudioPlaying.value = true
    } catch {
      isUnlockAudioPlaying.value = false
    }

    return
  }

  unlockAudioRef.value.pause()
  isUnlockAudioPlaying.value = false
}

const seekUnlockAudio = (event) => {
  if (!unlockAudioRef.value) {
    return
  }

  const nextTime = Number(event.target.value)
  unlockAudioRef.value.currentTime = nextTime
  unlockAudioCurrentTime.value = nextTime
}

const handleUnlockAudioEnded = () => {
  syncUnlockAudioState()

  if (hasUnlockAudioCelebrated.value) {
    return
  }

  hasUnlockAudioCelebrated.value = true
  celebrate({ playAudio: false, duration: 5000 })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  if (isPageUnlocked.value) {
    openUnlockModal()
  }

  gsap.fromTo(
    '[data-page-two-animate]',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out' },
  )
})

watch(isPageUnlocked, (isUnlocked, wasUnlocked) => {
  if (isUnlocked && !wasUnlocked) {
    openUnlockModal()
  }
})

watch(isUnlockModalOpen, async (isOpen) => {
  if (!isOpen) {
    isUnlockAudioPlaying.value = false
    unlockAudioCurrentTime.value = 0
    hasUnlockAudioCelebrated.value = false
    return
  }

  await nextTick()

  if (!unlockAudioRef.value) {
    return
  }

  unlockAudioRef.value.currentTime = 0
  hasUnlockAudioCelebrated.value = false
  syncUnlockAudioState()

  try {
    await unlockAudioRef.value.play()
    isUnlockAudioPlaying.value = true
  } catch {
    isUnlockAudioPlaying.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <section class="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20" aria-label="Вторая страница">
    <div v-if="isPageUnlocked" class="floating-phrases-layer" aria-hidden="true">
      <span
        v-for="(phrase, index) in floatingPhrases"
        :key="`${phrase.text}-${index}`"
        class="floating-phrase"
        :style="phrase.style"
      >
        {{ phrase.text }}
      </span>
    </div>

    <div v-if="!isPageUnlocked" class="relative z-10">
      <div
        class="overflow-hidden rounded-[36px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.98)_46%,_rgba(88,28,135,0.92)_100%)] p-6 text-white shadow-[0_35px_90px_rgba(15,23,42,0.32)] sm:p-8 lg:p-10"
        data-page-two-animate
      >
        <div class="mx-auto max-w-4xl text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur">
            <svg class="h-9 w-9 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 10V7a4 4 0 118 0v3m-9 0h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8a1 1 0 011-1z" />
            </svg>
          </div>

          <span class="mt-6 inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            страница откроется в день 1300
          </span>

          <h1 class="mt-6 text-4xl font-black leading-none tracking-[-0.04em] sm:text-6xl">
            Эта глава пока закрыта.
          </h1>

          <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Я хочу открыть её именно в тот момент, когда наш счётчик дойдёт до 1300 дней. А пока пусть здесь
            будет ожидание, потому что у этой страницы свой день и своё настроение.
          </p>

          <div class="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div
              v-for="item in [
                { value: displayTimeToTarget.days, label: formatTimeUnitLabel('days', displayTimeToTarget.days) },
                { value: padNumber(displayTimeToTarget.hours), label: formatTimeUnitLabel('hours', displayTimeToTarget.hours) },
                { value: padNumber(displayTimeToTarget.minutes), label: formatTimeUnitLabel('minutes', displayTimeToTarget.minutes) },
                { value: padNumber(displayTimeToTarget.seconds), label: formatTimeUnitLabel('seconds', displayTimeToTarget.seconds) },
              ]"
              :key="item.label"
              class="rounded-[28px] border border-white/10 bg-white/[0.05] px-4 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur"
            >
              <div class="text-4xl font-black tabular-nums text-amber-200 sm:text-5xl">{{ item.value }}</div>
              <div class="mt-2 text-sm uppercase tracking-[0.16em] text-slate-300">{{ item.label }}</div>
            </div>
          </div>

<!--          <div class="mt-6 flex justify-center">-->
<!--            <button-->
<!--              type="button"-->
<!--              class="rounded-full border border-amber-200/30 bg-amber-300/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/20"-->
<!--              @click="forceUnlockForTest"-->
<!--            >-->
<!--              Тест: сбросить до 00-->
<!--            </button>-->
<!--          </div>-->

          <div class="mt-10 grid gap-4 text-left lg:grid-cols-2">
            <article
              v-for="note in lockScreenNotes"
              :key="note"
              class="rounded-[28px] border border-white/10 bg-black/20 p-5 text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur"
            >
              <p class="leading-8">{{ note }}</p>
            </article>
          </div>

          <div class="mt-8 rounded-[28px] border border-rose-200/15 bg-white/10 px-5 py-5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur sm:px-6">
            <p class="text-sm uppercase tracking-[0.22em] text-rose-100/70">для тебя</p>
            <p class="mt-4 leading-8 text-slate-100/90">
              Маша жопка
            </p>
            <p class="mt-4 leading-8 text-slate-200/85">
              Любимая манюня, осталось уже совсем немного до нашего очередного чекпоинта в отношениях. Для меня это не просто цифра на счётчике, а ещё один маленький, но очень важный момент в нашей истории. Я правда надеюсь, что тебе будет тепло и радостно на душе, когда этот счётчик дойдёт до нуля, потому что для меня это тоже значит очень много. Хочется, чтобы ты улыбнулась в этот момент и почувствовала, как сильно я дорожу всем, что у нас есть.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="relative z-10 space-y-6">
      <div
        class="overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(251,113,133,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.2),_transparent_28%),linear-gradient(135deg,_#111827_0%,_#1f2937_46%,_#4c1d95_100%)] p-6 text-white shadow-[0_35px_90px_rgba(15,23,42,0.32)] sm:p-8 lg:p-10"
        data-page-two-animate
      >
        <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span class="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {{ daysTogetherLabel }}
            </span>
            <h1 class="mt-5 max-w-3xl text-4xl font-black leading-none tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Другая страница. Другой вайб. Та же история.
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Буду понемногу добавлять сюда новые страницы через время, чтобы потом можно было смотреть на всё это и вспоминать нашу маленькую историю. Потому что ты для меня значишь намного больше, чем тебе кажется.
            </p>
          </div>

          <div class="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
            <span class="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              следующая цель
            </span>
            <p class="mt-4 text-2xl font-semibold leading-tight text-white">{{ daysRemainingLabel }}</p>
            <p class="mt-3 text-sm uppercase tracking-[0.18em] text-amber-200/80">
               в эту дату: {{ targetDate.toLocaleDateString('ru-RU') }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div
          class="rounded-[34px] bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.25)] sm:p-8"
          data-page-two-animate
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="inline-flex rounded-full bg-rose-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
                счетчик дней
              </span>
              <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">С 1300 дней прошло</h2>
            </div>
            <div class="hidden rounded-2xl bg-white/5 px-4 py-3 text-right text-sm text-slate-300 sm:block">
              дата старта
              <div class="text-2xl font-bold text-white">06.04.2026</div>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div
              v-for="item in [
                { value: timeSince1300.days, label: formatTimeUnitLabel('days', timeSince1300.days) },
                { value: padNumber(timeSince1300.hours), label: formatTimeUnitLabel('hours', timeSince1300.hours) },
                { value: padNumber(timeSince1300.minutes), label: formatTimeUnitLabel('minutes', timeSince1300.minutes) },
                { value: padNumber(timeSince1300.seconds), label: formatTimeUnitLabel('seconds', timeSince1300.seconds) },
              ]"
              :key="item.label"
              class="rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-6 text-center"
            >
              <div class="text-4xl font-black tabular-nums text-amber-200 sm:text-5xl">{{ item.value }}</div>
              <div class="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">{{ item.label }}</div>
            </div>
          </div>
        </div>

        <article
          class="relative overflow-hidden rounded-[34px] bg-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.25)]"
          data-page-two-animate
        >
          <img :src="Our5" alt="Наша история" class="h-full min-h-[420px] w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <span class="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              любимое свидание
            </span>
            <h3 class="mt-4 text-3xl font-bold sm:text-4xl">Ты и создаёшь атмосферу этой истории</h3>
            <p class="mt-3 max-w-lg leading-8 text-white/80">
              Всё становится теплее и живее просто потому, что это происходит рядом с тобой.
            </p>
          </div>
        </article>
      </div>

      <div class="grid gap-6 lg:grid-cols-3" data-page-two-animate>
        <article
          v-for="card in storyCards"
          :key="card.title"
          class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
        >
          <span class="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            {{ card.tag }}
          </span>
          <h3 class="mt-5 text-2xl font-bold tracking-tight text-slate-900">{{ card.title }}</h3>
          <p class="mt-4 leading-8 text-slate-600">{{ card.text }}</p>
        </article>
      </div>

      <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          class="rounded-[34px] bg-gradient-to-br from-rose-100 via-orange-50 to-white p-6 shadow-[0_22px_60px_rgba(244,63,94,0.14)] sm:p-8"
          data-page-two-animate
        >
          <span class="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500 shadow-sm">
            наша небольшая история
          </span>
          <h2 class="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Особенный день
          </h2>
          <p class="mt-4 text-base leading-8 text-slate-600">
            Напоминает много счастливых и теплых моментов,
            Видео которые хочется открыть, пересмотреть и снова оставить в памяти.
          </p>
          <ul class="mt-6 space-y-3">
            <li v-for="item in miniStories" :key="item" class="flex items-start gap-3 text-slate-700">
              <span class="mt-2 h-2.5 w-2.5 rounded-full bg-rose-500"></span>
              <span class="leading-7">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div
          class="rounded-[34px]  flex items-center justify-center bg-slate-950 p-4 shadow-[0_32px_90px_rgba(15,23,42,0.28)]"
          data-page-two-animate
        >
          <div class="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.18),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))] p-3">
            <button
              type="button"
              class="group relative mx-auto block aspect-[16/11] w-full overflow-hidden rounded-[24px] border border-white/10 bg-black text-left shadow-[0_24px_70px_rgba(0,0,0,0.36)]"
              @click="openVideoModal"
            >
              <video
                class="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                src="/video_2026-04-04_22-55-09.mp4"
                muted
                playsinline
                preload="metadata"
              ></video>
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-5 text-white">
                <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/18 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-rose-500/70">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l10.5-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                  </svg>
                </div>
                <p class="text-xl font-bold">Открыть видео "Особенный день"</p>
                <p class="mt-1 text-sm text-white/75">Нажми, введи пароль и смотри почти на весь экран сайта</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article
          class="rounded-[34px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8"
          data-page-two-animate
        >
          <span class="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            чуть нежности
          </span>
          <h3 class="mt-5 text-3xl font-black tracking-tight text-slate-900">Эта страница уже отдельная глава</h3>
          <p class="mt-4 leading-8 text-slate-600">
            Эта страница для тебя, потому что у нас с тобой не просто красивые моменты, а целая история. Мы правда через многое прошли: было и грустное, и тёплое, и моменты, когда всё будто шло не туда. Но я всё равно понимаю одно: самое главное для нас не забывать любить друг друга, даже когда тяжело.

            Я уже давно выбрал тебя. И если честно, я не вижу никакого смысла начинать что-то заново с кем-то другим, потому что такой, как ты, у меня больше не будет никогда. Ты слишком особенная, слишком родная, слишком моя. Маш, если вдруг у тебя когда-нибудь появятся мысли, что мне всё равно на тебя, просто знай: это не так. Какая бы ни была ссора, как бы мы ни обижались, моё отношение к тебе не меняется. Как любил тебя, так и люблю. Да, бывают обидные моменты, бывают слова, которые задевают, но это не должно нас ломать. Мы не для этого столько всего прошли вместе.

            Мне вообще сложно до конца передать словами всё, что я к тебе чувствую. Потому что ты для меня уже намного больше, чем просто человек рядом. Ты моя радость, моё спокойствие, моё вдохновение. С тобой даже самые обычные вещи становятся особенными. Мне важно в тебе всё: как ты улыбаешься, как говоришь, как смотришь, как просто находишься рядом. Я люблю тебя не за что-то одно, а просто за то, что ты есть. За твою искренность, за твоё тепло, за ту любовь, которую ты умеешь давать.

            Только ты вызываешь во мне такие чувства. И я правда верю, что судьба связала нас не просто так. Нам остаётся только держаться друг за друга крепче, беречь то, что у нас есть, и идти дальше вместе. Потому что ты мой человек. И без тебя всё было бы совсем не так.


          </p>
        </article>

        <div class="grid grid-cols-1 gap-6" data-page-two-animate>
          <img :src="Our3" alt="Наш кадр" class="h-full flex-1 min-h-[220px] rounded-[28px] object-cover shadow-lg" />
          <div class="grid grid-cols-2 gap-6">
            <img :src="Our6" alt="Наш кадр" class="h-full min-h-[220px] rounded-[28px] object-cover shadow-lg" />
            <img :src="Our7" alt="Наш кадр" class="h-[240px] rounded-[28px] object-cover shadow-lg" />
            <img :src="Our8" alt="Наш кадр" class="rounded-[28px] object-cover shadow-lg" />
          </div>

        </div>
      </div>

      <div class="flex justify-center" data-page-two-animate>
        <div
          role="button"
          tabindex="0"
          class="group relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_45%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(76,29,149,0.92)_55%,_rgba(244,63,94,0.86)_100%)] px-6 py-7 text-left text-white shadow-[0_30px_90px_rgba(76,29,149,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_38px_100px_rgba(244,63,94,0.26)] focus:outline-none focus-visible:ring-0 sm:px-8"
          @click="revealSecretMessage"
          @keydown.enter.prevent="revealSecretMessage"
          @keydown.space.prevent="revealSecretMessage"
        >
          <div class="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.12)_35%,transparent_65%)] opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"></div>
          <div class="absolute -left-10 top-0 h-24 w-24 rounded-full bg-rose-400/30 blur-3xl transition duration-500 group-hover:scale-150"></div>
          <div class="absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-amber-300/30 blur-3xl transition duration-500 group-hover:scale-150"></div>

          <div class="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="max-w-xl">
              <span class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
                финальный триггер
              </span>
              <h3 class="mt-4 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                Тут есть ещё одно действие.
              </h3>
              <p class="mt-2 text-sm leading-7 text-white/75 sm:text-base">
                Нажми и появится фраза, которую стоит отправить парню.
              </p>
            </div>

            <div class="flex items-center gap-3 self-start rounded-full bg-white/12 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition duration-300 group-hover:bg-white/18 group-hover:translate-x-1">
              <span>открыть</span>
              <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </div>
          </div>

          <Transition
            enter-active-class="transition duration-[900ms] ease-out"
            enter-from-class="translate-y-8 opacity-0 scale-90 blur-sm"
            enter-to-class="translate-y-0 opacity-100 scale-100 blur-0"
          >
            <div
              v-if="showSecretMessage"
              class="relative z-10 mt-6 overflow-hidden rounded-[24px] border border-white/12 bg-black/35 px-5 py-5 text-center shadow-[0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-black/45 sm:px-6"
              @click.stop="openTelegramMessage"
            >
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.18),_transparent_40%),radial-gradient(circle_at_top,_rgba(244,63,94,0.22),_transparent_46%)] animate-pulse"></div>
              <p class="relative text-[11px] uppercase tracking-[0.32em] text-rose-100/80">напиши парню</p>
              <p class="relative mt-3 text-4xl font-black tracking-[0.18em] text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.24)] sm:text-5xl">
                "ятлж"
              </p>
              <p class="relative mt-3 text-xs uppercase tracking-[0.24em] text-white/55">
                жмякни на меня
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <div
      v-if="isSpecialVideoPasswordOpen"
      class="fixed inset-0 z-[72] flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-sm sm:p-8"
      @click="closeSpecialVideoPassword"
    >
      <div
        class="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.94)_46%,_rgba(76,29,149,0.9)_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        @click.stop
      >
        <button
          type="button"
          class="absolute right-8 top-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/20"
          @click="closeSpecialVideoPassword"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <PasswordScreen
          :password-hash="specialVideoPasswordHash"
          :length="8"
          title="Пароль для видео"
          hint="Подсказка: не будет"
          panel-class="min-h-[420px] bg-transparent text-white shadow-none"
          input-class="password-input border-white/25 bg-white/10 text-white placeholder:text-white/35"
          error-class="text-rose-300"
          hint-class="text-slate-300"
          @authenticated="handleSpecialVideoAuthenticated"
        />
      </div>
    </div>

    <div
      v-if="isVideoModalOpen"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
      @click="closeVideoModal"
    >
      <div
        class="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        @click.stop
      >
        <button
          type="button"
          class="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/20"
          @click="closeVideoModal"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <video
          class="max-h-[88vh] w-full bg-black object-contain"
          src="/video_2026-04-04_22-55-09.mp4"
          controls
          autoplay
          playsinline
        ></video>
      </div>
    </div>

  </section>
</template>

<style scoped>
.floating-phrases-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
}

.floating-phrase {
  position: absolute;
  display: inline-block;
  white-space: nowrap;
  text-transform: lowercase;
  user-select: none;
  opacity: 0;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.12);
  animation-name: floatPhrase;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

@keyframes floatPhrase {
  0% {
    opacity: 0;
    transform: translate3d(0, 10vh, 0) rotate(var(--phrase-rotate, 0deg));
  }

  12% {
    opacity: 0.92;
  }

  82% {
    opacity: 0.42;
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -135vh, 0) rotate(var(--phrase-rotate, 0deg));
  }
}
</style>

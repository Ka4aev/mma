<script setup>
import {ref, onMounted, computed, onUnmounted, nextTick} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules'
import confetti from 'canvas-confetti'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import yraAudio from '../assets/audio/yra.mp3'
import Memory1 from '@/assets/memory1.jpg'
import Memory2 from '@/assets/memory2.jpg'
import Memory3 from '@/assets/memory3.jpg'
import Memory4 from '@/assets/memory4.jpg'
import Memory5 from '@/assets/memory5.jpg'
import Memory6 from '@/assets/memory6.jpg'
import Memory7 from '@/assets/memory7.jpg'
import Memory8 from '@/assets/memory8.jpg'
import Memory9 from '@/assets/memory9.jpg'
import Memory10 from '@/assets/memory10.jpg'

import Podarok from '@/assets/podarok.jpg'
import Gift from '@/assets/gift.png'

import Reason1 from '@/assets/reason1.jpg'
import Reason2 from '@/assets/reason2.jpg'
import Reason3 from '@/assets/reason3.jpg'
import Reason4 from '@/assets/reason4.jpg'
import Reason5 from '@/assets/reason5.jpg'
import Reason6 from '@/assets/reason6.jpg'

import HeartButton from './HeartButton.vue'
gsap.registerPlugin(ScrollTrigger)

const showGiftBox = ref(false)
const showLightbox = ref(false)
const selectedImage = ref(null)
const timeElapsed = ref({days: 0, hours: 0, minutes: 0, seconds: 0})
const openQuestions = ref([])
const showContent = ref(true)
const isBirthday = ref(false)
let hasCelebrated = false

// Проверяем, был ли уже праздник (celebrate) в localStorage
if (localStorage.getItem('hasCelebratedBirthday2025') === 'true') {
  hasCelebrated = true
}

// Новый таймер до 24:00 20.07.2025 по Томскому времени (UTC+7)
const targetDate = new Date(Date.UTC(2025, 6, 19, 17, 0, 0)) // 24:00 Томск = 17:00 UTC 20 июля 2025

const updateTimeElapsed = () => {
  const now = new Date()
  const diff = targetDate - now
  let totalSeconds = Math.floor(diff / 1000)
  // Сохраняем предыдущее значение времени
  if (!updateTimeElapsed.prevTotalSeconds && updateTimeElapsed.prevTotalSeconds !== 0) {
    updateTimeElapsed.prevTotalSeconds = totalSeconds
  }
  if (totalSeconds <= 0) {
    isBirthday.value = true
    // celebrate только если ровно в момент перехода через 0
    if (!hasCelebrated && updateTimeElapsed.prevTotalSeconds > 0) {
      celebrate()
       const audio = new Audio(yraAudio)
      audio.volume = 0.5
      audio.play().catch(error => console.log('Audio playback failed:', error))

      hasCelebrated = true
      localStorage.setItem('hasCelebratedBirthday2025', 'true')
    }
    // Считаем время после наступления даты
    totalSeconds = Math.abs(totalSeconds)
  } else {
    isBirthday.value = false
    // Если время снова стало положительным, сбрасываем флаг (например, если дату изменили назад)
    if (hasCelebrated) {
      hasCelebrated = false
      localStorage.removeItem('hasCelebratedBirthday2025')
    }
  }
  updateTimeElapsed.prevTotalSeconds = totalSeconds * (isBirthday.value ? -1 : 1)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60
  timeElapsed.value = {days, hours, minutes, seconds}
}

const celebrate = () => {
  // Воспроизводим аудио
  const audio = new Audio(yraAudio)
  audio.volume = 0.5
  audio.play().catch(error => console.log('Audio playback failed:', error))

  // Запускаем фейерверк
  const duration = 8 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999,
    colors: ['#ff0000', '#ff69b4', '#ff1493', '#ff69b4', '#ff0000']
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 }
    })
  }, 250)

  const hearts = document.querySelectorAll('.heart')
  hearts.forEach((heart, index) => {
    const startX = Math.random() * window.innerWidth
    const size = Math.random() * 1.5 + 0.5
    const delay = Math.random() * 2

    gsap.set(heart, {
      x: startX,
      y: window.innerHeight + 50,
      scale: size,
      opacity: 1
    })

    gsap.to(heart, {
      y: -100,
      opacity: 0,
      duration: 4,
      delay: delay,
      ease: 'power1.out',
      onComplete: () => {
        gsap.set(heart, { 
          y: window.innerHeight + 50,
          opacity: 1
        })
      }
    })
  })
}

const images = [
    Memory1,
    Memory2,
    Memory3,
    Memory4,
    Memory5,
    Memory6,
    Memory7,
    Memory8,
    Memory9,
    Memory10,
]
const reasonsImg = [
  Reason1,
  Reason2,
    Reason3,
    Reason4,
    Reason5,
    Reason6,
]

const reasons = [
  'Постоянно играли вместе',
  'Жили вместе',
  'Вечные ночевки',
  'Готовка вместе',
  'Фотосессия',
  'Горные лыжи'
]

const questions = ref([
  {
    title: 'Как мы познакомились?',
    answer: 'Наше знакомство довольно банальное, но в то же время это череда необыкновенных совпадений - Знакомство на Новом Году.'
  },
  {
    title: 'Как мы начали встречаться?',
    answer: 'Наша история начинается с конца новогодних каникул. Время поджимало, нужно было действовать.'
  },
  {
      title: 'Чем она мне понравилась?',
      answer: 'Да, вещь банальная — но для меня она была уникальной. Не говорю уж про внешность (хотя, конечно, огонь), но характер — мое отражение: чуть кринжовый, угарный, вечно подкидывает какой-то неожиданный поворот. И это — моё'
  },
  {
    title: 'Как мы обычно проводим время?',
    answer: 'Люблю просто лежать с ней в обнимку, кушац чипсы и пить кока колу :3'
  },
  {
    title: 'Счастлив я с ней?',
    answer: 'Счастлив ли я с ней? Без сомнения. Никогда прежде я не чувствовал себя так счастливо и комфортно в отношениях. Были, конечно, и трудные моменты, но мы всегда преодолевали их вместе. Столько тёплых вечеров в обнимку... Люблю её всю — эту мою маленькую, очаровательную, чуть смешную (но такую родную) малышку. Она — моя.'
  }
])

const visibleAnswers = ref(new Set())

const activeQuestion = ref(null)
const isAnswerVisible = ref(false)

const toggleQuestion = (index) => {
  if (visibleAnswers.value.has(index)) {
    visibleAnswers.value.delete(index)
  } else {
    visibleAnswers.value.add(index)
  }
}

const openLightbox = (image) => {
  selectedImage.value = image
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = 'auto'
}

const miniPhotoIndex = ref(null)
const miniPhotoPosition = ref({top: 0, left: 0})

function openMiniPhoto(index) {
  miniPhotoIndex.value = index
  // Позиционируем мини-фото относительно сердечка
  const rect = document.querySelector(`.reason-card:nth-child(${index + 1})`).getBoundingClientRect()
  miniPhotoPosition.value = {
    top: rect.bottom + window.scrollY + 8,
    left: rect.left + window.scrollX - 20
  }
}
function closeMiniPhoto() {
  miniPhotoIndex.value = null
}

const reasonCards = ref([])
const showFutureLetter = ref(false)

onMounted(() => {
  updateTimeElapsed()
  setInterval(updateTimeElapsed, 1000)

  // Удаляю анимации для несуществующих элементов, чтобы не было ошибок GSAP
  // if (document.querySelector('.hero-title')) {
  //   gsap.from('.hero-title', { ... })
  // }
  // if (document.querySelector('.counter-item')) {
  //   gsap.from('.counter-item', { ... })
  // }
  // if (document.querySelector('.reason-item')) {
  //   gsap.from('.reason-item', { ... })
  // }
  // if (document.querySelector('.memory-card')) {
  //   gsap.from('.memory-card', { ... })
  // }
  // if (document.querySelector('.final-section')) {
  //   gsap.from('.final-section', { ... })
  // }
  nextTick(() => {
    if (reasonCards.value && reasonCards.value.length) {
      reasonCards.value.forEach((el, i) => {
        setTimeout(() => {
          if (el) {
            el.style.opacity = '1'
            el.style.transform = 'scale(1)'
          }
        }, 120 + i * 120)
      })
    }
  })
})
</script>

<template>
  <div class="py-4 sm:py-8">
    <!-- Hearts Animation Container -->
    <div class="hearts-container">
      <div v-for="n in 30" :key="n" class="heart">❤️</div>
    </div>

    <!-- Hero Section with Counter -->
    <div class="content-section">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-12">{{ isBirthday ? 'Тебе 19 лет уже:' : 'С днем рождения' }}</h1>
      <div class="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
        <div class="bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm text-center w-[calc(50%-1rem)] sm:w-auto">
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.days }}</div>
          <div class="text-sm sm:text-base text-gray-600">дней</div>
        </div>
        <div class="bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm text-center w-[calc(50%-1rem)] sm:w-auto">
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.hours }}</div>
          <div class="text-sm sm:text-base text-gray-600">часов</div>
        </div>
        <div class="bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm text-center w-[calc(50%-1rem)] sm:w-auto">
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.minutes }}</div>
          <div class="text-sm sm:text-base text-gray-600">минут</div>
        </div>
        <div class="bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm text-center w-[calc(50%-1rem)] sm:w-auto">
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.seconds }}</div>
          <div class="text-sm sm:text-base text-gray-600">секунд</div>
        </div>
      </div>
      <p class="text-center text-gray-600 text-base sm:text-lg">
        С каждой минутой мы все старше
      </p>
    </div>

    <!-- Rest of the content -->
    <div v-if="showContent" class="content-wrapper">
      <!-- Love Declaration Section -->
      <div class="content-section relative overflow-hidden hero-block">
        <div class="absolute inset-0 bg-cover bg-center bg-banner"></div>
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-white p-4 sm:p-8">
          <h2 class="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Маша, с днём рождения 🌿</h2>
          <p class="text-base sm:text-lg max-w-2xl text-center hero-text">
            Тебе сегодня 19 — и это не просто дата. Это момент, когда ты уже многое знаешь о себе, о людях, о жизни… и при этом остаёшься такой настоящей: с характером, эмоциями, яркостью, упрямством, теплом. Ты умеешь быть разной — и это круто.<br><br>
            Я знаю, что мы с тобой не всегда простые. Иногда я туплю, иногда ты злишься. Но за всем этим — я правда хочу быть рядом. Хочу, чтобы тебе со мной было спокойно, легко, свободно. Хочу учиться быть лучше — не «идеальным», а настоящим и внимательным к тебе.<br><br>
            Ты важный человек для меня. Ты умеешь заряжать, менять, трогать душу. Даже когда молчишь — ты говоришь многое.<br><br>
            Спасибо тебе за это.<br><br>
            С днём рождения, Маш.<br>
            Пусть это будет год, в котором ты почувствуешь, что рядом есть те, кто видят тебя по-настоящему. Я стараюсь быть одним из них.<br><br>
            <span style="display: inline-block; margin-top: 12px;">С тобой — Никита 🤍</span>
          </p>
        </div>
      </div>

      <div style="display: flex; justify-content: center; margin: 24px 0;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          style="cursor: pointer;" @click="celebrate">
          <path d="M24 43s-1.45-1.32-3.2-2.91C12.2 33.13 4 26.36 4 18.5 4 12.15 9.15 7 15.5 7c3.54 0 6.73 1.73 8.5 4.44C25.77 8.73 28.96 7 32.5 7 38.85 7 44 12.15 44 18.5c0 7.86-8.2 14.63-16.8 21.59C25.45 41.68 24 43 24 43z" fill="#f472b6"/>
        </svg>
      </div>

      <!-- Reasons Section -->
      <div class="content-section">
        <h2 class="section-title text-2xl sm:text-3xl">Что было за год</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div v-for="(reason, index) in reasons" :key="index" 
               class="bg-gray-50 p-4 z-1 sm:p-6 rounded-lg relative reason-card"
               :style="{ minHeight: '180px', transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s', opacity: 0, transform: 'scale(0.95)' }"
               ref="reasonCards">
            <div class="feature-circle mx-auto" v-if="miniPhotoIndex === null">
              <HeartButton @click="() => openMiniPhoto(index)" :size="32" />
            </div>
            <transition name="fade-scale">
              <div v-if="miniPhotoIndex === index" class="mini-photo-popup">
                <img :src="reasonsImg[index % reasonsImg.length]" class="mini-photo-img" />
                <button @click.stop="closeMiniPhoto" class="mini-photo-close mini-photo-close-left">×</button>
              </div>
            </transition>
            <p v-if="miniPhotoIndex === null" class="text-center z-0 text-gray-700 text-sm sm:text-base reason-text">{{ reason }}</p>
          </div>
        </div>
      </div>
      <!-- Клик вне мини-фото закрывает его -->
      <div v-if="miniPhotoIndex !== null" @click="closeMiniPhoto" style="position: fixed; inset: 0; z-index: 9;"></div>
      <!-- Сердечко -->
      <div style="display: flex; justify-content: center; margin: 24px 0;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          style="cursor: pointer;" @click="celebrate">
          <path d="M24 43s-1.45-1.32-3.2-2.91C12.2 33.13 4 26.36 4 18.5 4 12.15 9.15 7 15.5 7c3.54 0 6.73 1.73 8.5 4.44C25.77 8.73 28.96 7 32.5 7 38.85 7 44 12.15 44 18.5c0 7.86-8.2 14.63-16.8 21.59C25.45 41.68 24 43 24 43z" fill="#f472b6"/>
        </svg>
      </div>
      <!-- Photo Slider Section -->
      <div class="content-section mt-16">
        <h2 class="section-title text-2xl sm:text-3xl">Красивые мы</h2>
        <Swiper
          :modules="[EffectCoverflow, Navigation, Pagination]"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          slidesPerView="auto"
          :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }"
          :pagination="true"
          :navigation="true"
          class="w-full max-w-4xl mx-auto"
        >
          <SwiperSlide v-for="(image, index) in images" :key="index" class="w-56 sm:w-72">
            <img
              :src="image"
              class="w-full h-40 sm:h-56 object-cover rounded-lg cursor-pointer shadow-md"
              @click="openLightbox(image)"
              alt="image"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      

      <!-- FAQ Section -->
      <!-- Сердечко сверху -->
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 12px;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          style="cursor: pointer;" @click="celebrate">
          <path d="M24 43s-1.45-1.32-3.2-2.91C12.2 33.13 4 26.36 4 18.5 4 12.15 9.15 7 15.5 7c3.54 0 6.73 1.73 8.5 4.44C25.77 8.73 28.96 7 32.5 7 38.85 7 44 12.15 44 18.5c0 7.86-8.2 14.63-16.8 21.59C25.45 41.68 24 43 24 43z" fill="#f472b6"/>
        </svg>
        <span style="color: #f472b6; font-weight: bold; font-size: 1.1rem; margin-top: 2px;"></span>
      </div>
      <div class="py-8 sm:py-16">
        <div class="w-full mx-auto space-y-3 sm:space-y-4">
          <div 
            v-for="(question, index) in questions" 
            :key="index"
            class="w-full bg-white rounded-[20px] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
            @click="toggleQuestion(index)"
          >
            <div class="w-full px-4 sm:px-8 py-4 sm:py-6 text-left flex justify-between items-center">
              <span class="text-base sm:text-[18px] font-medium text-[#1E293B]">{{ question.title }}</span>
              <div 
                class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300"
                :class="{ 'rotate-180': visibleAnswers.has(index) }"
              >
                <svg 
                  class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                  :class="{ 'text-orange-500': visibleAnswers.has(index) }"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ 
                maxHeight: visibleAnswers.has(index) ? '500px' : '0',
                opacity: visibleAnswers.has(index) ? '1' : '0',
                transform: `translateY(${visibleAnswers.has(index) ? '0' : '-8px'})`,
              }"
            >
              <div class="px-4 sm:px-8 pb-4 sm:pb-6">
                <p class="text-sm sm:text-[16px] text-[#475569] leading-relaxed">{{ question.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Сердечко снизу -->
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 12px;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          style="cursor: pointer;" @click="celebrate">
          <path d="M24 43s-1.45-1.32-3.2-2.91C12.2 33.13 4 26.36 4 18.5 4 12.15 9.15 7 15.5 7c3.54 0 6.73 1.73 8.5 4.44C25.77 8.73 28.96 7 32.5 7 38.85 7 44 12.15 44 18.5c0 7.86-8.2 14.63-16.8 21.59C25.45 41.68 24 43 24 43z" fill="#f472b6"/>
        </svg>
        <span style="color: #f472b6; font-weight: bold; font-size: 1.1rem; margin-top: 2px;"></span>
      </div>

      <!-- Самый последний блок с текстом и фото удалён -->
    </div>

    <!-- Lightbox -->
    <div
      v-if="showLightbox"
      class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <img
        :src="selectedImage"
        class="max-w-full max-h-[90vh] object-contain"
        @click.stop
      />
      <button
        class="absolute top-4 right-4 text-white text-3xl sm:text-4xl"
        @click="closeLightbox"
      >
        ×
      </button>
    </div>

    <!-- Письмо в будущее -->
    <div class="flex flex-col items-center justify-center py-8">
      <h2 class="text-xl sm:text-2xl font-semibold mb-2">Письмо в будущее</h2>
      <button
        @click="showFutureLetter = true"
        class="mt-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow transition-all duration-200"
      >
        Открой в свой следующий день рождения
      </button>

      <transition name="fade-scale">
        <div
          v-if="showFutureLetter"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          @click.self="showFutureLetter = false"
        >
          <div class="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full text-center relative animate-fade-in">
            <button
              class="absolute top-2 right-2 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
              @click="showFutureLetter = false"
            >&times;</button>
            <h3 class="text-lg sm:text-xl font-semibold mb-4 text-pink-600">Письмо в будущее</h3>
            <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
              Я не знаю, где мы будем через год, но знаю точно: ты будешь ещё сильнее, ещё красивее и всё так же сводить меня с ума…
            </p>
          </div>
        </div>
      </transition>
    </div>
    <div class="flex flex-col items-center justify-center py-8">
  <!-- Кликабельная коробка с бантом -->
  <div class="relative cursor-pointer group" @click="showGiftBox = true">
     <img :src="Gift" class="gift-box-image w-full object-cover gift" />
  </div>

  <!-- Анимация раскрытия и содержимое -->
  <transition 
    name="gift-box"
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div 
      v-if="showGiftBox"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      @click.self="showGiftBox = false"
    >
      <div class="gift-box-modal bg-white rounded-xl shadow-2xl overflow-hidden relative">
        <button
          class="absolute top-2 right-2 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none z-10"
          @click="showGiftBox = false"
        >&times;</button>
        
        <!-- Фотка -->
        <img :src="Podarok" class="gift-box-image w-full object-cover" />
        
        <!-- Песня -->
        <div class="p-4 sm:p-6">
          <p class="text-lg font-semibold text-pink-600 mb-2">Наша песня</p>
          <audio autoplay controls class="w-full">
            <source :src="yraAudio" type="audio/mpeg">
          </audio>
          <p class="mt-4 text-gray-700 text-center">Я не подарок, но вот твой подарок!</p>
        </div>
      </div>
    </div>
  </transition>
</div>
  </div>
</template>

<style scoped>
.bg-banner {
  background: url('@/assets/first-block.jpg') no-repeat center center fixed,rgb(223, 140, 167);
}

.swiper {
  @apply p-4 sm:p-8;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: theme('colors.gray.800');
  @apply w-8 h-8 sm:w-10 sm:h-10;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: theme('colors.gray.800');
}

.counter-item {
  @apply bg-gray-50 px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow;
}

.feature-circle {
  z-index: 1;
  position: relative;
  @apply w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center mb-3 sm:mb-4;
}

.feature-icon {
  @apply w-5 h-5 sm:w-6 sm:h-6 text-gray-700;
}

.content-section {
  @apply bg-white rounded-xl p-4 sm:p-8 mb-6 sm:mb-12;
}

/* Добавляем плавность для всех переходов */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Состояния для анимации */
.scale-y-0 {
  transform: scaleY(0);
}

.scale-y-100 {
  transform: scaleY(1);
}

.origin-top {
  transform-origin: top;
}

/* Add new styles for FAQ animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth shadow transition on hover */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.hearts-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.heart {
  position: absolute;
  font-size: 2rem;
  opacity: 0;
  will-change: transform;
  filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
}

.content-wrapper {
  animation: fadeIn 1s ease-out;
  position: relative;
  z-index: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Добавляем стили для контента, чтобы он был поверх сердечек */
.content-section {
  position: relative;
  z-index: 2;
  background: white;
}
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.mini-photo-popup {
  z-index: 9999;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 10px 10px 18px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  min-height: 120px;
  padding-bottom: 0;
}
.mini-photo-img {
  width: 350px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.mini-photo-close {
  position: absolute;
  top: 10px;
  right: auto;
  left: 18px;
  background: none;
  border: none;
  font-size: 24px;
  color: #f472b6;
  cursor: pointer;
}
@media (min-width: 640px) {
  .mini-photo-img {
    width: 420px;
    height: 250px;
  }
  .mini-photo-popup {
    min-width: 350px;
    min-height: 180px;
  }
}
@media (min-width: 1024px) {
  .mini-photo-img {
    z-index:150;
    width: 350px;
    height: 300px;
  }
  .mini-photo-popup {
    z-index:150;
    min-width: 370px;
    min-height: 220px;
  }
}
.reason-text {
  margin-top: 18px;
  z-index: 1;
  position: relative;
  word-break: break-word;
  max-width: 95%;
  white-space: pre-line;
}
.hero-block {
  min-height: 400px;
}
@media (min-width: 640px) {
  .hero-block {
    min-height: 550px;
  }
}
@media (max-width: 639px) {
  .reason-card {
    max-width: 90vw;
    margin: 8px auto;
  }
  .feature-circle {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  .feature-circle .heart-button {
    width: 24px !important;
    height: 24px !important;
  }
  .hero-block {
    min-height: 0;
    height: auto !important;
    padding-bottom: 24px;
  }
  .hero-text {
    font-size: 15px;
    padding: 0 2px;
    max-width: 100%;
    line-height: 1.3;
  }
}
.gift-box-modal {
  width: 90vw;
  max-width: 400px;
  margin: 0 16px;
}

.gift-box-image {
  width: 100%;
  height: auto;
  max-height: 50vh;
  object-fit: contain;
}

@media (max-width: 640px) {
  .gift-box-modal {
    width: 95vw;
    padding: 16px;
  }
  
  .gift-box-content {
    padding: 16px;
  }
  
  .gift-box-image {
    max-height: 40vh;
  }
}
.gift{
  transition: all 0.3s ease-in-out;
  &:hover{
    transform: scale(1.1)
  }
}
</style> 
<script setup>
import {ref, onMounted, computed, onUnmounted} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules'
import confetti from 'canvas-confetti'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Memory1 from '@/assets/memory1.jpg'
import Memory2 from '@/assets/memory2.jpg'
import Memory3 from '@/assets/memory3.jpg'
import Memory4 from '@/assets/memory4.jpg'
import Memory5 from '@/assets/memory5.jpg'

import Our1 from '@/assets/our1.jpg'
import Our2 from '@/assets/our2.jpg'
import Our3 from '@/assets/our3.jpg'
import Our4 from '@/assets/our4.jpg'
import Our5 from '@/assets/our5.jpg'
import Our6 from '@/assets/our6.jpg'
import yraAudio from '../assets/audio/yra.mp3'

gsap.registerPlugin(ScrollTrigger)

const showLightbox = ref(false)
const selectedImage = ref(null)
const timeElapsed = ref({days: 0, hours: 0, minutes: 0, seconds: 0})
const openQuestions = ref([])
const showContent = ref(true)

const startDate = new Date('2022-09-14T00:00:00')

const updateTimeElapsed = () => {
  const now = new Date()
  const diff = now - startDate
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  timeElapsed.value = {days, hours, minutes, seconds}

  // if (days >= 1000 && hours === 0 && minutes === 0 && seconds === 0 && !showContent.value) {
    // showContent.value = true
    // celebrate()
  // }
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
]

const reasons = [
  'Ты радуешь меня каждый день',
  'Ты действительно делаешь меня лучше',
  'С тобой комфортнее, чем с кем-либо',
  'Люблю, когда ты выдаешь свою кринжатину',
  'Ты очень заботливая и вкусно готовишь',
  'Ты понимаешь меня лучше всех'
]

const memories = [
  {
    image: Our1,
    title: 'День студентов',
    description: 'Момент, который я запомню на всю жизнь'
  },
  {
    image: Our2,
    title: 'Поездка в Саратов',
    description: 'Поездка, которая очень сблизила нас, запомнилась теплыми воспоминаниями'
  },
  {
    image: Our3,
    title: 'Лепка из пластилина',
    description: 'Мне очень сильно понравилось, это мило заниматься чем то подобным с любимым человеком'
  },
  {
    image: Our4,
    title: 'Наша прогулка летом',
    description: 'Мне зашло <3'
  },
  {
    image: Our5,
    title: '2 годика вместе',
    description: 'Огромное спасибо за подарок - он такой же тёплый и милый, как и эти два года, которые ты делаешь особенными!'
  },
  {
    image: Our6,
    title: 'Мои 18 годиков',
    description: 'Я рад что ты была рядом'
  }
]

const questions = ref([
  {
    title: 'Как мы познакомились?',
    answer: 'Наша история началась с встречи — когда я стоял с номером группы, и заметил тебя: ту самую улыбчивую девушку в очаровательной полосатой кофточке. Но по-настоящему всё закружилось позже: прогулки по саду ТГУ, тот вечер, когда ты провожала меня до остановки, наши долгие прогулки и разговоры в парках... Эти мгновения навсегда останутся в моём сердце.'
  },
  {
    title: 'Как мы начали встречаться?',
    answer: 'Набережная, вечер, вопрос — и ее счастливый возглас, перекрывший даже шум города. Так начинались мы.'
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

onMounted(() => {
  updateTimeElapsed()
  setInterval(updateTimeElapsed, 1000)

  // Animate title
  gsap.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
  })

  // Animate counter
  gsap.from('.counter-item', {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  })

  // Animate reasons
  gsap.from('.reason-item', {
    scrollTrigger: {
      trigger: '.reasons-section',
      start: 'top center',
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
  })

  // Animate memories cards
  gsap.from('.memory-card', {
    scrollTrigger: {
      trigger: '.memories-section',
      start: 'top center',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
  })

  // Animate final section
  gsap.from('.final-section', {
    scrollTrigger: {
      trigger: '.final-section',
      start: 'top center',
    },
    scale: 0.9,
    opacity: 0,
    duration: 1
  })
})
</script>

<template>
  <div class="py-4 sm:py-8">
    <!-- Hearts Animation Container -->
    <div class="hearts-container">
      <div v-for="n in 30" :key="n" class="heart">❤️</div>
    </div>

    <button 
      @click="celebrate"
      class="fixed bottom-[30px] right-[30px] bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 z-50"
    >
      Уря
    </button>

    <!-- Hero Section with Counter -->
    <div class="content-section">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-12">Вместе навсегда</h1>
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
        Каждая минута с тобой - бесценна
      </p>
    </div>

    <!-- Rest of the content -->
    <div v-if="showContent" class="content-wrapper">
      <!-- Love Declaration Section -->
      <div class="content-section relative overflow-hidden h-[300px] sm:h-[400px]">
        <div class="absolute inset-0 bg-cover bg-center bg-banner"></div>
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-white p-4 sm:p-8">
          <h2 class="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Я люблю тебя</h2>
          <p class="text-base sm:text-lg max-w-2xl text-center">
            Ты - мое самое большое счастье. Каждый день рядом с тобой наполнен смыслом и радостью.
            Ты делаешь меня лучше, вдохновляешь на новые свершения и даришь unconditional love.
          </p>
        </div>
      </div>

      <!-- Reasons Section -->
      <div class="content-section">
        <h2 class="section-title text-2xl sm:text-3xl">Почему я тебя люблю</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div v-for="(reason, index) in reasons" :key="index" 
               class="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <div class="feature-circle mx-auto">
              <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <p class="text-center text-gray-700 text-sm sm:text-base">{{ reason }}</p>
          </div>
        </div>
      </div>

      <!-- Photo Slider Section -->
      <div class="content-section">
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

      <!-- Future & Past Section -->
      <div class="content-section">
        <h2 class="section-title text-2xl sm:text-3xl">Наше прошлое и будущее</h2>
        
        <!-- First Block - Text Left, Image Right -->
        <div class="flex flex-col md:flex-row items-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div class="w-full md:w-1/2 p-4 sm:p-6">
            <h3 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">Наше прошлое</h3>
            <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Я бесконечно счастлив, что судьба подарила мне столько прекрасных моментов с тобой. Каждый день, проведенный вместе, был особенным и незабываемым. Помню наши первые встречи, прогулки по городу, совместные поездки и те теплые вечера, когда мы просто лежали и смотрели сериалы. Ты научила меня ценить каждое мгновение и показала, что значит быть по-настоящему счастливым.
            </p>
            <p class="text-sm sm:text-base text-gray-600">
              С тобой я стал лучше, добрее и сильнее. Ты всегда поддерживала меня в трудные моменты, верила в меня и помогала расти. Наши совместные воспоминания - это самое ценное, что у меня есть, и я благодарен за каждый момент, проведенный рядом с тобой.
            </p>
          </div>
          <div class="w-full md:w-1/2">
            <img 
              src="@/assets/block2.jpg"
              alt="Наши воспоминания" 
              class="w-full h-[300px] sm:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <!-- Second Block - Image Left, Text Right -->
        <div class="flex flex-col-reverse md:flex-row items-center gap-4 sm:gap-8">
          <div class="w-full md:w-1/2">
            <img 
              src="@/assets/block1.jpg"
              alt="Наше будущее" 
              class="w-full h-[300px] sm:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div class="w-full md:w-1/2 p-4 sm:p-6">
            <h3 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">Наше будущее</h3>
            <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              В будущем я хочу вместе с тобой путешествовать по разным городам и странам, пробовать новую еду в разных ресторанах, смотреть новые сериалы и аниме, которые ты так любишь. Мечтаю о нашей уютной квартире, где мы будем жить вместе с маленьким котенком, как в тех милых видео из TikTok про пары, которые съехались.
            </p>
            <p class="text-sm sm:text-base text-gray-600">
              Хочу просыпаться рядом с тобой каждое утро, готовить вместе завтрак, планировать наши выходные и создавать новые воспоминания. Мечтаю о том, как мы будем вместе расти, развиваться и становиться лучше, поддерживая друг друга во всех начинаниях. Ты - мое настоящее и будущее, и я хочу прожить с тобой всю жизнь, наполненную любовью, радостью и счастьем.
            </p>
          </div>
        </div>
      </div>

      <!-- Memories Section -->
      <div class="content-section">
        <h2 class="section-title text-2xl sm:text-3xl">Особенные воспоминания</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div
            v-for="(memory, index) in memories"
            :key="index"
            class="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform hover:scale-105 duration-300"
          >
            <img :src="memory.image" class="cursor-pointer w-full h-40 sm:h-48 object-cover" @click="openLightbox(memory.image)"/>
            <div class="p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{{ memory.title }}</h3>
              <p class="text-sm sm:text-base text-gray-600">{{ memory.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
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

      <!-- Final Section -->
      <div class="flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <p class="text-base sm:text-lg md:text-xl font-medium text-center text-gray-800 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Я хочу провести с ней всё будущее, которое нам предначертано, все поездки отдыхать, все скуф-выходные, все серии 'мама в 16', все среды в KFC.
          Каждый день рядом с ней - это дар, и я бесконечно благодарен судьбе
          за эти отношения, наполненные смехом, теплом и взаимопониманием.
        </p>
        <div class="w-full max-w-sm sm:max-w-md">
          <img
            src="@/assets/flower.jpg"
            alt="Цветок нашей любви"
            class="rounded-lg shadow-md w-full h-auto object-cover"
          >
        </div>
      </div>
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
  </div>
</template>

<style scoped>
.bg-banner {
  background: url('@/assets/first-block.jpg') no-repeat center center fixed;
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

/* Mobile-first media queries */
@media (max-width: 640px) {
  .content-section {
    @apply p-4;
  }
  
  .section-title {
    @apply text-2xl mb-6;
  }
  
  .feature-circle {
    @apply w-10 h-10 mb-3;
  }
  
  .feature-icon {
    @apply w-5 h-5;
  }
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
</style> 
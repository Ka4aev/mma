<script setup>
import {ref, onMounted} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const showLightbox = ref(false)
const selectedImage = ref(null)
const timeElapsed = ref({days: 0, hours: 0, minutes: 0, seconds: 0})
const openQuestions = ref([])

const startDate = new Date('2022-09-14')

const updateTimeElapsed = () => {
  const now = new Date()
  const diff = now - startDate
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  timeElapsed.value = {days, hours, minutes, seconds}
}

const images = [
  'src/assets/memory1.jpg',
  'src/assets/memory2.jpg',
  'src/assets/memory3.jpg',
  'src/assets/memory4.jpg',
  'src/assets/memory5.jpg',
]

const reasons = [
  'Твоя улыбка освещает мой мир',
  'Ты делаешь меня лучше каждый день',
  'С тобой я чувствую себя по-настоящему счастливым',
  'Ты поддерживаешь все мои мечты',
  'Твоя забота делает меня сильнее',
  'Ты понимаешь меня без слов'
]

const memories = [
  {
    image: 'src/assets/our1.jpg',
    title: 'День студентов',
    description: 'Момент, который я запомню на всю жизнь'
  },
  {
    image: 'src/assets/our2.jpg',
    title: 'Поездка в саратов',
    description: 'Поездка, которая очень сблизила нас, запомнилась теплыми воспоминаниями'
  },
  {
    image: 'src/assets/our3.jpg',
    title: 'Лепили из пластилина',
    description: 'Мне очень сильно понравилось, это мило заниматься чем то подобным с любимым человеком'
  },
  {
    image: 'src/assets/our4.jpg',
    title: 'Наша прогулка летом',
    description: 'Мне зашло <3'
  },
  {
    image: 'src/assets/our5.jpg',
    title: '2 годика вместе',
    description: 'Огромное спасибо за подарок - он такой же тёплый и милый, как и эти два года, которые ты делаешь особенными!'
  },
  {
    image: 'src/assets/our6.jpg',
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

  // Show answers sequentially with 2 second intervals
  questions.value.forEach((_, index) => {
    setTimeout(() => {
      visibleAnswers.value.add(index)
    }, 2000 * (index + 1))
  })
})
</script>

<template>
  <div class="py-8">
    <!-- Hero Section with Counter -->
    <div class="content-section">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">Вместе навсегда</h1>
      <div class="flex justify-center gap-8 mb-8">
        <div class="bg-white px-6 py-4 rounded-lg shadow-sm text-center">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.days }}</div>
          <div class="text-gray-600">дней</div>
        </div>
        <div class="bg-white px-6 py-4 rounded-lg shadow-sm text-center">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.hours }}</div>
          <div class="text-gray-600">часов</div>
        </div>
        <div class="bg-white px-6 py-4 rounded-lg shadow-sm text-center">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.minutes }}</div>
          <div class="text-gray-600">минут</div>
        </div>
        <div class="bg-white px-6 py-4 rounded-lg shadow-sm text-center">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ timeElapsed.seconds }}</div>
          <div class="text-gray-600">секунд</div>
        </div>
      </div>
      <p class="text-center text-gray-600 text-lg">
        Каждая минута с тобой - бесценна
      </p>
    </div>

    <!-- Love Declaration Section -->
    <div class="content-section relative overflow-hidden h-[400px]">
      <div
          class="absolute inset-0 bg-cover bg-center"
          style="background: url('src/assets/first-block.jpg') no-repeat center center  fixed;')"
      ></div>
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
        <h2 class="text-4xl font-bold mb-6">Я люблю тебя</h2>
        <p class="text-lg max-w-2xl text-center">
          Ты - мое самое большое счастье. Каждый день рядом с тобой наполнен смыслом и радостью.
          Ты делаешь меня лучше, вдохновляешь на новые свершения и даришь unconditional love.
        </p>
      </div>
    </div>

    <!-- Reasons Section -->
    <div class="content-section">
      <h2 class="section-title">Почему я тебя люблю</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(reason, index) in reasons" :key="index"
             class="bg-gray-50 p-6 rounded-lg">
          <div class="feature-circle mx-auto">
            <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <p class="text-center text-gray-700">{{ reason }}</p>
        </div>
      </div>
    </div>

    <!-- Photo Slider Section -->
    <div class="content-section">
      <h2 class="section-title">Красивые мы</h2>
      <Swiper
          :modules="[EffectCoverflow, Navigation, Pagination]"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
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
        <SwiperSlide v-for="(image, index) in images" :key="index" class="w-72">
          <img
              :src="image"
              class="w-full h-56 object-cover rounded-lg cursor-pointer shadow-md"
              @click="openLightbox(image)"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Future & Past Section -->
    <div class="content-section">
      <h2 class="section-title">Наше прошлое и будущее</h2>

      <!-- First Block - Text Left, Image Right -->
      <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div class="w-full md:w-1/2 p-6">
          <h3 class="text-2xl font-semibold mb-4 text-gray-800">Наше прошлое</h3>
          <p class="text-gray-600 mb-4">
            Для того, чтобы начать сотрудничество, необходимо оформить груз указав информацию о содержимом груза, его
            стоимость и количество. А также прикрепить фотографии к заявке.
          </p>
          <p class="text-gray-600">
            Если требуется проверка товара на соответствие количеству, то при оформлении груза на нашем сайте укажите
            это в графе "Примечание". Данная услуга платная и составляет 3 юаня за одну позицию в заказе.
          </p>
        </div>
        <div class="w-full md:w-1/2">
          <img
              src="../assets/block2.jpg"
              alt="Shipping Container"
              class="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <!-- Second Block - Image Left, Text Right -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-8">
        <div class="w-full md:w-1/2">
          <img
              src="../assets/block1.jpg"
              alt="Future Cargo"
              class="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div class="w-full md:w-1/2 p-6">
          <h3 class="text-2xl font-semibold mb-4 text-gray-800">Наше будущее</h3>
          <p class="text-gray-600 mb-4">
            До отправки груза на наш склад в Китае обязательно позаботьтесь о том, чтобы сделать маркировку, с номером
            Вашего заказа у нас на сайте для каждой внешней коробки, чтобы мы смогли распределить именно Ваш груз.
          </p>
          <p class="text-gray-600">
            После отправки груза на наш склад в Китае, Вам обязательно нужно указать трек-номер для отслеживания посылок
            по Китаю для каждой позиции в заказе.
          </p>
        </div>
      </div>
    </div>

    <!-- Memories Section -->
    <div class="content-section">
      <h2 class="section-title">Особенные воспоминания</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
            v-for="(memory, index) in memories"
            :key="index"
            class="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform hover:scale-105 duration-300"
        >
          <img :src="memory.image" class="w-full h-48 object-cover" @click="openLightbox(memory.image)"/>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ memory.title }}</h3>
            <p class="text-gray-600">{{ memory.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="py-16">
      <div class="w-full mx-auto space-y-4">
        <div
            v-for="(question, index) in questions"
            :key="index"
            class="w-full bg-white rounded-[20px] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
            @click="toggleQuestion(index)"
        >
          <div class="w-full px-8 py-6 text-left flex justify-between items-center">
            <span class="text-[18px] font-medium text-[#1E293B]">{{ question.title }}</span>
            <div
                class="w-10 h-10 flex items-center justify-center transition-transform duration-300"
                :class="{ 'rotate-180': visibleAnswers.has(index) }"
            >
              <svg
                  class="w-6 h-6 text-gray-400"
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
            <div class="px-8 pb-6">
              <p class="text-[#475569] text-[16px] leading-relaxed">{{ question.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <p class="text-lg sm:text-xl md:text-2xl font-medium text-center text-gray-800 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
        Я хочу провести с ней всё будущее, которое нам предначертано, все поездки отдыхать, все скуф-выходные, все серии 'мама в 16', все среды в KFC.
        Каждый день рядом с ней - это дар, и я бесконечно благодарен судьбе
        за эти отношения, наполненные смехом, теплом и взаимопониманием.
      </p>
      <div class="w-full max-w-md">
        <img
            src="../assets/flower.jpg"
            alt="Цветок нашей любви"
            class="rounded-lg shadow-md w-full h-auto object-cover"
        >
      </div>
    </div>

    <!-- Lightbox -->
    <div
        v-if="showLightbox"
        class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
        @click="closeLightbox"
    >
      <img
          :src="selectedImage"
          class="max-w-full max-h-full object-contain p-4"
          @click.stop
      />
      <button
          class="absolute top-4 right-4 text-white text-4xl"
          @click="closeLightbox"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.swiper {
  padding: 2rem;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: theme('colors.gray.800');
}

:deep(.swiper-pagination-bullet-active) {
  background-color: theme('colors.gray.800');
}

.counter-item {
  @apply bg-gray-50 px-8 py-4 rounded-xl shadow;
}

.feature-circle {
  @apply w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mb-4;
}

.feature-icon {
  @apply w-6 h-6 text-gray-700;
}

.content-section {
  @apply bg-white rounded-xl p-8 mb-12;
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
</style> 
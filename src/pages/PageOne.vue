<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import gsap from 'gsap'
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
import Block1 from '@/assets/block1.jpg'
import Block2 from '@/assets/block2.jpg'
import FirstBlock from '@/assets/first-block.jpg'
import Flower from '@/assets/flower.jpg'
import { useRelationshipTimers } from '@/composables/useRelationshipTimers'

const { timeElapsed, padNumber } = useRelationshipTimers()

const showLightbox = ref(false)
const selectedImage = ref(null)
const visibleAnswers = ref(new Set())

const images = [Memory1, Memory2, Memory3, Memory4, Memory5]

const reasons = [
  'Ты радуешь меня каждый день',
  'Ты действительно делаешь меня лучше',
  'С тобой комфортнее, чем с кем-либо',
  'Люблю, когда ты выдаешь свою кринжатину',
  'Ты очень заботливая и вкусно готовишь',
  'Ты понимаешь меня лучше всех',
]

const memories = [
  {
    image: Our1,
    title: 'День студентов',
    description: 'Момент, который я запомню на всю жизнь',
  },
  {
    image: Our2,
    title: 'Поездка в Саратов',
    description: 'Поездка, которая очень сблизила нас, запомнилась теплыми воспоминаниями',
  },
  {
    image: Our3,
    title: 'Лепка из пластилина',
    description: 'Мне очень сильно понравилось, это мило заниматься чем то подобным с любимым человеком',
  },
  {
    image: Our4,
    title: 'Наша прогулка летом',
    description: 'Мне зашло <3',
  },
  {
    image: Our5,
    title: '2 годика вместе',
    description: 'Огромное спасибо за подарок - он такой же тёплый и милый, как и эти два года, которые ты делаешь особенными!',
  },
  {
    image: Our6,
    title: 'Мои 18 годиков',
    description: 'Я рад что ты была рядом',
  },
]

const questions = [
  {
    title: 'Как мы познакомились?',
    answer: 'Наша история началась с встречи — когда я стоял с номером группы, и заметил тебя: ту самую улыбчивую девушку в очаровательной полосатой кофточке. Но по-настоящему всё закружилось позже: прогулки по саду ТГУ, тот вечер, когда ты провожала меня до остановки, наши долгие прогулки и разговоры в парках... Эти мгновения навсегда останутся в моём сердце.',
  },
  {
    title: 'Как мы начали встречаться?',
    answer: 'Набережная, вечер, вопрос — и ее счастливый возглас, перекрывший даже шум города. Так начинались мы.',
  },
  {
    title: 'Чем она мне понравилась?',
    answer: 'Да, вещь банальная — но для меня она была уникальной. Не говорю уж про внешность, но характер — мое отражение: чуть кринжовый, угарный, вечно подкидывает какой-то неожиданный поворот. И это — моё.',
  },
  {
    title: 'Как мы обычно проводим время?',
    answer: 'Люблю просто лежать с ней в обнимку, кушац чипсы и пить кока колу :3',
  },
  {
    title: 'Счастлив я с ней?',
    answer: 'Без сомнения. Никогда прежде я не чувствовал себя так счастливо и комфортно в отношениях. Были и трудные моменты, но мы всегда преодолевали их вместе.',
  },
]

const openLightbox = (image) => {
  selectedImage.value = image
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = 'auto'
}

const toggleQuestion = (index) => {
  if (visibleAnswers.value.has(index)) {
    visibleAnswers.value.delete(index)
    return
  }

  visibleAnswers.value.add(index)
}

onMounted(() => {
  gsap.fromTo(
    '[data-page-one-animate]',
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.08, duration: 0.75, ease: 'power3.out' },
  )
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20" aria-label="Первая страница">
    <div class="space-y-8 sm:space-y-10">
      <div class="rounded-[32px] bg-white px-6 py-10 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:px-10" data-page-one-animate>
        <h1 class="mb-8 text-center text-3xl font-bold tracking-tight text-slate-800 sm:text-5xl">Вместе навсегда</h1>
        <div class="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div
            v-for="(value, label) in {
              дней: timeElapsed.days,
              часов: padNumber(timeElapsed.hours),
              минут: padNumber(timeElapsed.minutes),
              секунд: padNumber(timeElapsed.seconds),
            }"
            :key="label"
            class="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-5 text-center shadow-sm"
          >
            <div class="text-3xl font-bold tabular-nums text-slate-800">{{ value }}</div>
            <div class="mt-1 text-sm text-slate-500">{{ label }}</div>
          </div>
        </div>
        <p class="text-center text-base text-slate-500 sm:text-lg">Каждая минута с тобой - бесценна</p>
      </div>

      <div
        class="relative overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
        data-page-one-animate
      >
        <img :src="FirstBlock" alt="Мы" class="h-[310px] w-full object-cover sm:h-[420px]" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/50"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <h2 class="mb-4 text-3xl font-bold sm:text-5xl">Я люблю тебя</h2>
          <p class="max-w-2xl text-base leading-8 text-white/90 sm:text-xl">
            Ты - мое самое большое счастье. Каждый день рядом с тобой наполнен смыслом и радостью.
            Ты делаешь меня лучше, вдохновляешь на новые свершения и даришь unconditional love.
          </p>
        </div>
      </div>

      <div class="rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-8" data-page-one-animate>
        <h2 class="mb-8 text-center text-3xl font-bold text-slate-800">Почему я тебя люблю</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="reason in reasons"
            :key="reason"
            class="rounded-[24px] border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow-sm"
          >
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p class="text-slate-600">{{ reason }}</p>
          </article>
        </div>
      </div>

      <div class="rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-8" data-page-one-animate>
        <h2 class="mb-8 text-center text-3xl font-bold text-slate-800">Красивые мы</h2>
        <Swiper
          :modules="[EffectCoverflow, Navigation, Pagination]"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          slidesPerView="auto"
          :coverflowEffect="{
            rotate: 45,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }"
          :pagination="true"
          :navigation="true"
          class="mx-auto w-full max-w-4xl"
        >
          <SwiperSlide v-for="(image, index) in images" :key="index" class="w-56 sm:w-72">
            <img
              :src="image"
              alt="Наше фото"
              class="h-44 w-full cursor-pointer rounded-[24px] object-cover shadow-lg sm:h-60"
              @click="openLightbox(image)"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-8" data-page-one-animate>
        <h2 class="mb-8 text-center text-3xl font-bold text-slate-800">Наше прошлое и будущее</h2>
        <div class="space-y-8">
          <div class="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 class="mb-4 text-2xl font-semibold text-slate-800">Наше прошлое</h3>
              <p class="mb-4 leading-8 text-slate-600">
                Я бесконечно счастлив, что судьба подарила мне столько прекрасных моментов с тобой.
                Каждый день, проведенный вместе, был особенным и незабываемым.
              </p>
              <p class="leading-8 text-slate-600">
                Наши совместные воспоминания - это самое ценное, что у меня есть, и я благодарен за
                каждый момент, проведенный рядом с тобой.
              </p>
            </div>
            <img :src="Block2" alt="Наше прошлое" class="h-[340px] w-full rounded-[28px] object-cover shadow-lg" />
          </div>

          <div class="grid gap-6 md:grid-cols-2 md:items-center">
            <img :src="Block1" alt="Наше будущее" class="order-2 h-[340px] w-full rounded-[28px] object-cover shadow-lg md:order-1" />
            <div class="order-1 md:order-2">
              <h3 class="mb-4 text-2xl font-semibold text-slate-800">Наше будущее</h3>
              <p class="mb-4 leading-8 text-slate-600">
                В будущем я хочу вместе с тобой путешествовать, пробовать новую еду и строить нашу
                уютную жизнь с общими ритуалами и привычками.
              </p>
              <p class="leading-8 text-slate-600">
                Ты - мое настоящее и будущее, и я хочу прожить с тобой всю жизнь, наполненную любовью,
                радостью и счастьем.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-8" data-page-one-animate>
        <h2 class="mb-8 text-center text-3xl font-bold text-slate-800">Особенные воспоминания</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="memory in memories"
            :key="memory.title"
            class="overflow-hidden rounded-[26px] border border-slate-100 bg-slate-50 shadow-sm"
          >
            <img
              :src="memory.image"
              :alt="memory.title"
              class="h-48 w-full cursor-pointer object-cover"
              @click="openLightbox(memory.image)"
            />
            <div class="p-5">
              <h3 class="mb-2 text-xl font-semibold text-slate-800">{{ memory.title }}</h3>
              <p class="text-slate-600">{{ memory.description }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="space-y-4" data-page-one-animate>
        <div
          v-for="(question, index) in questions"
          :key="question.title"
          class="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 rounded-[28px] bg-transparent px-6 py-5 text-left transition-colors duration-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-0 sm:px-8"
            @click="toggleQuestion(index)"
          >
            <span class="text-lg font-semibold text-slate-800">{{ question.title }}</span>
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-300"
              :class="{ 'rotate-180 bg-rose-50 text-rose-500': visibleAnswers.has(index) }"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div
            class="overflow-hidden transition-all duration-300"
            :style="{
              maxHeight: visibleAnswers.has(index) ? '360px' : '0',
              opacity: visibleAnswers.has(index) ? '1' : '0',
            }"
          >
            <p class="px-6 pb-6 leading-8 text-slate-600 sm:px-8">{{ question.answer }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-[32px] bg-white p-6 text-center shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-10" data-page-one-animate>
        <p class="mx-auto mb-8 max-w-2xl text-lg leading-8 text-slate-600">
          Я хочу провести с ней всё будущее, которое нам предначертано, все поездки отдыхать, все
          скуф-выходные, все серии "мама в 16", все среды в KFC.
        </p>
        <img :src="Flower" alt="Цветок нашей любви" class="mx-auto w-full max-w-md rounded-[28px] object-cover shadow-lg" />
      </div>
    </div>

    <div
      v-if="showLightbox"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      @click="closeLightbox"
    >
      <img :src="selectedImage" alt="Увеличенное фото" class="max-h-[90vh] max-w-full rounded-2xl object-contain" />
    </div>
  </section>
</template>

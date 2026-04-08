<script setup>
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import { useRelationshipMilestone } from '@/composables/useRelationshipTimers'

const { formatTimeUnitLabel, padNumber, targetDate, timeSinceTarget, timeToTarget } = useRelationshipMilestone(1500)

const isUnlocked = computed(() => timeToTarget.value.isComplete)

onMounted(() => {
  gsap.fromTo(
    '[data-page-three-animate]',
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
  )
})
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20" aria-label="Третья страница">
    <div class="space-y-6">
      <div
        v-if="!isUnlocked"
        class="overflow-hidden rounded-[38px] border border-[#103b37]/20 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.20),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(234,179,8,0.18),_transparent_32%),linear-gradient(135deg,_#062925_0%,_#0b3b35_46%,_#114e46_100%)] p-6 text-white shadow-[0_35px_90px_rgba(6,41,37,0.34)] sm:p-8 lg:p-10"
        data-page-three-animate
      >
        <div class="mx-auto max-w-5xl">
          <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-3xl">
              <div class="flex h-20 w-20 items-center justify-center rounded-[26px] border border-white/15 bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur">
                <svg class="h-9 w-9 text-emerald-100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 10V7a4 4 0 118 0v3m-9 0h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8a1 1 0 011-1z" />
                </svg>
              </div>

              <span class="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-50/80">
                страница откроется в день 1500
              </span>

              <h1 class="mt-6 text-4xl font-black leading-none tracking-[-0.04em] sm:text-6xl">
                Следующая глава ждёт свой момент.
              </h1>

              <p class="mt-5 max-w-2xl text-base leading-8 text-emerald-50/80 sm:text-lg">
                Эта страница останется закрытой до следующей большой отметки. Дождемся ее вместе.
              </p>
            </div>

            <div class="rounded-[30px] border border-white/12 bg-white/10 px-5 py-5 backdrop-blur">
              <p class="text-sm uppercase tracking-[0.2em] text-emerald-50/70">дата открытия</p>
              <p class="mt-3 text-3xl font-black text-white">{{ targetDate.toLocaleDateString('ru-RU') }}</p>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div
              v-for="item in [
                { value: timeToTarget.days, label: formatTimeUnitLabel('days', timeToTarget.days) },
                { value: padNumber(timeToTarget.hours), label: formatTimeUnitLabel('hours', timeToTarget.hours) },
                { value: padNumber(timeToTarget.minutes), label: formatTimeUnitLabel('minutes', timeToTarget.minutes) },
                { value: padNumber(timeToTarget.seconds), label: formatTimeUnitLabel('seconds', timeToTarget.seconds) },
              ]"
              :key="item.label"
              class="rounded-[30px] border border-white/10 bg-black/15 px-4 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
            >
              <div class="text-4xl font-black tabular-nums text-amber-200 sm:text-5xl">{{ item.value }}</div>
              <div class="mt-2 text-sm uppercase tracking-[0.16em] text-emerald-50/70">{{ item.label }}</div>
            </div>
          </div>

          <div class="mt-8 grid gap-4 lg:grid-cols-3">
            <article class="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50/65">1500 дней</p>
              <p class="mt-4 leading-8 text-emerald-50/80">
                Ещё один большой чекпоинт, который уже хочется сохранить как отдельную маленькую дату.
              </p>
            </article>
            <article class="rounded-[28px] border border-white/10 bg-black/15 p-5 backdrop-blur">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50/65">мы дождемся</p>
              <p class="mt-4 leading-8 text-emerald-50/80">
                Мы дождемся этой даты вместе, в радости и любви. Две бесячки, два барсика, которые все равно
                идут рядом и делают свою историю еще теплее.
              </p>
            </article>
            <article class="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50/65">до встречи</p>
              <p class="mt-4 leading-8 text-emerald-50/80">
                Пока эта карточка просто напоминает, что у истории впереди ещё есть новые главы.
              </p>
            </article>
          </div>
        </div>
      </div>

      <div
        v-else
        class="overflow-hidden rounded-[38px] border border-amber-200/60 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_30%),linear-gradient(135deg,_#fff7ed_0%,_#fef3c7_45%,_#d1fae5_100%)] p-6 text-slate-900 shadow-[0_30px_90px_rgba(16,185,129,0.18)] sm:p-8 lg:p-10"
        data-page-three-animate
      >
        <span class="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          1500 дней уже наступили
        </span>
        <h1 class="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Эта страница открылась.</h1>
        <p class="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
          Теперь счётчик идёт уже от этой даты. Можно будет наполнить страницу чем-то новым, когда этот момент наступит.
        </p>

        <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="item in [
              { value: timeSinceTarget.days, label: formatTimeUnitLabel('days', timeSinceTarget.days) },
              { value: padNumber(timeSinceTarget.hours), label: formatTimeUnitLabel('hours', timeSinceTarget.hours) },
              { value: padNumber(timeSinceTarget.minutes), label: formatTimeUnitLabel('minutes', timeSinceTarget.minutes) },
              { value: padNumber(timeSinceTarget.seconds), label: formatTimeUnitLabel('seconds', timeSinceTarget.seconds) },
            ]"
            :key="item.label"
            class="rounded-[28px] border border-slate-900/10 bg-white/70 px-4 py-6 text-center"
          >
            <div class="text-4xl font-black tabular-nums text-emerald-700 sm:text-5xl">{{ item.value }}</div>
            <div class="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCelebrate } from '@/composables/useCelebrate'

const { celebrate } = useCelebrate()
</script>

<template>
  <div class="relative py-6 sm:py-8">
    <div class="hearts-container">
      <div v-for="n in 30" :key="n" class="heart">❤️</div>
    </div>

    <div class="fixed right-4 top-4 z-50 flex flex-col items-end gap-3 sm:right-8 sm:top-8">
      <div class="rounded-[28px] border border-slate-200/80 bg-white/90 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur">
        <div class="flex flex-col gap-2">
          <RouterLink
            to="/1"
            class="flex h-11 min-w-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-all duration-300"
            active-class="bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)]"
            exact-active-class="bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)]"
          >
            1
          </RouterLink>
          <RouterLink
            to="/2"
            class="flex h-11 min-w-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-all duration-300"
            active-class="bg-rose-500 text-white shadow-[0_12px_32px_rgba(244,63,94,0.34)]"
            exact-active-class="bg-rose-500 text-white shadow-[0_12px_32px_rgba(244,63,94,0.34)]"
          >
            2
          </RouterLink>
        </div>
      </div>

      <button
        type="button"
        class="rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(244,63,94,0.34)] transition-all duration-300 hover:scale-105"
        @click="celebrate"
      >
        Ура
      </button>
    </div>

    <div class="relative z-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.hearts-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  overflow: hidden;
}

.heart {
  position: absolute;
  font-size: 2rem;
  opacity: 0;
  will-change: transform;
  filter: drop-shadow(0 0 6px rgba(251, 113, 133, 0.35));
}
</style>

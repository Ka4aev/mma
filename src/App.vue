<script setup>
import { ref } from 'vue'
import MainContent from './components/MainContent.vue'

// Удаляю всё, что связано с PasswordScreen и аутентификацией

</script>

<template>
  <!-- Верхний левый угол -->
  <svg style="position: fixed; top: 0; left: 0; z-index: 1; width: 140px; height: 140px; pointer-events: none;" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 120 Q60 60 130 20" stroke="#b7cbb1" stroke-width="6" fill="none"/>
    <ellipse cx="40" cy="100" rx="10" ry="4" fill="#b7cbb1" transform="rotate(-20 40 100)"/>
    <ellipse cx="70" cy="70" rx="12" ry="5" fill="#b7cbb1" transform="rotate(-10 70 70)"/>
    <ellipse cx="110" cy="40" rx="8" ry="3.5" fill="#b7cbb1" transform="rotate(10 110 40)"/>
    <ellipse cx="55" cy="90" rx="6" ry="2.5" fill="#b7cbb1" transform="rotate(-15 55 90)"/>
    <ellipse cx="90" cy="55" rx="7" ry="3" fill="#b7cbb1" transform="rotate(5 90 55)"/>
  </svg>
  <!-- Нижний правый угол -->
  <svg style="position: fixed; bottom: 0; right: 0; z-index: 1; width: 140px; height: 140px; pointer-events: none; transform: scale(-1, -1);" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 120 Q60 60 130 20" stroke="#b7cbb1" stroke-width="6" fill="none"/>
    <ellipse cx="40" cy="100" rx="10" ry="4" fill="#b7cbb1" transform="rotate(-20 40 100)"/>
    <ellipse cx="70" cy="70" rx="12" ry="5" fill="#b7cbb1" transform="rotate(-10 70 70)"/>
    <ellipse cx="110" cy="40" rx="8" ry="3.5" fill="#b7cbb1" transform="rotate(10 110 40)"/>
    <ellipse cx="55" cy="90" rx="6" ry="2.5" fill="#b7cbb1" transform="rotate(-15 55 90)"/>
    <ellipse cx="90" cy="55" rx="7" ry="3" fill="#b7cbb1" transform="rotate(5 90 55)"/>
  </svg>
  <!-- Левый центр -->
  <svg style="position: fixed; top: 45%; left: 0; z-index: 1; width: 100px; height: 180px; pointer-events: none;" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 170 Q60 90 90 20" stroke="#b7cbb1" stroke-width="5" fill="none"/>
    <ellipse cx="35" cy="140" rx="9" ry="3.5" fill="#b7cbb1" transform="rotate(-20 35 140)"/>
    <ellipse cx="60" cy="100" rx="10" ry="4" fill="#b7cbb1" transform="rotate(-10 60 100)"/>
    <ellipse cx="80" cy="60" rx="7" ry="2.5" fill="#b7cbb1" transform="rotate(10 80 60)"/>
    <ellipse cx="50" cy="120" rx="5" ry="2" fill="#b7cbb1" transform="rotate(-15 50 120)"/>
  </svg>
  <!-- Правый центр -->
  <svg style="position: fixed; top: 40%; right: 0; z-index: 1; width: 100px; height: 180px; pointer-events: none; transform: scale(-1, 1);" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 170 Q60 90 90 20" stroke="#b7cbb1" stroke-width="5" fill="none"/>
    <ellipse cx="35" cy="140" rx="9" ry="3.5" fill="#b7cbb1" transform="rotate(-20 35 140)"/>
    <ellipse cx="60" cy="100" rx="10" ry="4" fill="#b7cbb1" transform="rotate(-10 60 100)"/>
    <ellipse cx="80" cy="60" rx="7" ry="2.5" fill="#b7cbb1" transform="rotate(10 80 60)"/>
    <ellipse cx="50" cy="120" rx="5" ry="2" fill="#b7cbb1" transform="rotate(-15 50 120)"/>
  </svg>
  <!-- Основной контент -->
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4">
      <MainContent />
    </div>
  </div>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup>
import { ref } from 'vue'
import PasswordScreen from './components/PasswordScreen.vue'
import MainContent from './components/MainContent.vue'

const isAuthenticated = ref(false)
const showContent = ref(false)

const handleAuthentication = () => {
  isAuthenticated.value = true
  setTimeout(() => {
    showContent.value = true
  }, 500)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4">
      <Transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-500 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <PasswordScreen
          v-if="!isAuthenticated"
          @authenticated="handleAuthentication"
        />
      </Transition>

      <Transition
        enter-active-class="transition duration-1000 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <MainContent v-if="showContent" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
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

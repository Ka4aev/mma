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
    <div class="mx-auto max-w-7xl px-4">
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

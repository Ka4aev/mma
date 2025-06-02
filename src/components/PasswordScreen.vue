<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['authenticated'])
const password = ['1', '4', '0', '9']
const inputs = ref(['', '', '', ''])
const inputRefs = ref([])
const errorMessage = ref('')
const isShaking = ref(false)

const handleInput = (index, event) => {
  const value = event.target.value
  if (value && !isNaN(value)) {
    inputs.value[index] = value.slice(-1)
    if (index < 3) {
      inputRefs.value[index + 1].focus()
    }
    checkPassword()
  }
}

const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !inputs.value[index] && index > 0) {
    inputRefs.value[index - 1].focus()
  }
}

const checkPassword = () => {
  if (inputs.value.every(input => input !== '')) {
    if (inputs.value.join('') === password.join('')) {
      emit('authenticated')
    } else {
      errorMessage.value = 'Неверный пароль'
      isShaking.value = true
      gsap.to(inputRefs.value, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        onComplete: () => {
          isShaking.value = false
          inputs.value = ['', '', '', '']
          inputRefs.value[0].focus()
        }
      })
    }
  }
}

onMounted(() => {
  inputRefs.value[0].focus()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <div 
        class="bg-white p-8 rounded-lg shadow-md"
        :class="{ 'animate-shake': isShaking }"
      >
        <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">Введите пароль</h2>
        <div class="flex justify-center gap-3 mb-6">
          <input
            v-for="(input, index) in inputs"
            :key="index"
            type="text"
            inputmode="numeric"
            v-model="inputs[index]"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            ref="inputRefs"
            maxlength="1"
            class="password-input"
          >
        </div>
        <p v-if="errorMessage" class="text-red-500 text-center mb-4 text-sm">{{ errorMessage }}</p>
        <p class="text-gray-500 text-center text-sm">Подсказка: Особенная дата 💝</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style> 
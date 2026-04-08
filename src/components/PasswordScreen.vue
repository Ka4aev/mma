<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  passwordHash: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    default: 4,
  },
  title: {
    type: String,
    default: 'Введите пароль',
  },
  hint: {
    type: String,
    default: 'Подсказка: Особенная дата',
  },
  panelClass: {
    type: String,
    default: 'bg-white text-gray-800 shadow-md',
  },
  inputClass: {
    type: String,
    default: 'password-input',
  },
  errorClass: {
    type: String,
    default: 'text-red-500',
  },
  hintClass: {
    type: String,
    default: 'text-gray-500',
  },
})

const emit = defineEmits(['authenticated'])
const inputs = ref(Array.from({ length: props.length }, () => ''))
const inputRefs = ref([])
const errorMessage = ref('')
const isShaking = ref(false)

const hashPassword = async (value) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const buffer = await window.crypto.subtle.digest('SHA-256', data)

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

const handleInput = (index, event) => {
  const value = event.target.value
  errorMessage.value = ''

  if (value && !isNaN(value)) {
    inputs.value[index] = value.slice(-1)
    if (index < props.length - 1) {
      inputRefs.value[index + 1].focus()
    }
    checkPassword()
    return
  }

  if (!value) {
    inputs.value[index] = ''
  }
}

const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !inputs.value[index] && index > 0) {
    inputRefs.value[index - 1].focus()
  }
}

const checkPassword = async () => {
  if (inputs.value.every(input => input !== '')) {
    const enteredPasswordHash = await hashPassword(inputs.value.join(''))

    if (enteredPasswordHash === props.passwordHash) {
      emit('authenticated')
    } else {
      errorMessage.value = 'Неверный пароль'
      isShaking.value = true
      gsap.to(inputRefs.value, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        onComplete: () => {
          isShaking.value = false
          inputs.value = Array.from({ length: props.length }, () => '')
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
        class="rounded-lg p-8"
        :class="[panelClass, { 'animate-shake': isShaking }]"
      >
        <h2 class="mb-8 text-center text-2xl font-bold">{{ title }}</h2>
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
            :class="inputClass"
          >
        </div>
        <p v-if="errorMessage" class="mb-4 text-center text-sm" :class="errorClass">{{ errorMessage }}</p>
        <p class="text-center text-sm" :class="hintClass">{{ hint }}</p>
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

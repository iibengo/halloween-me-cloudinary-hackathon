<template>
  <div
    class="bg-gray-900 p-4 pb-2 rounded-lg shadow-lg mb-4 relative mt-8 w-full max-w-md"
  >
    <h2
      class="text-xl font-bold text-orange-400 mb-4 text-left cursor-pointer flex items-center"
      @click="toggleQuestions"
    >
      {{ en ? 'How to use this app?' : '¿Cómo usar esta app?' }}
      <span
        :class="['ml-2 transition-transform', showQuestions ? 'rotate-90' : '']"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </span>
    </h2>

    <!-- Contenedor de preguntas con transiciones -->
    <transition name="rotate-fade" mode="out-in">
      <div v-if="showQuestions" class="space-y-4" key="question-container">
        <!-- Sección de ayuda -->
        <div class="text-white rounded-lg text-left">
          <h2 class="text-xl font-bold mb-2"></h2>
          <ol class="list-decimal list-inside space-y-1">
            <li>
              {{ en
                ? 'Click the button'
                : 'Haz clic en el botón'
              }} 
              <label class="text-orange-500">HALLOWEEN ME</label>
              {{ en
                ? 'at the top.'
                : ' que se encuentra en la parte superior.'
              }}
            </li>
            <li>
              {{ en
                ? 'Select a photo from your device to generate your themed content.'
                : 'Selecciona una foto de tu dispositivo para generar tu contenido temático.'
              }}
            </li>
            <li>
              {{ en
                ? 'Wait a few seconds while we apply the effects and generate your personalized image.'
                : 'Espera unos segundos mientras aplicamos los efectos y generamos tu imagen personalizada.'
              }}
            </li>
            <li>
              {{ en
                ? 'Your '
                : '¡Tu '
              }} 
              <label class="text-orange-500">HALLOWEEN ME</label> 
              {{ en
                ? 'is ready! You can now publish or regenerate it.'
                : ' está listo! Ahora puedes publicarla o regenerarla.'
              }}
            </li>
            <li>
              {{ en
                ? 'When published, your image will be visible to everyone and they can share it and give it 🎃'
                : 'Al publicar, tu imagen será visible para todo el mundo y podrán compartirla y darle 🎃'
              }}
            </li>
          </ol>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

// Propiedades que recibe el componente
const props = defineProps({
  en: {
    type: Boolean,
    required: true,
  },
});

// Estado para manejar si las preguntas están visibles
const showQuestions = ref(false);

// Función para mostrar u ocultar las preguntas
const toggleQuestions = () => {
  showQuestions.value = !showQuestions.value; // Alterna la visibilidad de las preguntas
};
</script>

<style scoped>
.rotate-fade-enter-active,
.rotate-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease; /* Transición para opacidad y transformación */
}

.rotate-fade-enter, .rotate-fade-leave-to /* .rotate-fade-leave-active en <2.1.8 */ {
  opacity: 0; /* Desvanecer */
}

.rotate-fade-leave {
  opacity: 0; /* Desvanecer durante la salida */
}

/* Estilo para el ícono de la flecha */
.rotate-90 {
  transform: rotate(90deg); /* Rota la flecha 180 grados */
}
</style>

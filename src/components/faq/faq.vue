<template>
    <div class="bg-gradient-to-r from-gray-900 to-black p-4 pb-2 rounded-lg shadow-lg mb-4 relative mt-8 w-full max-w-md">
      <h2 
        class="text-2xl font-bold text-orange-400 mb-4 text-left cursor-pointer flex items-center" 
        @click="toggleQuestions"
      >
        Preguntas Frecuentes
        <span :class="['ml-2 transition-transform', showQuestions ? 'rotate-180' : '']">
          ▼ <!-- Puedes usar un ícono SVG o una imagen aquí -->
        </span>
      </h2>
      
      <!-- Contenedor de preguntas con transiciones -->
      <transition name="rotate-fade" mode="out-in">
        <div v-if="showQuestions" class="space-y-4" key="question-container">
          <div 
            v-for="(question, index) in questions" 
            :key="index" 
            class="p-4 bg-gray-800 rounded-lg shadow-md cursor-pointer" 
            @click="toggleAnswer(index)"
          >
            <h3 class="text-xl font-semibold text-orange-300 hover:underline text-left">
              {{ question.question }}
            </h3>
            <transition name="rotate-fade" mode="out-in">
              <p
                class="text-gray-200 mt-2 text-left"
                v-if="activeQuestion === index" 
                key="answer"
              >
                {{ question.answer }}
              </p>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Estado para manejar la pregunta activa y si las preguntas están visibles
  const activeQuestion = ref(0);
  const showQuestions = ref(false);
  
  // Lista de preguntas y respuestas
  const questions = [
    {
      question: '¿Cómo puedo subir una imagen?',
      answer: 'Para subir una imagen, haz clic en el botón "Subir imagen" y selecciona la imagen desde tu dispositivo.',
    },
    {
      question: '¿Puedo usar mis propias imágenes?',
      answer: 'Sí, puedes usar tus propias imágenes siempre que cumplan con los requisitos de formato y tamaño.',
    },
    {
      question: '¿Cómo comparto la imagen generada?',
      answer: 'Una vez que se genera la imagen, podrás compartirla directamente desde la plataforma o descargarla.',
    },
    {
      question: '¿Hay límites en la cantidad de imágenes que puedo generar?',
      answer: 'No hay un límite establecido, pero recomendamos mantener la calidad y el tamaño manejables.',
    },
  ];
  
  // Función para alternar la respuesta visible
  const toggleAnswer = (index) => {
    activeQuestion.value = activeQuestion.value === index ? null : index; // Alterna entre mostrar y ocultar la respuesta
  };
  
  // Función para mostrar u ocultar las preguntas
  const toggleQuestions = () => {
    showQuestions.value = !showQuestions.value; // Alterna la visibilidad de las preguntas
  };
  </script>
  
  <style scoped>
  .rotate-fade-enter-active, .rotate-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease; /* Transición para opacidad y transformación */
  }
  
  .rotate-fade-enter, .rotate-fade-leave-to /* .rotate-fade-leave-active en <2.1.8 */ {
    opacity: 0; /* Desvanecer */
   }
  
  .rotate-fade-leave {
    opacity: 0; /* Desvanecer durante la salida */
    }
  
  /* Estilo para el ícono de la flecha */
  .rotate-180 {
    transform: rotate(180deg); /* Rota la flecha 180 grados */
  }
  </style>
  
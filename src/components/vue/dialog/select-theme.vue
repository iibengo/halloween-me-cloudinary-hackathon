<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 sm:p-6"
  >
    <div
      class="bg-gray-900 rounded-lg shadow-2xl w-full max-w-lg p-6 md:p-8 sm:w-full sm:mx-4 sm:max-w-sm border border-orange-600 transform transition-transform duration-300 hover:scale-105"
    >
      <h2 class="text-2xl font-extrabold text-orange-500 mb-6 text-center spooky-text">
        🎃 {{ isEnglish ? 'Theme Options' : 'Opciones de tema' }} 🎃
      </h2>

      <!-- Primer select para elegir tema (fondo y texto, solo fondo, solo texto) -->
      <div class="mb-4 spooky-text">
        <label for="select" class="block text-sm font-medium text-purple-300">
          👻 {{ isEnglish ? 'Choose Theme' : 'Elegir el tema' }} 👻
        </label>
        <select
          id="select"
          v-model="formData.selectedTheme"
          class="mt-2 block w-full rounded-md border-purple-600 bg-gray-800 text-orange-400 shadow-md focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
        >
          <option value="fondo-texto">{{ isEnglish ? 'Background and Text' : 'Fondo y texto' }}</option>
          <option value="solo-fondo">{{ isEnglish ? 'Only Background' : 'Solo fondo' }}</option>
          <option value="solo-texto">{{ isEnglish ? 'Only Text' : 'Solo texto' }}</option>
        </select>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="submitForm">
        <!-- Mostrar los inputs de texto si se selecciona "fondo-texto" o "solo-texto" -->
        <div v-if="formData.selectedTheme === 'fondo-texto' || formData.selectedTheme === 'solo-texto'">
          <!-- Campo para Texto Superior -->
          <div class="mb-4">
            <label for="input1" class="block text-sm font-medium text-purple-300">
              🕸 {{ isEnglish ? 'Top Text' : 'Texto Superior' }}
            </label>
            <input
              type="text"
              id="input1"
              v-model="formData.input1"
              class="mt-2 block w-full rounded-md border-purple-600 bg-gray-800 text-orange-400 shadow-md focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
            <p v-if="!formData.input1" class="text-xs text-purple-500 mt-1">
              ⚠️ {{ isEnglish ? 'If the field is empty, a random text will be used.' : 'Si el campo está vacío, se usará un texto aleatorio.' }}
            </p>
          </div>

          <!-- Campo para Texto Inferior -->
          <div class="mb-4">
            <label for="input2" class="block text-sm font-medium text-purple-300">
              🕷 {{ isEnglish ? 'Bottom Text' : 'Texto Inferior' }}
            </label>
            <input
              type="text"
              id="input2"
              v-model="formData.input2"
              class="mt-2 block w-full rounded-md border-purple-600 bg-gray-800 text-orange-400 shadow-md focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
            <p v-if="!formData.input2" class="text-xs text-purple-500 mt-1">
              ⚠️ {{ isEnglish ? 'If the field is empty, a random text will be used.' : 'Si el campo está vacío, se usará un texto aleatorio.' }}
            </p>
          </div>
        </div>

        <!-- Mostrar el select de fondo si se selecciona "fondo-texto" o "solo-fondo" -->
        <div v-if="formData.selectedTheme === 'fondo-texto' || formData.selectedTheme === 'solo-fondo'">
          <!-- Segundo select para elegir fondo -->
          <div class="mb-4">
            <label for="backgroundSelect" class="block text-sm font-medium text-purple-300">
              🧟‍♂️ {{ isEnglish ? 'Choose Background' : 'Elegir fondo' }}
            </label>
            <select
              id="backgroundSelect"
              v-model="formData.selectedBackground"
              class="mt-2 block w-full rounded-md border-purple-600 bg-gray-800 text-orange-400 shadow-md focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="fantasmas">{{ isEnglish ? 'Ghosts' : 'Fantasmas' }}</option>
              <option value="zombies">{{ isEnglish ? 'Zombies' : 'Zombies' }}</option>
              <option value="brujas">{{ isEnglish ? 'Witches' : 'Brujas' }}</option>
              <option value="personalizado">{{ isEnglish ? 'Custom' : 'Personalizado' }}</option>
            </select>
          </div>

          <!-- Mostrar campo de texto para fondo personalizado si se selecciona "Personalizado" -->
          <div v-if="formData.selectedBackground === 'personalizado'" class="mb-4">
            <label for="customBackground" class="block text-sm font-medium text-purple-300">
              🎨 {{ isEnglish ? 'Custom Background' : 'Fondo Personalizado' }}
            </label>
            <input
              type="text"
              id="customBackground"
              v-model="formData.customBackground"
              :placeholder=" isEnglish ? 'Write your custom background ex:scary ghosts' : 'Escribe tu fondo personalizado ej: scary ghosts' "
              class="mt-2 block w-full rounded-md border-purple-600 bg-gray-800 text-orange-400 shadow-md focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Botones para cancelar y guardar -->
        <div class="flex justify-end space-x-4 mt-6 spooky-text">
          <button
            type="button"
            @click="closeModal"
            class="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md border border-purple-600"
          >
            ❌ {{ isEnglish ? 'Cancel' : 'Cancelar' }}
          </button>
          <button
            type="submit"
            class="py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md border border-purple-600"
          >
            🔁 {{ isEnglish ? 'Regenerate' : 'Regenerar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Props
const props = defineProps({
  isModalOpen: Boolean,
  isEnglish: {  // Prop para determinar el idioma
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeModal", "submitForm"]);

// Definir la interfaz para los datos del formulario
interface FormData {
  input1: string;
  input2: string;
  selectedTheme: string;
  selectedBackground: string;
  customBackground: string;
}

// Variables reactivas
const formData = ref<FormData>({
  input1: "",
  input2: "",
  selectedTheme: "fondo-texto", // Valor por defecto
  selectedBackground: "fantasmas",
  customBackground: "",
});

// Cerrar modal
const closeModal = () => {
  emit("closeModal");
};

// Enviar formulario
const submitForm = () => {
  // Validar fondo personalizado
  if (formData.value.selectedBackground === "personalizado" && !formData.value.customBackground) {
    alert(props.isEnglish ? "Please enter a custom background" : "Por favor, escribe un fondo personalizado");
    return;
  }
  emit("submitForm", formData.value); // Emitir los datos del formulario al padre
  closeModal();
};
</script>

<style scoped>
.spooky-text {
  text-shadow: 2px 2px 8px rgba(255, 165, 0, 0.8), 0 0 10px rgba(255, 99, 71, 0.9);
}
</style>

<template>
  <header class="md:max-w-3xl mx-auto py-4 pb-1 pt-8">
    <nav class="container mx-auto">
      <ul
        class="flex flex-wrap justify-center gap-2 md:grid md:grid-cols-3 md:gap-4 text-center"
      >
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="group"
          @click="navigate(item.navigate)"
        >
          <a
            href="#"
            class="flex hover:text-white items-center justify-center block p-2 md:p-4 bg-gray-800 rounded-lg text-orange-500 font-bold text-lg transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <div class="flex items-center">
              <span v-if="item.img">🎃</span>
              <i
                v-else
                :class="item.icon"
                class="mr-2 text-base md:text-xl"
              ></i>
              <span class="leading-tight">{{ item.name }}</span>
            </div>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  isEnglish: {
    type: Boolean,
    required: true,
  },
});

// Lista de elementos del menú
const menuItems = ref([
  {
    name: "",
    icon: "fa-solid fa-pumpkin",
    navigate: "/",
    img: "assets/icon/pumpkin.svg",
  },
  { name: "", icon: "fa-solid fa-images", navigate: "/explore" },
  { name: "", icon: "fa fa-user-circle", navigate: "/profile" },
  // Puedes agregar más opciones aquí
]);

const navigate = (link: string) => {
  const prefix = props.isEnglish ? "" : "/es";
  window.location.href = `${prefix}${link}`;
};
</script>

<style scoped>
/* Transiciones y efectos en hover */
.group:hover a {
  transform: translateY(-3px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}
</style>

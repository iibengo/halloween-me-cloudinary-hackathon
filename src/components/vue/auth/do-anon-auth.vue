
<template>

    <span class="hidden"></span>
     </template>
   
     <script lang="ts" setup>
     import { ref, onMounted } from 'vue';
     
     // Definición de los estados
     const user = ref(null);
     const loading = ref(true);
     
     // Función para iniciar sesión anónimamente
     const loginAnonymously = async () => {
       try {
         const response = await fetch('/api/loginAnonymous', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
         });
     
         if (!response.ok) {
           throw new Error('Error al iniciar sesión anónimamente');
         }
     
         const data = await response.json();
      
         user.value = data.user; // Suponiendo que tu backend devuelve el usuario autenticado
       } catch (error) {
         console.error("Error al iniciar sesión anónimamente:", error);
       } finally {
         loading.value = false;
       }
     };
     
     // Efecto para verificar el estado de autenticación al cargar
     onMounted(async () => {
       const cookies = document.cookie.split('; ');
       const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));

       if (!sessionCookie) {
         await loginAnonymously();
       } else {
         // Aquí puedes verificar la cookie si es necesario
         loading.value = false;
       }
     });
     
     // Función para cerrar sesión (opcional)
     const handleLogout = async () => {
       const response = await fetch('/api/logout', {
         method: 'POST',
       });
     
       if (response.ok) {
         user.value = null; // Restablecer el usuario
       }
     };
     </script>
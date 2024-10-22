// src/api/linkWithCredentials.ts
// Asegúrate de tener la configuración de Firebase
import { app } from '@/firebase';
import type { APIRoute } from 'astro';
import { getAuth, EmailAuthProvider, linkWithCredential } from "firebase/auth";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();
  const authInstance = getAuth(app); // Obtén la instancia de autenticación

  // Verifica si hay un usuario autenticado de forma anónima
  const user = authInstance.currentUser;
  if (!user) {
    return new Response(JSON.stringify({ message: "No hay usuario anónimo para vincular." }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Crea las credenciales con el correo y la contraseña
  const credential = EmailAuthProvider.credential(email, password);

  try {
    // Vincula la cuenta anónima con las credenciales
    await linkWithCredential(user, credential);
    return new Response(JSON.stringify({ message: "Cuenta vinculada con éxito." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error:any) {
    console.error("Error al vincular la cuenta:", error);
    return new Response(JSON.stringify({ message: "Error al vincular la cuenta: " + error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
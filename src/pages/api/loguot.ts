// src/pages/api/logout.ts
import { auth } from '../../firebase'; // Importa tu configuración de Firebase
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("llega")
    // Crear una respuesta para eliminar la cookie de sesión
    return new Response(JSON.stringify({ message: "Cierre de sesión exitoso." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=; HttpOnly; Path=/; Max-Age=0`, // Eliminar la cookie
      },
    });
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error);
    return new Response(JSON.stringify({ message: "Error al cerrar sesión: " + error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

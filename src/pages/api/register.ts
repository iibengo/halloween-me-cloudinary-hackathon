// src/pages/api/register.ts
import { auth } from '../../firebase';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  try {
    // Crear un nuevo usuario
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Enviar correo de verificación (solo si es necesario)
    // await auth.generateEmailVerificationLink(email); // Puedes usar esto si decides enviar el enlace manualmente

    return new Response(JSON.stringify({ message: "Usuario registrado con éxito." }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error:any) {
    console.error("Error al registrar el usuario:", error);
    return new Response(JSON.stringify({ message: "Error al registrar el usuario: " + error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

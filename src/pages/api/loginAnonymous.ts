// src/pages/api/loginAnonymous.ts
import { getAuth, signInAnonymously } from 'firebase/auth';
import type { APIRoute } from 'astro';
import { auth } from '../../firebase'; // Asegúrate de importar tu configuración de Firebase

export const POST: APIRoute = async ({ request }) => {
  try {
 
    // Iniciar sesión anónimamente
    const userCredential = await signInAnonymously(getAuth());

    // Aquí puedes obtener el ID token si lo necesitas
    const idToken = await userCredential.user.getIdToken();

    // Si deseas establecer una cookie de sesión, puedes hacerlo aquí
     const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

    return new Response(JSON.stringify({
      message: "Inicio de sesión anónimo exitoso.",
      user: userCredential.user, // Puedes devolver más información del usuario si lo necesitas
      idToken // Devuelve el token si lo necesitas
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${sessionCookie}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 5}`, // Ajusta según tus necesidades
      },
    });
  } catch (error: any) {
    console.error("Error al iniciar sesión anónimamente:", error);
    return new Response(JSON.stringify({ message: "Error al iniciar sesión anónimamente: " + error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
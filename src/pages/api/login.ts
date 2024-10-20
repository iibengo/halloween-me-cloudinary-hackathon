import { auth } from '../../firebase'; // Asegúrate de tener la configuración correcta
import type { APIRoute } from 'astro';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    const idToken = await userCredential.user.getIdToken();

    // Crear la cookie de sesión
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 }); // 5 días

    return new Response(JSON.stringify({ message: "Inicio de sesión exitoso." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${sessionCookie}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 5}`, // Ajusta según tus necesidades
      },
    });
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error);
    return new Response(JSON.stringify({ message: "Error al iniciar sesión: " + error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
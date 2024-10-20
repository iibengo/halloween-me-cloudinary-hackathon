import { app } from '@/firebase';
import type { APIRoute } from 'astro';
import { getAuth, EmailAuthProvider, linkWithCredential } from "firebase/auth";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();
  const authInstance = getAuth(app); 
  const user = authInstance.currentUser;
  if (!user) {
    return new Response(JSON.stringify({ message: "No hay usuario anónimo para vincular." }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const credential = EmailAuthProvider.credential(email, password);
  try {
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
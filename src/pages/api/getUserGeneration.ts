import { firebaseDb } from '@/firebase';
import type { APIRoute } from 'astro';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

interface HackathonGeneration {
  original: boolean;
  cloudinaryId: string;
  cloudinaryUrl: string;
}
export const POST: APIRoute = async ({ request }) => {
  const { userId } = await request.json();
  try {
    const q = query(
      collection(firebaseDb, "hackathonGenerations"),
      where("original", "==", false),
      where("userId", "==", userId),
      orderBy('createdAt', 'desc'),
    );

    // Ejecutamos la consulta
    const querySnapshot = await getDocs(q);

    // Procesamos los documentos y filtramos por imgId único
    const data = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as HackathonGeneration) }))
      .filter(
        (doc, index, self) =>
          self.findIndex((d) => d.cloudinaryId === doc.cloudinaryId) === index
      );

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
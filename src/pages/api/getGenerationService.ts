import type { APIRoute } from "astro";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase-service";

// Definir una interfaz para los documentos que esperas de Firestore
interface HackathonGeneration {
  original: boolean;
  cloudinaryId: string;
  cloudinaryUrl: string;
  imgId: string;
}
interface ResponseData {
  original: boolean;
  cloudinaryId: string;
  cloudinaryUrl: string;
}
export const POST: APIRoute = async ({ request }) => {
  
  try {
    const {  cloudinaryId } = await request.json();
    const q = query(
      collection(firebaseDb, "hackathonGenerations"),
      where("original", "==", false),
      where("cloudinaryId", "==", cloudinaryId),
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Aquí tienes el ID del documento
      ...(doc.data() as HackathonGeneration),
    }));

   

    return new Response(
      JSON.stringify({ success: true, data: data }), // Regresar solo los datos filtrados
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error recuperando la generación de imagen:", error);
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

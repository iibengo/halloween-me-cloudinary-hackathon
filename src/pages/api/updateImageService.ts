import type { APIRoute } from 'astro';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase-service";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { id, ...updateData } = body; // Desestructuramos id del resto de los datos

    try {
        const docRef = doc(firebaseDb, 'hackathonGenerations', id); // Referencia al documento por ID
        await updateDoc(docRef, {
            ...updateData,
            updatedAt: serverTimestamp() // Agregar un campo de timestamp para la actualización
        });
        return new Response(
            JSON.stringify({ success: true}),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error: any) {
        console.error('Error añadiendo documento: ', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};

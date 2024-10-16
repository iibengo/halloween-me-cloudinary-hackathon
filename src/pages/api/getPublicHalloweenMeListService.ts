import type { APIRoute } from 'astro';
import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase-service";

// Definir una interfaz para los documentos que esperas de Firestore
interface HackathonGeneration {
    original: boolean;
    cloudinaryId: string;
    cloudinaryUrl: string;
}

export const GET: APIRoute = async () => {
    const startTime = Date.now(); // Registrar tiempo de inicio

    try {
        const q = query(
            collection(firebaseDb, 'hackathonGenerations'),
            where('original', '==', false)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as HackathonGeneration) }))
            .filter((doc, index, self) => 
                self.findIndex(d => d.cloudinaryId === doc.cloudinaryId) === index
            );
        return new Response(
            JSON.stringify({ success: true, data }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error: any) {
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

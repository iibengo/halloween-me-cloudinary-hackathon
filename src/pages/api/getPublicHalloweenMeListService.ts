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
    try {
        // Construimos la consulta para obtener los documentos con original = false
        const q = query(
            collection(firebaseDb, 'hackathonGenerations'),
            where('original', '==', false)
        );

        // Ejecutamos la consulta
        const querySnapshot = await getDocs(q);

        // Procesamos los documentos y filtramos por imgId único
        const data = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as HackathonGeneration) })) // Tipamos los datos
            .filter((doc, index, self) => 
                self.findIndex(d => d.cloudinaryId === doc.cloudinaryId) === index // Filtra duplicados de imgId
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
        console.error('Error recuperando documentos: ', error);
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

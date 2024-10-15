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
    console.log("Iniciando la consulta a Firestore...");
    const startTime = Date.now(); // Registrar tiempo de inicio

    try {
        const q = query(
            collection(firebaseDb, 'hackathonGenerations'),
            where('original', '==', false)
        );

        console.log("Consulta preparada:", q);

        // Ejecutamos la consulta
        const querySnapshot = await getDocs(q);
        console.log("Consulta ejecutada. Documentos recuperados:", querySnapshot.size);

        // Procesamos los documentos y filtramos por imgId único
        const data = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as HackathonGeneration) }))
            .filter((doc, index, self) => 
                self.findIndex(d => d.cloudinaryId === doc.cloudinaryId) === index
            );

        const endTime = Date.now(); // Registrar tiempo de finalización
        console.log(`Consulta completada en ${endTime - startTime} ms`);
        
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
        console.error('Error recuperando documentos:', error);
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

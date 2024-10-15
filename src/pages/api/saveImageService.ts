import type { APIRoute } from 'astro';
import { collection, addDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase-service";

export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({ message: "GET request handled!" }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    try {
        const docRef = await addDoc(collection(firebaseDb, 'hackathonGenerations'), body);
        return new Response(
            JSON.stringify({ success: true, id: docRef.id }),
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

import { initializeApp, FirebaseApp } from "firebase/app";
import {
    Firestore,
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    Unsubscribe,
    QuerySnapshot
} from "firebase/firestore";
import {firebaseConfig} from "@/configs/fireBase.ts";
import {ITrain} from "@/models/Train.model.ts";

export class FirebaseService {
    private static instance: FirebaseService;
    private app: FirebaseApp;
    private firestore: Firestore;

    private constructor() {

        this.app = initializeApp(firebaseConfig);
        this.firestore = getFirestore(this.app);
    }

    public static getInstance(): FirebaseService {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();
        }
        return FirebaseService.instance;
    }

    async getTrains(): Promise<QuerySnapshot> {
        return getDocs(collection(this.firestore, 'trains'));
    }

    subscribeToTrainsUpdates(callback: (snapshot: QuerySnapshot) => void): Unsubscribe {
        return onSnapshot(collection(this.firestore, 'trains'), callback);
    }

    convertFirebaseTrain(doc: any): ITrain {
        const data = doc.data();
        return {
            id: doc.id,
            date: data.date,
            status: data.status,
            type: data.type,
            stationList: data.stationList,
            payedBy: data.payedBy,
            updatedAt: data.updatedAt?.toDate(),
        };
    }
}
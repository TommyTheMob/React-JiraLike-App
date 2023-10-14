import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6h5b9bc7K_QY4vWMcZHtjthItLxahyuU",
    authDomain: "jiralike-app.firebaseapp.com",
    projectId: "jiralike-app",
    storageBucket: "jiralike-app.appspot.com",
    messagingSenderId: "2743502969",
    appId: "1:2743502969:web:22c3bc0ac99c81b3d6aca8",
    measurementId: "G-RLC83JY0PE"
};

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyD9bmVEenZdzVG7cojj13lFN8bfhzPT0tk',
    authDomain: 'my-todos-637fe.firebaseapp.com',
    projectId: 'my-todos-637fe',
    storageBucket: 'my-todos-637fe.appspot.com',
    messagingSenderId: '739430155161',
    appId: '1:739430155161:web:ad2ef2d0059e45e3f4c908',
    databaseURL: 'https://my-todos-637fe-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

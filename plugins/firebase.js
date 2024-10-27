// ~/plugins/firebase.js
import { defineNuxtPlugin } from '#app'; // Import defineNuxtPlugin from Nuxt
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe3SnE7A5DH_d5dBUVw1nKxHOdLlDSrbg",
  authDomain: "ziancuk-ddab7.firebaseapp.com",
  projectId: "ziancuk-ddab7",
  storageBucket: "ziancuk-ddab7.appspot.com",
  messagingSenderId: "240011348984",
  appId: "1:240011348984:web:3ebb67b2dfe9641ceee40d",
  measurementId: "G-YF07GT0NW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define and export the Nuxt plugin
export default defineNuxtPlugin((nuxtApp) => {
  // Make db available globally
  nuxtApp.provide('db', db); // Now you can access db in your components using this.$db
});

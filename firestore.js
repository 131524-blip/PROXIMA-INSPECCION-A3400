import {
  initializeApp,
  getApps
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWY3ovQFTg7ZjrHxVL8oxQxSoqgOyuYFM",
  authDomain: "proxima-inspeccion-a3400.firebaseapp.com",
  projectId: "proxima-inspeccion-a3400",
  storageBucket: "proxima-inspeccion-a3400.firebasestorage.app",
  messagingSenderId: "761631963435",
  appId: "1:761631963435:web:ee950b3ce1f009f44e2d6e"
};

const app =
  getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

const db = getFirestore(app);

window.guardarFirestore = async function(vehiculo){

  try{

    await addDoc(
      collection(db,"vehiculos"),
      vehiculo
    );

    console.log(
      "Vehículo guardado en Firestore"
    );

  }catch(error){

    console.error(error);

  }

};

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  getFirestore
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWY3ovQFTg7ZjrHxVL8oxQxSoqgOyuYFM",
  authDomain: "proxima-inspeccion-a3400.firebaseapp.com",
  projectId: "proxima-inspeccion-a3400",
  storageBucket: "proxima-inspeccion-a3400.firebasestorage.app",
  messagingSenderId: "761631963435",
  appId: "1:761631963435:web:ee950b3ce1f009f44e2d6e",
  measurementId: "G-BC2PVKC4MW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.db = db;
window.auth = auth;

document.getElementById("btnLogin")
.addEventListener("click", async () => {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  } catch (error) {

    alert("Correo o contraseña incorrectos");

  }

});

onAuthStateChanged(auth, (user) => {

  if (user) {

    document.getElementById(
      "loginBox"
    ).style.display = "none";

    document.getElementById(
      "app"
    ).style.display = "block";
    setTimeout(() => {

  if(typeof revisarAlertas === "function"){
    revisarAlertas();
  }

}, 1000);

  } else {

    document.getElementById(
      "loginBox"
    ).style.display = "block";

    document.getElementById(
      "app"
    ).style.display = "none";

  }

});

window.cerrarSesion = async () => {

  await signOut(auth);

};

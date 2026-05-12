import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBioqM7NYa4FDvQ3zUISGt_YS_b-TThUNk",
    authDomain: "db-ai-b73e5.firebaseapp.com",
    projectId: "db-ai-b73e5",
    storageBucket: "db-ai-b73e5.firebasestorage.app",
    messagingSenderId: "617783948329",
    appId: "1:617783948329:web:18d9942e8c3b73858dd838",
    measurementId: "G-ZZGV797JYQ"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// REGISTER
window.register = function(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth,email,password)
  .then(()=>alert("Berhasil daftar"))
  .catch(err=>alert(err.message));
}

// LOGIN EMAIL
window.login = function(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth,email,password)
  .then(()=>window.location.href="dashboard.html")
  .catch(err=>alert(err.message));
}

// LOGIN GOOGLE
window.loginGoogle = function(){
  signInWithPopup(auth, provider)
  .then(()=>window.location.href="dashboard.html")
  .catch(err=>alert(err.message));
}

// LOGOUT
window.logout = function(){
  signOut(auth).then(()=>window.location.href="index.html");
}

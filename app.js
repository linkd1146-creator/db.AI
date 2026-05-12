import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

window.register = function(){
  const email = email.value;
  const password = password.value;
  createUserWithEmailAndPassword(auth,email,password)
  .then(()=>alert("Berhasil daftar"))
  .catch(err=>alert(err.message));
}

window.login = function(){
  signInWithEmailAndPassword(auth,email.value,password.value)
  .then(()=>window.location.href="dashboard.html")
  .catch(err=>alert(err.message));
}

window.logout = function(){
  signOut(auth).then(()=>window.location.href="index.html");
}

window.sendMessage = async function(){
  const msg = document.getElementById("message").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += "<p><b>Kamu:</b> "+msg+"</p>";

  const response = await fetch("/api/ai",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:msg})
  });

  const data = await response.json();
  chat.innerHTML += "<p><b>DB AI:</b> "+data.reply+"</p>";
}

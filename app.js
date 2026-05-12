import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_DOMAIN",
  projectId: "ISI_PROJECT_ID",
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

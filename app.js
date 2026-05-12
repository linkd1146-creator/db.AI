import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const db = getFirestore(app);

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

let currentUser = null;
let memory = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("chatSection").style.display = "block";
  } else {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("chatSection").style.display = "none";
  }
});

async function loadChat() {
  const q = query(collection(db, "chats"), where("uid", "==", currentUser.uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    addMessage(data.role, data.text);
  });
}

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = role;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  speak(""); // stop speaking

  await addDoc(collection(db, "chats"), {
    uid: currentUser.uid,
    role: "user",
    text: text
  });

  input.value = "";

  showTyping();

  setTimeout(async () => {
    const response = smartAI(text);
    removeTyping();
    addMessage("ai", response);
    speak(response);

    await addDoc(collection(db, "chats"), {
      uid: currentUser.uid,
      role: "ai",
      text: response
    });

  }, 1000);
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "ai";
  div.id = "typing";
  div.innerText = "AI sedang mengetik...";
  chatBox.appendChild(div);
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

function smartAI(text) {
  text = text.toLowerCase();

  if (text.includes("halo"))
    return "Halo 👋 Senang berbicara dengan kamu.";

  if (text.includes("siapa kamu"))
    return "Saya DB AI Level 5. Saya bisa bicara dan mendengar kamu.";

  if (text.includes("firebase"))
    return "Firebase adalah backend dari Google untuk database dan authentication.";

  return "Saya memahami yang kamu katakan. Bisa jelaskan lebih detail?";
}

/* 🔊 TEXT TO SPEECH */
function speak(text) {
  if (!text) {
    window.speechSynthesis.cancel();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  speechSynthesis.speak(utterance);
}

/* 🎤 SPEECH TO TEXT */
window.startListening = function () {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "id-ID";
  recognition.start();

  recognition.onresult = function (event) {
    input.value = event.results[0][0].transcript;
    sendMessage();
  };
};

window.logout = function () {
  signOut(auth);
};

/* ENTER AUTO SEND */
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

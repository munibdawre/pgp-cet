import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.register = async () => {
  const name = nameInput();
  const email = emailInput();
  const password = passwordInput();
  const confirm = confirmInput();
  const msg = document.getElementById("msg");

  if (password !== confirm) {
    msg.innerText = "Passwords do not match";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      role: "user",
      createdAt: new Date()
    });
    window.location.href = "dashboard.html";
  } catch (e) {
    msg.innerText = e.message;
  }
};

function nameInput(){return document.getElementById("name").value;}
function emailInput(){return document.getElementById("email").value;}
function passwordInput(){return document.getElementById("password").value;}
function confirmInput(){return document.getElementById("confirm").value;}

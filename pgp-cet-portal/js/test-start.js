import { db, auth } from "./firebase.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.startTest = async () => {
  const attempt = await addDoc(collection(db, "testAttempts"), {
    userId: auth.currentUser.uid,
    startTime: new Date(),
    duration: 90,
    answers: {},
    marked: {},
    completed: false
  });

  sessionStorage.setItem("attemptId", attempt.id);
  location.href = "test.html";
};

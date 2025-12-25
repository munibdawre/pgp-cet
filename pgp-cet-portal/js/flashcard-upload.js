import { db } from "./firebase.js";
import { addDoc, collection }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.uploadFlashcard=async()=>{
  await addDoc(collection(db,"flashcards"),{
    subject:subject.value,
    front:front.value,
    back:back.value,
    createdAt:new Date()
  });
  alert("Flashcard added");
};

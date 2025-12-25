import { db } from "./firebase.js";
import { collection, getDocs, query, where }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let cards=[],i=0,flip=false;

window.loadFlashcards=async()=>{
  const s=subject.value;
  const q=query(collection(db,"questions"),where("subject","==",s));
  const snap=await getDocs(q);
  cards=snap.docs.map(d=>d.data());
  i=0;flip=false;render();
};

function render(){
  if(!cards.length)return;
  const c=cards[i];
  cardText.innerHTML=flip?
    `${c.correct}. ${c.options[c.correct]}<br>${c.explanation||""}`:
    c.question;
}
window.flipCard=()=>{flip=!flip;render();};
window.next=()=>{if(i<cards.length-1)i++;flip=false;render();};
window.prev=()=>{if(i>0)i--;flip=false;render();};

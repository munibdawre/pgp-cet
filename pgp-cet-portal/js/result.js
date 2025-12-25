import { db } from "./firebase.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const attemptId=sessionStorage.getItem("attemptId");
let score=0;

(async()=>{
  const a=await getDoc(doc(db,"testAttempts",attemptId));
  for(const qid in a.data().answers){
    const q=await getDoc(doc(db,"questions",qid));
    const ok=q.data().correct===a.data().answers[qid];
    if(ok)score++;
    resultList.innerHTML+=`
      <div class="result-card">
        ${q.data().question}<br>
        ${ok?'<span class="correct">✔ Correct</span>':
        `<span class="wrong">✘ Wrong</span><br>
         Correct: ${q.data().options[q.data().correct]}`}
      </div>`;
  }
  scoreEl.innerText=`Score: ${score}/100`;
})();

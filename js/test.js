import { db } from "./firebase.js";
import { collection, getDocs, query, where, doc, updateDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const BLUEPRINT = {
  Anatomy:4, Physiology:4, Biochemistry:2,
  "Fundamentals of Exercise Therapy":5,
  "Fundamentals of Electro Therapy":5,
  Pharmacology:2, "Pathology & Microbiology":4,
  Psychology:1, Psychiatry:1, "Electrical Agents":7,
  "Kinesio Therapeutics":7, "General Surgery & Orthopedics":6,
  Medicine:6, OBGY:3,
  "Physical Diagnosis & Manipulative Skills":8,
  "Physiotherapy in Musculoskeletal Condition":10,
  "Physiotherapy in Neurosciences":10,
  "Physiotherapy in General Medical & Gen. Surgical Condition":10,
  "Physiotherapy in Community Health":5
};

let questions=[], index=0, answers={}, marked={}, time=5400;
const attemptId=sessionStorage.getItem("attemptId");

async function load() {
  for (const s in BLUEPRINT) {
    const q=query(collection(db,"questions"),where("subject","==",s));
    const snap=await getDocs(q);
    questions.push(...snap.docs.map(d=>({id:d.id,...d.data()})).slice(0,BLUEPRINT[s]));
  }
  shuffle(questions); render();
}
load();

function render() {
  const q=questions[index];
  question.innerHTML=`Q${index+1}. ${q.question}`;
  options.innerHTML=["A","B","C","D"].map(o=>`
    <label><input type="radio" name="opt"
    ${answers[q.id]===o?"checked":""}
    onclick="save('${q.id}','${o}')">${q.options[o]}</label>`).join("");
  renderStatus();
}

window.save=(id,o)=>{answers[id]=o;marked[id]=false;renderStatus();};
window.markForLater=()=>{marked[questions[index].id]=true;renderStatus();};
window.next=()=>{if(index<99)index++;render();};
window.prev=()=>{if(index>0)index--;render();};

function renderStatus(){
  statusPanel.innerHTML=questions.map((q,i)=>{
    let cls=answers[q.id]?"status-answered":marked[q.id]?"status-marked":"";
    return `<span class="${cls}" onclick="jump(${i})">${i+1}</span>`;
  }).join("");
}
window.jump=i=>{index=i;render();};

setInterval(()=>{
  time--; timer.innerText=`${Math.floor(time/60)}:${(time%60).toString().padStart(2,"0")}`;
  if(time<=0)submitTest();
},1000);

window.submitTest=async()=>{
  await updateDoc(doc(db,"testAttempts",attemptId),{answers,marked,completed:true});
  location.href="result.html";
};

function shuffle(a){a.sort(()=>Math.random()-0.5);}

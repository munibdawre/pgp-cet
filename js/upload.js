import { db } from "./firebase.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.uploadCSV = async () => {
  const file = document.getElementById("csvFile").files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.innerText = "Select a CSV file";
    return;
  }

  const reader = new FileReader();
  reader.onload = async e => {
    const rows = e.target.result.split("\n");
    let ok = 0, fail = 0;

    for (let i = 1; i < rows.length; i++) {
      const c = rows[i].split(",");
      if (c.length < 7) { fail++; continue; }

      try {
        await addDoc(collection(db, "questions"), {
          subject: c[0].trim(),
          question: c[1].trim(),
          options: { A:c[2], B:c[3], C:c[4], D:c[5] },
          correct: c[6].trim().toUpperCase(),
          marks: 1
        });
        ok++;
      } catch {
        fail++;
      }
    }

    status.innerHTML = `✅ ${ok} uploaded<br>❌ ${fail} failed`;
  };
  reader.readAsText(file);
};

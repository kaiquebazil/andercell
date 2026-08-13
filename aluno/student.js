import { auth, db, firebaseIsConfigured } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const loginUrl = "login.html";
const escapeHtml = value => String(value || "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;","\"":"&quot;"}[char]));
const emptyCard = (message, action = "") => `<div class="empty-card"><strong>${message}</strong>${action}</div>`;
const resourceCard = (item, type = "material") => `<article class="resource-card ${type}"><div class="resource-icon">${type === "ebook" ? "▤" : "↓"}</div><div><span>${escapeHtml(item.label || "Material do curso")}</span><h3>${escapeHtml(item.title || "Arquivo disponível")}</h3><p>${escapeHtml(item.description || "Acesse ou baixe este material.")}</p></div><a href="${encodeURI(item.url || "#")}" target="_blank" rel="noopener noreferrer">Abrir <b>→</b></a></article>`;

if (!firebaseIsConfigured) {
  document.querySelector(".student-dashboard").innerHTML = emptyCard("A central ainda está sendo configurada.", "<p>Assim que a configuração for concluída, seus materiais aparecerão aqui.</p>");
} else {
  onAuthStateChanged(auth, async user => {
    if (!user) { window.location.replace(loginUrl); return; }
    document.querySelector("#student-name").textContent = user.displayName || user.email;
    document.querySelector("#student-first-name").textContent = (user.displayName || user.email.split("@")[0]).split(" ")[0];
    try {
      const [courseDoc, certificateDoc] = await Promise.all([
        getDoc(doc(db, "studentPortal", "courseContent")),
        getDoc(doc(db, "studentCertificates", user.uid))
      ]);
      const course = courseDoc.exists() ? courseDoc.data() : {};
      const lessons = Array.isArray(course.lessonMaterials) ? course.lessonMaterials : [];
      document.querySelector("#lesson-count").textContent = lessons.length ? `${lessons.length} materiais` : "";
      document.querySelector("#lesson-resources").innerHTML = lessons.length ? lessons.map(item => resourceCard(item)).join("") : emptyCard("Os materiais serão liberados em breve.");
      document.querySelector("#ebook-resource").innerHTML = course.ebook?.url ? resourceCard(course.ebook, "ebook") : emptyCard("O e-book será liberado em breve.");
      const certificate = certificateDoc.exists() ? certificateDoc.data() : null;
      document.querySelector("#certificate-resource").innerHTML = certificate?.url ? `<div><p class="eyebrow">Certificado disponível</p><h3>${escapeHtml(certificate.title || "Certificado de conclusão")}</h3><p>Seu certificado está pronto para visualização e download.</p></div><a class="portal-button" href="${encodeURI(certificate.url)}" target="_blank" rel="noopener noreferrer">Abrir certificado <span>→</span></a>` : emptyCard("Seu certificado ainda não foi liberado.", "<p>Ele ficará disponível aqui após a conclusão do curso.</p>");
    } catch (error) {
      document.querySelector("#lesson-resources").innerHTML = emptyCard("Não foi possível carregar os materiais agora.");
      document.querySelector("#ebook-resource").innerHTML = emptyCard("Não foi possível carregar o e-book agora.");
      document.querySelector("#certificate-resource").innerHTML = emptyCard("Não foi possível verificar o certificado agora.");
    }
  });
  document.querySelector("#logout-button").addEventListener("click", async () => { await signOut(auth); window.location.replace(loginUrl); });
}

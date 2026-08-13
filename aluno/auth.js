import { auth, firebaseIsConfigured } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const form = document.querySelector("#login-form");
const feedback = document.querySelector("#form-feedback");
const submitButton = form.querySelector("button[type='submit']");
const password = document.querySelector("#password");

document.querySelector("#toggle-password").addEventListener("click", () => {
  const reveal = password.type === "password";
  password.type = reveal ? "text" : "password";
  document.querySelector("#toggle-password").setAttribute("aria-label", reveal ? "Ocultar senha" : "Mostrar senha");
});

if (!firebaseIsConfigured) {
  feedback.textContent = "A central ainda está sendo configurada. Tente novamente em breve.";
  form.querySelectorAll("input, button").forEach(element => element.disabled = true);
} else {
  onAuthStateChanged(auth, user => { if (user) window.location.replace("index.html"); });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Entrando...";
    try {
      await signInWithEmailAndPassword(auth, form.email.value.trim(), form.password.value);
      window.location.replace("index.html");
    } catch (error) {
      const knownErrors = ["auth/invalid-credential", "auth/user-not-found", "auth/wrong-password", "auth/invalid-email"];
      feedback.textContent = knownErrors.includes(error.code) ? "E-mail ou senha inválidos. Confira suas credenciais." : "Não foi possível entrar agora. Tente novamente.";
      submitButton.disabled = false;
      submitButton.innerHTML = "Entrar na central <span>→</span>";
    }
  });
}

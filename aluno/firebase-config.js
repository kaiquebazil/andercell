/* Cole aqui a configuração do seu projeto Firebase. */
export const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "COLE_SEU_MESSAGING_SENDER_ID",
  appId: "COLE_SEU_APP_ID"
};

export const firebaseIsConfigured = !Object.values(firebaseConfig).some(value =>
  typeof value === "string" && (value.includes("COLE_") || value.includes("SEU_PROJETO"))
);

const courseConfig = {
  companyName: "Andercell",
  courseName: "Curso de Iniciação à Manutenção de Celulares",
  location: "Rua Alberto Sampaio, nº 40 — Santa Rita, Nova Iguaçu/RJ",
  totalHours: 40,
  intensiveDays: 5,
  dailyHours: 8,
  startTime: "09:00",
  endTime: "18:00",
  maxStudents: 2,
  cashPrice: "R$ 1.000,00",
  cardPrice: "R$ 1.200,00",
  cardInstallments: "até 12x",
  whatsappNumber: "5521995393880",
  videoUrl: "https://www.youtube.com/embed/imhAXJ5Be7k",
  instagramUrl: "https://www.instagram.com/andercellinfo/",
};

const messages = {
  enroll:
    "Olá! Quero me matricular no Curso de Iniciação à Manutenção de Celulares.",
  details:
    "Olá! Gostaria de saber mais sobre o Curso de Iniciação à Manutenção de Celulares.",
  class: "Olá! Gostaria de saber as datas da próxima turma do curso.",
};
function openWhatsApp(message) {
  window.open(
    `https://wa.me/${courseConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener",
  );
}
document
  .querySelectorAll("[data-whatsapp]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      openWhatsApp(messages[button.dataset.whatsapp] || messages.details),
    ),
  );

const faqs = [
  [
    "Preciso ter experiência?",
    "Não. O curso foi desenvolvido principalmente para iniciantes.",
  ],
  ["Qual a idade mínima para fazer o curso?", "A idade mínima é 15 anos."],
  ["Quantas horas tem o curso?", "São 40 horas de formação."],
  ["Quantos dias dura?", "No formato intensivo, são 5 dias consecutivos."],
  ["Qual o horário?", "Das 09h às 18h."],
  ["Quantos alunos participam?", "No máximo 2 alunos por turma."],
  [
    "Posso fazer sozinho?",
    "Sim. O curso pode ocorrer individualmente ou em dupla.",
  ],
  [
    "Posso fazer uma ou duas vezes por semana?",
    "Existe essa possibilidade mediante combinação de agenda.",
  ],
  ["O curso é presencial?", "Sim. O curso é presencial e totalmente prático."],
  [
    "Preciso comprar ferramentas?",
    "Não. As ferramentas são disponibilizadas para utilização durante as aulas.",
  ],
  [
    "Recebo certificado, apostila e lista de fornecedores?",
    "Sim, todos estão inclusos no curso.",
  ],
  ["Quanto custa?", "R$ 1.000 à vista ou R$ 1.200 no cartão, em até 12x."],
  [
    "Onde acontece?",
    "Na Rua Alberto Sampaio, nº 40, Santa Rita, Nova Iguaçu/RJ — ao lado da Farmácia Fama da Papelândia.",
  ],
];
document.querySelector(".faq-list").innerHTML = faqs
  .map(
    ([q, a]) =>
      `<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`,
  )
  .join("");
document.querySelectorAll("details").forEach((item) =>
  item.addEventListener("toggle", () => {
    if (item.open)
      document.querySelectorAll("details").forEach((other) => {
        if (other !== item) other.open = false;
      });
  }),
);

const header = document.querySelector(".site-header"),
  toggle = document.querySelector(".menu-toggle"),
  nav = document.querySelector(".nav");
toggle.setAttribute("aria-controls", "primary-navigation");
const closeMenu = () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
};
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
const internalMenuLinks = [...nav.querySelectorAll("a[href^='#']")];
internalMenuLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
    closeMenu();
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
const menuLinks = internalMenuLinks;
const sectionLinks = menuLinks
  .map((link) => ({
    link,
    section: document.querySelector(link.getAttribute("href")),
  }))
  .filter((item) => item.section);
const updateActiveMenu = () => {
  header.classList.toggle("scrolled", scrollY > 20);
  const current =
    sectionLinks
      .filter(({ section }) => section.getBoundingClientRect().top <= 130)
      .at(-1) || sectionLinks[0];
  menuLinks.forEach((link) =>
    link.classList.toggle("active", link === current.link),
  );
};
window.addEventListener("scroll", updateActiveMenu, { passive: true });
updateActiveMenu();
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.querySelector("#year").textContent = new Date().getFullYear();
const video = document.querySelector("[data-video]");
if (video && courseConfig.videoUrl)
  video.innerHTML = `<iframe src="${courseConfig.videoUrl}" title="Vídeo de apresentação do curso" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;

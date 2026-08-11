const stages = ["Confirmado", "Separação", "Em rota", "Entregue"];
const times = ["08:42", "10:18", "13:36"];
const deliveries = [
  { id: "LM-48291", customer: "Marina Costa", city: "São Paulo", eta: "14:10-15:00", risk: "Baixo", confidence: 94 },
  { id: "LM-48277", customer: "Rafael Lima", city: "Osasco", eta: "16:20-17:10", risk: "Médio", confidence: 72 },
  { id: "LM-48265", customer: "Ana Souza", city: "Barueri", eta: "09:00-10:00", risk: "Baixo", confidence: 89 }
];
let currentStage = 2;
let selectedSlot = "14:00-16:00";

function notify(text) {
  const toast = document.querySelector("#toast");
  toast.textContent = `✓ ${text}`;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function renderStages() {
  document.querySelector(".progress i").style.width = `${((currentStage + 1) / stages.length) * 100}%`;
  document.querySelector(".stages").innerHTML = stages.map((name, index) => `<div class="${index <= currentStage ? "done" : ""}"><span>${index < currentStage ? "✓" : index + 1}</span><b>${name}</b><small>${index < currentStage ? times[index] : index === currentStage ? "Agora" : "Aguardando"}</small></div>`).join("");
}

function renderDeliveries() {
  document.querySelector("#delivery-list").innerHTML = deliveries.map((item, index) => `<div class="delivery"><strong>0${index + 1}</strong><div><b>${item.id}</b><span>${item.customer} · ${item.city}</span></div><div><small>PREVISÃO</small><b>${item.eta}</b></div><em class="${item.risk === "Baixo" ? "low" : "medium"}">${item.risk}</em><div class="confidence"><b>${item.confidence}%</b><small>confiança</small></div></div>`).join("");
}

document.querySelectorAll("nav button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("nav button").forEach(item => item.classList.remove("active"));
  document.querySelectorAll(".view").forEach(item => item.classList.remove("active-view"));
  button.classList.add("active");
  document.querySelector(`#${button.dataset.view}`).classList.add("active-view");
}));

document.querySelectorAll("[data-slot]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-slot]").forEach(item => item.classList.remove("selected"));
  button.classList.add("selected");
  selectedSlot = button.dataset.slot;
}));

document.querySelector("[data-action='advance']").addEventListener("click", () => { currentStage = (currentStage + 1) % 4; renderStages(); });
document.querySelector("[data-action='message']").addEventListener("click", () => notify("Mensagem enviada ao motorista."));
document.querySelector("[data-action='confirm']").addEventListener("click", () => notify(`Janela ${selectedSlot} confirmada. Rota recalculada pela IA.`));
document.querySelector("[data-action='optimize']").addEventListener("click", () => notify("Rotas otimizadas com sucesso."));
document.querySelector("[data-action='apply']").addEventListener("click", () => notify("Recomendação aplicada à rota 28A."));
renderStages();
renderDeliveries();

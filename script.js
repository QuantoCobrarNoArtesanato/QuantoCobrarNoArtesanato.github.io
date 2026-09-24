const form = document.getElementById("pricingForm");
const profit = document.getElementById("profit");
const profitValue = document.getElementById("profitValue");
const money = value => value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});

function calculate() {
  const materials = Math.max(0, Number(document.getElementById("materials").value) || 0);
  const hours = Math.max(0, Number(document.getElementById("hours").value) || 0);
  const hourly = Math.max(0, Number(document.getElementById("hourly").value) || 0);
  const extras = Math.max(0, Number(document.getElementById("extras").value) || 0);
  const margin = Math.max(0, Number(profit.value) || 0);

  const labor = hours * hourly;
  const cost = materials + labor + extras;
  const profitAmount = cost * (margin / 100);
  const finalPrice = cost + profitAmount;

  document.getElementById("finalPrice").textContent = money(finalPrice);
  document.getElementById("rMaterials").textContent = money(materials);
  document.getElementById("rLabor").textContent = money(labor);
  document.getElementById("rExtras").textContent = money(extras);
  document.getElementById("rCost").textContent = money(cost);
  document.getElementById("rProfit").textContent = money(profitAmount);
}

profit.addEventListener("input", () => {
  profitValue.value = `${profit.value}%`;
  calculate();
});
form.addEventListener("input", calculate);
form.addEventListener("submit", e => {
  e.preventDefault();
  calculate();
  document.getElementById("resultado").scrollIntoView({behavior:"smooth", block:"center"});
});

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("materials").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("hourly").value = "";
  document.getElementById("extras").value = "";
  profit.value = 40;
  profitValue.value = "40%";
  calculate();
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = `Preço sugerido: ${document.getElementById("finalPrice").textContent}
Materiais: ${document.getElementById("rMaterials").textContent}
Mão de obra: ${document.getElementById("rLabor").textContent}
Custos extras: ${document.getElementById("rExtras").textContent}
Custo total: ${document.getElementById("rCost").textContent}
Lucro: ${document.getElementById("rProfit").textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById("copyBtn");
    btn.textContent = "✓ Resumo copiado!";
    setTimeout(() => btn.textContent = "Copiar resumo do preço", 1800);
  } catch {
    alert(text);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
calculate();

// Seletores de input
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Selecionar os elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");
  value = Number(value) / 100;
  amount.value = value ? formatCurrencyBRL(value) : "";
};

function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

form.onsubmit = (event) => {
  event.preventDefault();

  // Garante que o valor está correto
  let valor = amount.value.replace(/[^\d,]/g, "").replace(",", ".");
  valor = valor ? parseFloat(valor) : 0;

  if (!expense.value.trim() || !category.value || !valor) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: valor,
    created_at: new Date(),
  };
  expenseAdd(newExpense);
  form.reset();
  amount.value = "";
};

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    expenseInfo.append(expenseName, expenseCategory);

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.textContent = `R$ ${newExpense.amount.toFixed(2).replace(".", ",")}`;

    const removeIcon = document.createElement("img");
    removeIcon.setAttribute("src", "./img/remove.svg");
    removeIcon.setAttribute("alt", "Remover despesa");
    removeIcon.style.cursor = "pointer";
    removeIcon.onclick = () => {
      expenseItem.remove();
      updateTotals();
    };

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);

    updateTotals();
  } catch (error) {
    console.error("Erro ao adicionar despesa:", error);
    alert("Erro ao adicionar despesa: " + error.message);
  }
}

function updateTotals() {
  try {
    const items = expenseList.children;
    expenseQuantity.textContent = `${items.length} ${items.length === 1 ? "despesa" : "despesas"}`;
  } catch (error) {
    console.error("Erro ao atualizar totais:", error);
    alert("Erro ao atualizar totais: " + error.message);
  }
}

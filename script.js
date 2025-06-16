//seletores de input
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  //coverte para centavos
  //e divide por 100 para obter o valor em reais
  value = Number(value) / 100;

  //formata o valor para o formato de moeda brasileiro
  //e atribui ao input
  amount.value = formatCurrencyBRL(value);
};
// Função para formatar o valor em moeda brasileira
function formatCurrencyBRL(value) {
  //formata o valor para o formato de moeda brasileiro
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //retorna o valor formatado
  return value
}

form.onsubmit = (event) => {
  event.preventDefault();
  
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  expenseAdd(newExpense);
}
function expenseAdd () {
  try {
    
  } catch (error) {
    console.error("Erro ao adicionar despesa:", error);
    alert("Erro ao adicionar despesa: " + error.message);
  }
}

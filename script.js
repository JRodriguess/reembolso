//seletores de input
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Selecionar os elementos da lista
const expenseList = document.querySelector("ul");


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
function expenseAdd(newExpense) {
  try {
    // Adiciona a nova despesa ao banco de dados
    // Criando o item de li para adicionar a lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //criando icone de imagem
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //adiciona as informações no item
    expenseItem.appendChild(expenseIcon);

    //adiciona o item na lista
    expenseList.appendChild(expenseItem);

  } catch (error) {
    console.error("Erro ao adicionar despesa:", error);
    alert("Erro ao adicionar despesa: " + error.message);
  }
}

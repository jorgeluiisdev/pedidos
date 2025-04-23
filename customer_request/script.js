const tabela = {
  "Coca-Cola":12.00,
  "Cerveja Lata Itaipava":4.00,
  "Cerveja Lata Skol":5.00,
  "Espetinho de Frango":7.00,
  "Espetinho de Boi":8.00,
  "Ficha de Sinuca":1.00
};

let pedidos = [];

// Pega o número da mesa da URL
const urlParams = new URLSearchParams(window.location.search);
const mesaNumero = urlParams.get('mesa');

// Define chave única no localStorage para esta mesa
const chaveMesa = `pedidos_mesa_${mesaNumero}`;

function carregarPedidos() {
  const salvos = localStorage.getItem(chaveMesa);
  if (salvos) {
    pedidos = JSON.parse(salvos);
    atualizarLista();
  }
}

function salvarPedidos() {
  localStorage.setItem(chaveMesa, JSON.stringify(pedidos));
}

function adicionarProduto() {
  const produto = document.getElementById("produto").value;
  if (produto && tabela[produto]) {
    pedidos.push({ nome: produto, preco: tabela[produto] });
    salvarPedidos();
    atualizarLista();
  }
}

function atualizarLista() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  let total = 0;

  pedidos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - R$${p.preco.toFixed(2)}`;
    ul.appendChild(li);
    total += p.preco;
  });

  document.getElementById("total").textContent = `Total: R$${total.toFixed(2)}`;
}

function limpar() {
  pedidos = [];
  salvarPedidos();
  atualizarLista();
}

// Inicia carregando pedidos da mesa certa
carregarPedidos();

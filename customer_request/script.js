const tabela = {
  "Hambúrguer": 15.00,
  "Batata Frita": 8.00,
  "Refrigerante": 5.00,
  "Milkshake": 10.00,
  "pizza": 10.00
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

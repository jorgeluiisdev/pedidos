const addBtn = document.getElementById('addBtn');
const containerArea = document.getElementById('containerArea');

let count = 1;

function criarContainer(mesaId, nomeMesaSalvo) {
  const container = document.createElement('div');
  container.classList.add('container');

  const nomeMesa = document.createElement('span');
  nomeMesa.classList.add('nome-mesa');
  nomeMesa.textContent = nomeMesaSalvo || `Mesa ${mesaId}`;

  // Torna o nome editável com duplo clique
  nomeMesa.addEventListener('dblclick', (event) => {
    event.stopPropagation();

    const input = document.createElement('input');
    input.value = nomeMesa.textContent;
    input.classList.add('input-edicao');
    container.replaceChild(input, nomeMesa);
    input.focus();

    input.addEventListener('blur', () => {
      const novoNome = input.value.trim() || `Mesa ${mesaId}`;
      nomeMesa.textContent = novoNome;
      localStorage.setItem(`nome_mesa_${mesaId}`, novoNome);
      container.replaceChild(nomeMesa, input);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      }
    });
  });

  // Botão de remover mesa (fora do dblclick)
  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'X';
  btnRemover.classList.add('btn-remover');

  btnRemover.addEventListener('click', (e) => {
    e.stopPropagation();
    if (confirm("Deseja remover esta mesa?")) {
      container.remove();
      localStorage.removeItem(`nome_mesa_${mesaId}`);

      const totalMesas = parseInt(localStorage.getItem('quantidadeMesas')) || 0;
      if (mesaId === totalMesas) {
        localStorage.setItem('quantidadeMesas', totalMesas - 1);
      }
    }
  });

  // Clicar na div leva para a página da mesa
  container.addEventListener('click', () => {
    window.location.href = `customer_request/index.html?mesa=${mesaId}`;
  });

  container.appendChild(nomeMesa);
  container.appendChild(btnRemover); // aqui você adiciona o botão à div
  containerArea.appendChild(container);
}

// Adicionar nova mesa
addBtn.addEventListener('click', () => {
  const mesaId = count++;
  criarContainer(mesaId);
  localStorage.setItem('quantidadeMesas', mesaId);
});

// Recarrega as mesas já criadas com nomes salvos
window.addEventListener('DOMContentLoaded', () => {
  const quantidadeMesas = parseInt(localStorage.getItem('quantidadeMesas')) || 0;
  for (let i = 1; i <= quantidadeMesas; i++) {
    const nomeSalvo = localStorage.getItem(`nome_mesa_${i}`);
    criarContainer(i, nomeSalvo);
    count = i + 1;
  }
});

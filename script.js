class Tarefa {
    constructor(nome) {
        if (nome.trim() === "") {
            throw new Error("Adicione alguma tarefa!");
        }

        this.nome = nome;
        this.pronta = false;
    }

    marcarComoPronta() {
        this.pronta = !this.pronta;
    }
}

// ARRAY DE TAREFAS
const listaDeTarefas = [];

// ELEMENTOS DO HTML
const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHTML = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");

const botaoTema = document.getElementById("botao-tema");

// ADICIONAR TAREFA
botaoAdicionar.addEventListener("click", function () {
    try {
        const nome = campoTarefa.value;
        const novaTarefa = new Tarefa(nome);
        listaDeTarefas.push(novaTarefa);
        campoTarefa.value = "";

        renderizarLista();
    } catch (erro) {
        alert(erro.message);
    }
});

function renderizarLista() {

    listaHTML.innerHTML = "";

    listaDeTarefas.forEach((tarefa, index) => {

        const item = document.createElement("li");
        item.classList.add("item-tarefa");

        if (tarefa.pronta) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <span onclick="marcarTarefa(${index})">
                ${tarefa.nome}
            </span>
            
            <div class="acoes-tarefa">

        <button 
            class="botao-acao"
            onclick="marcarTarefa(${index})"
            title="Concluir tarefa">
            <i class="fa-solid fa-check"></i>
        </button>

        <button 
            class="botao-acao excluir" 
            onclick="removerTarefa(${index})"
            title="Remover tarefa">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;

        listaHTML.appendChild(item);
    });

    atualizarContador();
}

// MARCAR / DESMARCAR TAREFA

function marcarTarefa(index) {
    listaDeTarefas[index].marcarComoPronta();

    renderizarLista();
}

// REMOVER TAREFA
function removerTarefa(index) {
    listaDeTarefas.splice(index, 1);
    renderizarLista();
}

// CONTADOR
function atualizarContador() {

    const quantidade = listaDeTarefas.length;
    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;
}

// MODO ESCURO
botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        botaoTema.innerHTML = `<i class="fa-solid fa-sun"></i>`;

    } else {
        botaoTema.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
});
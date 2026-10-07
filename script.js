/* class Tarefa {
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
        <span class="nome-tarefa" onclick="marcarTarefa(${index})">
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

        <button 
        class="botao-acao editar" 
        onclick="editarTarefa(${index})"
        title="Editar tarefa">
        <i class="fa-solid fa-edit"></i>
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

// EDITAR TAREFA
function editarTarefa(index) {
    const nome = document.querySelectorAll(".nome-tarefa")[index];

    nome.contentEditable = true;
    nome.focus();

    nome.onblur = function () {
        listaDeTarefas[index].nome = nome.innerText();
        nome.contentEditable = false;
    };
}

// LIMPAR TODAS AS TAREFAS
function limparConcluidas() {
    for (let i = listaDeTarefas.length - 1; i >= 0; i--) {
        if (listaDeTarefas[i].pronta) {
            listaDeTarefas.splice(i, 1);
        }
    }
    renderizarLista();
}

// CONTADOR
function atualizarContador() {

    const quantidade = listaDeTarefas.length;
    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;
}

function mostrarAviso() {
    alert("Adicionei a função de editar a tarefa depois de feita e um botão para limpar as tarefas concluídas.");
}

// MODO ESCURO
botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        botaoTema.innerHTML = `<i class="fa-solid fa-sun"></i>`;

    } else {
        botaoTema.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }


}); */

// FASE 1: Modelagem dos dados (Classe Base)
//
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

//
// FASE 2: Gerenciamento de Estado (Memória)
//
const listaDeTarefas = [];

//
// 🆕 FASE 2.1: Persistência com localStorage
//
// Definimos uma constante para evitar erros de digitação ao usar a chave do localStorage
const CHAVE_STORAGE = "lista_tarefas";
// professor, mudei o nome que antes tava para produtos, agora coloquei tarefas

// 1. Função para SALVAR os dados no navegador
function salvarNoLocalStorage() {
    // JSON.stringify converte o Array de Objetos JS em uma String JSON
    const listaEmTexto = JSON.stringify(listaDeTarefas);
    localStorage.setItem(CHAVE_STORAGE, listaEmTexto);
}

// 2. Função para CARREGAR os dados salvos quando a página abrir
function carregarDoLocalStorage() {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

    // Se existirem dados salvos anteriormente no navegador...
    if (dadosSalvos) {
        // Converte a string JSON de volta para um Array de objetos genéricos
        const tarefasObjetos = JSON.parse(dadosSalvos);

        // ATENÇÃO (Conceito POO): Reinstanciamos cada tarefa com "new Tarefa()"
        // para garantir que os objetos recuperem os métodos da classe
        tarefasObjetos.forEach((tar) => {
            const tarefaInstanciada = new Tarefa(tar.nome);
            tarefaInstanciada.pronta = tar.pronta;
            listaDeTarefas.push(tarefaInstanciada);
            // troquei PROD de produtos pra TAR de tarefa
        });
    }
}

//
// FASE 3: Captura de Elementos do DOM
//
const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHTML = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-tema");

// coloquei os botoes

//
// FASE 4: Escuta de Eventos
//

// 1. Adicionar Tarefa
botaoAdicionar.addEventListener("click", function () {
    try {
        const nome = campoTarefa.value;

        const novaTarefa = new Tarefa(nome);

        listaDeTarefas.push(novaTarefa);

        // 🆕 Salva no localStorage sempre que uma nova tarefa for adicionada
        salvarNoLocalStorage();

        campoTarefa.value = "";
        atualizarInterface();

    } catch (erro) {
        alert(erro.message);
    }
}); // Eu coloquei o salvarNoLocalStorage() depois de adicionar a tarefa na lista,
// para que ela seja salva no navegador e não seja perdida quando a página for recarregada.

//
// FASE 5: Funções de Atualização e Renderização da Interface
//

// Função responsável por marcar ou desmarcar uma tarefa
function marcarTarefa(index) {
    listaDeTarefas[index].marcarComoPronta();

    // 🆕 Salva a nova situação da tarefa no localStorage
    salvarNoLocalStorage();

    atualizarInterface();
}

// Função responsável por remover uma única tarefa pelo índice
function removerTarefa(index) {
    listaDeTarefas.splice(index, 1);

    // 🆕 Salva a nova lista (sem o item removido) no localStorage
    salvarNoLocalStorage();

    atualizarInterface();
}

// Função responsável por editar uma tarefa
function editarTarefa(index) {
    const nome = document.querySelectorAll(".nome-tarefa")[index];

    nome.contentEditable = true;
    nome.focus();

    nome.onblur = function () {
        listaDeTarefas[index].nome = nome.innerText;
        nome.contentEditable = false;

        // 🆕 Salva a tarefa editada no localStorage
        salvarNoLocalStorage();
    };
}

// Função responsável por limpar todas as tarefas concluídas
function limparConcluidas() {
    for (let i = listaDeTarefas.length - 1; i >= 0; i--) {
        if (listaDeTarefas[i].pronta) {
            listaDeTarefas.splice(i, 1);
        }
    }

    // 🆕 Salva a nova lista depois de remover as tarefas concluídas
    salvarNoLocalStorage();

    atualizarInterface();
}

// Função responsável por renderizar a lista
function renderizarLista() {

    listaHTML.innerHTML = "";

    listaDeTarefas.forEach((tarefa, index) => {

        const item = document.createElement("li");
        item.classList.add("item-tarefa");

        if (tarefa.pronta) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
        <span class="nome-tarefa" onclick="marcarTarefa(${index})">
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

            <button 
                class="botao-acao editar" 
                onclick="editarTarefa(${index})"
                title="Editar tarefa">
                <i class="fa-solid fa-edit"></i>
            </button>

        </div>`;

        listaHTML.appendChild(item);
    });

    atualizarContador();
}

// CONTADOR
function atualizarContador() {

    const quantidade = listaDeTarefas.length;

    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;
}

// Função principal que sincroniza a tela com os dados
function atualizarInterface() {
    renderizarLista();
}

function mostrarAviso() {
    alert("Adicionei a função de editar a tarefa depois de feita e um botão para limpar as tarefas concluídas.");
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

//
// 🆕 FASE 6: Inicialização da Aplicação
//
// Ao carregar o script pela primeira vez, restaura os dados do localStorage
// e atualiza a interface gráfica.
carregarDoLocalStorage();
atualizarInterface();
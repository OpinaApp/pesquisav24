//-----------------------------------------------------------------------------------------------------------------------------
// Oculta o campo 'semForssel' e seu título inicialmente
document.getElementById('semForssel').style.display = 'none';
document.querySelector('label[for="semForssel"]').style.display = 'none';

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('nomePesquisador')) {
        var nomePesquisador = prompt('Por favor, digite seu nome:');
        if (nomePesquisador) {
            localStorage.setItem('nomePesquisador', nomePesquisador);
        }
    }
});

document.getElementById('formularioPesquisa').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    // Captura os dados do formulário
    var dadosDoFormulario = {
        regiao: document.getElementById('regiao').value,
        nome: document.getElementById('nome').value,
        bairro: document.getElementById('bairro').value,
        sexo: document.getElementById('sexo').value,
        idade: document.getElementById('idade').value,
        avaliacaoGoverno: document.getElementById('avaliacaoGoverno').value,
        candidatosDisco: document.getElementById('candidatosDisco').value,
        semForssel: document.getElementById('semForssel').value,
        rejeicaoVoto: document.getElementById('rejeicaoVoto').value,
        problemaBairro: document.getElementById('problemaBairro').value,
        escolhaVereador: document.getElementById('escolhaVereador').value,
        telefone: document.getElementById('telefone').value
    };

    // Gera uma chave única para cada entrada
    var chave = 'DadosFormulario_' + Date.now();
    // Armazena os dados no localStorage em formato de string JSON
    localStorage.setItem(chave, JSON.stringify(dadosDoFormulario));

    alert('Dados salvos com sucesso!');

    // Limpa manualmente cada campo
    document.getElementById('regiao').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('avaliacaoGoverno').value = '';
    document.getElementById('candidatosDisco').value = '';
    document.getElementById('semForssel').value = '';
    document.getElementById('rejeicaoVoto').value = '';
    document.getElementById('problemaBairro').value = '';
    document.getElementById('escolhaVereador').value = '';
    document.getElementById('telefone').value = '';

    // Oculta o campo 'semForssel' e seu título inicialmente
    document.getElementById('semForssel').style.display = 'none';
    document.querySelector('label[for="semForssel"]').style.display = 'none';
});



// CODIGO INSTALAÇÃO PERSONALIZADA -----------------------------------------------------------------
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Mostrar o botão apenas se o PWA não estiver instalado.
    // Esta é uma aproximação, já que não podemos verificar diretamente se o PWA está instalado.
    const btnInstalarApp = document.getElementById('btnInstalarApp');
    if (btnInstalarApp) {
        btnInstalarApp.style.display = 'block';
    }
});

document.getElementById('btnInstalarApp')?.addEventListener('click', () => {
    // Ocultar o botão quando o usuário decide instalar o PWA.
    const btnInstalarApp = document.getElementById('btnInstalarApp');
    btnInstalarApp.style.display = 'none';

    // Mostrar o prompt de instalação.
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do app');
        } else {
            console.log('Usuário recusou a instalação do app');
        }
        deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', () => {
    console.log('A aplicação foi instalada.');

    // Ocultar o botão após a instalação.
    const btnInstalarApp = document.getElementById('btnInstalarApp');
    if (btnInstalarApp) {
        btnInstalarApp.style.display = 'none';
    }
});

// -----------------------------------------------------------------------------------------------

function verificarSenha() {
    var senha = prompt("Digite a senha para exportar:");
    if (senha == "senhaSecreta") {
        exportarDadosParaCSV();
    } else {
        alert("Senha incorreta!");
    }
}
// Botão Limpar Dados do Cache
document.getElementById('btnLimparCache').addEventListener('click', function() {
    var senha = prompt("Digite a senha para limpar os dados salvos:");
    if (senha == "limparDados") { // Senha escolhida
        localStorage.clear(); // Limpa todo o localStorage
        alert("Dados limpos com sucesso!");
    } else {
        alert("Senha incorreta!");
    }
});

function exportarDadosParaCSV() {
    var dadosRecuperados = [];
    for (var i = 0; i < localStorage.length; i++) {
        var chave = localStorage.key(i);
        if (chave.startsWith('DadosFormulario_')) {
            var valor = localStorage.getItem(chave);
            dadosRecuperados.push(JSON.parse(valor));
        }
    }

    // Modificação para incluir o nome do pesquisador e a data no nome do arquivo
    var nomePesquisador = localStorage.getItem('nomePesquisador') || 'pesquisador';
    var dataAtual = new Date().toISOString().slice(0,10); // Formato 'AAAA-MM-DD'
    var nomeArquivo = `dados_pesquisa_${nomePesquisador}_${dataAtual}.csv`;

    var csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    var cabeçalhos = Object.keys(dadosRecuperados[0]).join(",") + "\r\n";
    csvContent += cabeçalhos;

    dadosRecuperados.forEach(function(obj) {
        var row = Object.values(obj).map(function(val){
            // Assegura que strings com vírgulas sejam envoltas em aspas
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);

    link.click(); // Inicia o download
}
// Função para exibir ou ocultar o campo semForssel e seu título
document.getElementById('candidatosDisco').addEventListener('change', function() {
    var valorSelecionado = this.value;
    var campoSemForssel = document.getElementById('semForssel');
    var labelSemForssel = document.querySelector('label[for="semForssel"]');
    
    if (valorSelecionado === 'Forssel Ex-Prefeito') {
        campoSemForssel.style.display = 'block';
        labelSemForssel.style.display = 'block';
    } else {
        campoSemForssel.style.display = 'none';
        labelSemForssel.style.display = 'none';
    }
});

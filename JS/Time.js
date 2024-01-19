// Função que atualiza a data e hora na página
function updateDateTime() {
    // Cria um novo objeto Date, representando o momento atual
    var now = new Date();

    // Omitir os segundos do formato de hora
    // Configura a string de hora no formato de 2 dígitos para horas e minutos
    var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Encontra o elemento HTML com o ID "datetime" e atualiza seu conteúdo com a hora formatada
    document.getElementById("datetime").innerHTML = time;
}

// Chama a função quando a página carrega para exibir a hora inicial
updateDateTime();

// Configura um temporizador para chamar a função updateDateTime a cada segundo (1000 milissegundos)
setInterval(updateDateTime, 1000);

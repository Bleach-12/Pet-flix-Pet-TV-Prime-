document.addEventListener('DOMContentLoaded', function() {
    var showVideoBtn = document.getElementById('showVideoBtn'); // Botão para mostrar o vídeo
    var videoContainer = document.getElementById('video-container'); // Contêiner do vídeo
    var video = document.getElementById('video'); // IFrame do vídeo

    // Função para iniciar a reprodução do vídeo correspondente ao comando
    function playVideo(url) {
        videoContainer.style.display = 'block'; // Torna o contêiner do vídeo visível
        video.src = url + '?autoplay=1'; // Ajusta o src do iframe e inicia a reprodução do vídeo
    }

    // Função para ativar o reconhecimento de voz
    function activateVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // Verifica se o navegador suporta reconhecimento de voz
            var recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : new SpeechRecognition();
            
            recognition.lang = 'pt-BR'; // Define o idioma para português
            recognition.interimResults = false; // Recebe apenas resultados finais
            recognition.maxAlternatives = 1; // Número máximo de alternativas para resultados

            recognition.onstart = function() {
                console.log('Reconhecimento de voz ativado. Fale "tocar", "aula", ou "ruim" para iniciar o vídeo.');
            };

            recognition.onresult = function(event) {
                var command = event.results[0][0].transcript.toLowerCase(); // Captura o comando reconhecido
                console.log('Comando reconhecido: ', command);

                // Executa o vídeo correspondente ao comando reconhecido
                if (command === 'roar') {
                    playVideo('https://www.youtube.com/embed/pDfmz_mSZHs');
                } else if (command === 'ruim') {
                    playVideo('https://www.youtube.com/embed/1vj_75Q4paM');
                } else if (command === 'aula') {
                    playVideo('https://www.youtube.com/embed/-sR9G5ZWj2w');
                }
                
                showVideoBtn.style.display = 'none'; // Oculta o botão após abrir o vídeo
            };

            recognition.onerror = function(event) {
                console.error('Erro no reconhecimento de voz: ', event.error); // Exibe erro no console
            };

            recognition.onend = function() {
                console.log('Reconhecimento de voz encerrado.'); // Mensagem de encerramento
            };

            // Inicia o reconhecimento de voz
            recognition.start();
        } else {
            alert('Reconhecimento de voz não suportado neste navegador.'); // Alerta caso o navegador não suporte reconhecimento de voz
        }
    }

    // Adiciona evento ao botão para ativar o reconhecimento de voz
    showVideoBtn.addEventListener('click', function() {
        activateVoiceRecognition(); // Ativa o reconhecimento de voz ao clicar no botão
    });
});

# Frames-Metta

Olá! Este projeto é um programa que utiliza TensorFlow.js e o modelo COCO-SSD para detectar pessoas em vídeos, processando cada frame individualmente, exibindo na tela um vídeo final e salvando arquivos JSON chamados "history" e "alerts", com os resultados do processamento. A aplicação foi desenvolvida em JavaScript/Node.js e utiliza a biblioteca Canvas para manipulação de imagens.

Pré-requisitos:
1. Node.js instalado
2. Navegador moderno como Chrome, Firefox, Edge...

Instalação:
1. Clone o repository ou baixe os arquivos. 

2. Vá até a pasta do projeto -> (cd c:\Users\Renata\Desktop\Frames-Metta)

3. Instale as dependências: 
(cd src)
(npm i express cors)

Uso: 
1. Inicie o Backend -> (node server.js)

2. Certifique-se de que vê a mensagem no terminal: "Backend rodando na porta 3000".

3. Abra o arquivo Index.html em seu navegador. Aguarde o alerta sinalizando o carregamento do COCO-SSD (aparecerá um alerta na tela). Para evitar problemas de CORS, use uma extensão como Live Server do VS Code.

4. Utilize o menu lateral (esquerda) para fazer upload de um vídeo. Clique no botão "Carregar vídeo" e selecione um vídeo salvo em seu computador. O nome do arquivo aparecerá abaixo do botão. Certifique-se de que é o arquivo que escolheu. Clique no botão "Processar". O resultado da detecção aparecerá na tela. Ao final de cada frame processado, os dados serão enviados ao backend.

Resultados:
1. Os arquivos history.json e alerts.json serão salvos na pasta Output.

2. History.json contém id dos frames e contagem de pessoas por frame.

3. Alerts.json contém apenas os frames em que a contagem atingiu ou superou o limiar estabelecido no backend.

Configuração do limiar:
1. Para configurar o limiar de corte para alerts.json, vá em server.js e altere a variável limiar.

Contribuições: 
Todas as contribuições e participações são bem-vindas!

Licença: MIT License.

Créditos: Renata Barreto de Castro Fernandes. [Github: @renata-barreto](https://github.com/Renata-Barreto).

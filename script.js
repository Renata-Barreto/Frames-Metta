//Permitindo que o model seja carregado antes de iniciar a detecção 
async function loadModel() {
    model = await cocoSsd.load();
    alert("Modelo carregado! Você pode subir um vídeo agora.");
}

loadModel();

//Função que detecta objetos no vídeo selecionado pelo usuário
async function detect() {
    const videoInput = document.getElementById('videoInput');
        if (videoInput.files.length === 0) {
            alert("Por favor, selecione um vídeo.");
            return;
        }

    const videoFile = videoInput.files[0];
    const videoURL = URL.createObjectURL(videoFile);
    const videoElement = document.createElement('video');
    videoElement.src = videoURL;
    videoElement.autoplay = true;
    videoElement.onloadedmetadata = async () => {
    await detectObjects(videoElement);
    };
}

//Função que processa o vídeo e detecta pessoas nos frames
async function detectObjects(video) {
    const canvas = document.createElement('canvas');
    canvas.className = 'video-frame'; 
    const ctx = canvas.getContext('2d');
    document.querySelector('.content').appendChild(canvas);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    //Criando o array para salvar o histórico de frames
    const history = [];
    let idFrame = 0;
    
    video.play();

    while (!video.ended && !video.paused) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const predictions = await model.detect(canvas);

        const personCount = predictions.filter(p => p.class === 'person').length;
        history.push({ idFrame, personCount });
        idFrame++;

        predictions.forEach(prediction => {
            if (prediction.class === 'person') {
                ctx.beginPath();
                ctx.rect(...prediction.bbox);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'red';
                ctx.fillStyle = 'red';
                ctx.stroke();
                ctx.fillText(prediction.class + ' - ' + Math.round(prediction.score * 100) + '%', prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
            }
        });

        fetch('http://127.0.0.1:3000/upload-history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(history)
        })

        .then(res => res.json())
        .then(data => console.log('Dados enviados!', data))
        .catch(err => console.error('Erro ao enviar:', err));

        await tf.nextFrame();
    }

    // Dados para o gráfico
    const labels = history.map(f => f.idFrame);
    const data = history.map(f => f.personCount);

    // Criando o gráfico com Chart.js
    const graphCanvas = document.getElementById('graph');
    graphCanvas.style.display = 'block';

    const ctxGrafico = graphCanvas.getContext('2d');
    new Chart(ctxGrafico, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pessoas por Frame',
                data: data,
                borderColor: 'blue',
                backgroundColor: 'rgba(0,0,255,0.1)',
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: false,
            scales: {
                x: { title: { display: true, text: 'Frame' } },
                y: { title: { display: true, text: 'Quantidade de Pessoas' }, beginAtZero: true }
            }
        }
    });

}

//Botão processar chamando a função detect
document.getElementById('processarBtn').addEventListener('click', detect);

//Botão input mostrando o nome do arquivo selecionado
document.getElementById('videoInput').addEventListener('change', function() {
        const fileNameSpan = document.getElementById('fileName');
            if (this.files.length > 0) {
                fileNameSpan.textContent = this.files[0].name;
        } else {
        fileNameSpan.textContent = '';
        }
    });

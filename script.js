const wordContainer = document.getElementById('current-word');
const textInput = document.getElementById('text-input');
const playButton = document.getElementById('play-button');
const fontSizeInput = document.getElementById('font-size');
const wpmInput = document.getElementById('wpm');
const chunkSizeSelect = document.getElementById('chunk-size');

let words = [];
let currentWordIndex = 0;
let isPlaying = false;
let intervalId = null;

playButton.addEventListener('click', () => {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
});

function play() {
    const text = textInput.value;
    if (!text) return; // No hacer nada si el texto está vacío

    words = text.split(/\s+/).filter(word => word.length > 0);
    currentWordIndex = 0;
    isPlaying = true;
    playButton.textContent = 'Pausar';

    const wpm = parseInt(wpmInput.value);
    const chunkSize = parseInt(chunkSizeSelect.value);
    const interval = 60000 / wpm; // Calcular el intervalo en milisegundos

    intervalId = setInterval(() => {
        if (currentWordIndex >= words.length) {
            pause();
            return;
        }

        let chunk = '';
        for (let i = 0; i < chunkSize; i++) {
            if (currentWordIndex + i < words.length) {
              chunk += words[currentWordIndex + i] + ' ';
            }
        }

        wordContainer.textContent = chunk;
        currentWordIndex += chunkSize;
        updateFontSize();
    }, interval * chunkSize);
}

function pause() {
    isPlaying = false;
    playButton.textContent = 'Reproducir';
    clearInterval(intervalId);
}

function updateFontSize() {
    const fontSize = fontSizeInput.value + 'px';
    wordContainer.style.fontSize = fontSize;
}

fontSizeInput.addEventListener("change", updateFontSize)
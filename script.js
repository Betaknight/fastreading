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
    // Si no hay texto O (si la lista de palabras está vacía o si el índice es mayor o igual a la longitud de la lista)
    if (!text || (words.length === 0 || currentWordIndex >= words.length)) {
        words = text.split(/\s+/).filter(word => word.length > 0);
        currentWordIndex = 0;
    }

    isPlaying = true;
    playButton.textContent = 'Pausar';

    intervalId = setInterval(showChunk, calculateInterval());
}

function pause() {
    isPlaying = false;
    playButton.textContent = 'Reproducir';
    clearInterval(intervalId);
}

function showChunk() {
    if (currentWordIndex >= words.length) {
        pause();
        return;
    }

    const chunkSize = parseInt(chunkSizeSelect.value);
    let chunk = '';
    for (let i = 0; i < chunkSize; i++) {
        if (currentWordIndex + i < words.length) {
            chunk += words[currentWordIndex + i] + ' ';
        }
    }

    wordContainer.textContent = chunk;
    currentWordIndex += chunkSize;
    updateFontSize();
}

function calculateInterval() {
    const wpm = parseInt(wpmInput.value);
    const chunkSize = parseInt(chunkSizeSelect.value);
    return (60000 / wpm) * chunkSize;
}

function updateFontSize() {
    const fontSize = fontSizeInput.value + 'px';
    wordContainer.style.fontSize = fontSize;
}

fontSizeInput.addEventListener("change", updateFontSize);
wpmInput.addEventListener("change", () => {
    if (isPlaying) {
        // Si está en reproducción, actualiza el intervalo
        clearInterval(intervalId);
        intervalId = setInterval(showChunk, calculateInterval());
    }
});

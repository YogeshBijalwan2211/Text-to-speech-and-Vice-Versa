let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("#voice-select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("#btn-listen").addEventListener("click", () => {
    speech.text = document.querySelector("#text-input").value;
    window.speechSynthesis.speak(speech);
});

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector("#btn-speak").addEventListener("click", () => {
    document.querySelector("#text-input").value = "";
    recognition.start();
});

recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    document.querySelector("#text-input").value = speechResult;
};
recognition.onspeechend = () => {
    recognition.stop();
};
recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
};
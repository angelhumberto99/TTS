export default class TextSpeech {
    constructor(voices) {
        this.msg = "";
        this.pitch = 1;
        this.rate = 1;
        this.voices = voices;
    }

    // inicializa los parametros antes de hablar
    Init = (msg, pitch, rate, lang) => {
        this.msg = msg;
        this.pitch = pitch;
        this.rate = rate;
        this.SetLaguage(lang);
    }
    

    // reproduce el texto
    Speak = () => {
        if (window.speechSynthesis.speaking) return;
        if (this.msg !== "") {
            const speakText = new SpeechSynthesisUtterance(this.msg);
            speakText.voice = this.currentVoice;
            speakText.rate = this.rate;
            speakText.pitch = this.pitch;
            window.speechSynthesis.speak(speakText);
        }
    };

    // settea los valores para la voz requerida
    SetLaguage = (lang) => {
        for(let e of this.voices)
            if (e.name === lang) this.currentVoice = e;
    };
}

export function GetVoices() {
    return new Promise(resolve => {
        let id;
        id = setInterval(() => {
            let voices = window.speechSynthesis.getVoices()
            if (voices.length > 0) {
                resolve(voices)
                clearInterval(id)
            }
        }, 1);
    })
};

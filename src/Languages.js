export default class TextSpeech {
    constructor() {
        this.msg = "";
        this.pitch = 1;
        this.rate = 1;
        this.voices = [];
        this.getVoices();
        if (window.speechSynthesis.onvoiceschange !== undefined)
            window.speechSynthesis.onvoiceschange = this.getVoices;
    }
    
    // obtiene las voces disponibles
    getVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.currentVoice = this.voices[0];
    }

    // reproduce el texto
    speak = () => {
        if(window.speechSynthesis.speaking){
            console.error("Already speaking...");
            return;
        }
        if(this.msg !== ""){
            const speakText = new SpeechSynthesisUtterance(this.msg);
            speakText.onend = e => {
                console.log("Done speaking");
            }
            speakText.onerror = e => {
                console.error("Something went wrong");
            }
            speakText.voice = this.currentVoice;
            speakText.rate = this.rate;
            speakText.pitch = this.pitch;
            window.speechSynthesis.speak(speakText);    
        }
    }

    // settea los valores para la voz requerida
    setLaguage = (lang) => {
        this.voices.map((e) => {
            if (e.name === lang)
                this.currentVoice = e;
        });
    }

}
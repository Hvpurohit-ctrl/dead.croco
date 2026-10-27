// Web Speech API Voice and Audio Helpers

export function speakText(text: string, lang: 'en' | 'hi' | 'ta' = 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('Text-to-speech is not supported on this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95; // Slightly slower for clarity
  utterance.pitch = 1.0;

  // Language mapping
  const langCodeMap: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    ta: 'ta-IN'
  };

  utterance.lang = langCodeMap[lang] || 'en-US';

  // Find preferred voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(langCodeMap[lang]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Speech to text listener interface
export class VoiceRecognitionService {
  private recognition: any = null;
  public isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.isSupported = true;
      }
    }
  }

  startListening(
    onResult: (transcript: string) => void,
    onError: (err: any) => void,
    onEnd: () => void,
    lang: 'en' | 'hi' | 'ta' = 'en'
  ) {
    if (!this.recognition) {
      onError('Speech recognition not available');
      return;
    }

    const langMap = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN' };
    this.recognition.lang = langMap[lang] || 'en-IN';

    this.recognition.onresult = (event: any) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      onResult(current);
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.onend = () => {
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('SpeechRecognition already started or blocked', e);
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }
}

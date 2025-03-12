import { CONSTANTS, RESPONSE_TYPES } from '../constants.js';
import { utils } from '../utils.js';
import { MessageHandler } from './MessageHandler.js';

export class VoiceHandler {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.timeout = null;
        this.micIcon = null;
        this.setupSpeechRecognition();
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.micButton = utils.elements.get(CONSTANTS.SELECTORS.micButton);
        this.micIcon = this.micButton.querySelector('.material-icons');

        if (!this.micButton) return;

        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.setupRecognitionConfig();
            this.setupEventListeners();
        } else {
            // Just set up click handler to show alert when mic is clicked
            this.micButton.addEventListener('click', () => {
                MessageHandler.addMessage('bot', CONSTANTS.MESSAGES.VOICE_ERROR, RESPONSE_TYPES.ERROR);
            });
        }
    }

    setupRecognitionConfig() {
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => this.handleRecognitionStart();
        this.recognition.onend = () => this.handleRecognitionEnd();
        this.recognition.onerror = (event) => this.handleRecognitionError(event);
        this.recognition.onresult = (event) => this.handleRecognitionResult(event);
    }

    setupEventListeners() {
        if (!this.recognition) return;
        this.micButton.addEventListener('click', () => this.toggleListening());
    }

    updateMicButtonState(isRecording) {
        if (!this.micButton || !this.micIcon) return;

        if (isRecording) {
            this.micButton.classList.add('recording');
            this.micIcon.textContent = 'stop';
        } else {
            this.micButton.classList.remove('recording');
            this.micIcon.textContent = 'mic';
        }
    }

    handleRecognitionStart() {
        this.isListening = true;
        this.updateMicButtonState(true);
        this.startTimeout();
    }

    handleRecognitionEnd() {
        this.isListening = false;
        this.updateMicButtonState(false);
        this.clearTimeout();
    }

    handleRecognitionError(event) {
        console.error('Speech recognition error:', event.error);
        this.stopListening();
        MessageHandler.addMessage('bot', `Voice recognition error: ${event.error}`);
    }

    handleRecognitionResult(event) {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');

        if (event.results[0].isFinal) {
            const inputElement = utils.elements.get(CONSTANTS.SELECTORS.chatInput);
            if (inputElement) {
                inputElement.value = transcript;
                inputElement.dispatchEvent(new Event('input'));
            }
            this.stopListening();
        }
    }

    toggleListening() {
        if (!this.recognition || this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
            this.isListening = true;
            this.updateMicButtonState(true);
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateMicButtonState(false);
        }
    }

    startTimeout() {
        this.clearTimeout();
        this.timeout = setTimeout(() => {
            this.stopListening();
            MessageHandler.addMessage('bot', 'Voice recognition timed out.');
        }, CONSTANTS.VOICE_TIMEOUT);
    }

    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}
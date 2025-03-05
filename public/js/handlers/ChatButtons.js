import { CONSTANTS } from '../constants.js';
import { utils } from '../utils.js';
import { LoadingHandler } from './LoadingHandler.js';

export class ChatButtons {
    static init() {
        this.chatMessagesContainer = utils.elements.get(CONSTANTS.SELECTORS.chatMessages);
        this.container = utils.elements.get(CONSTANTS.SELECTORS.chatButtonsContainer);
        if (!this.container) return;

        this.setupIntersectionObserver(this.container);
        this.setupEventListeners(this.container);
    }

    static setupEventListeners(container) {
        container.addEventListener('click', this.handleButtonClick.bind(this));
        // Add listener to chat messages container for inserted buttons
        if (this.chatMessagesContainer) {
            this.chatMessagesContainer.addEventListener('click', this.handleButtonClick.bind(this));
        }
    }

    static handleButtonClick(e) {
        const button = e.target.closest(CONSTANTS.SELECTORS.chatButtons);
        if (!button) return;

        document.dispatchEvent(new CustomEvent('chatButtonClick', {
            detail: { text: button.textContent }
        }));
    }

    static createButtonSet(options) {
        const buttonSet = document.createElement('div');
        buttonSet.className = 'buttons-set';

        // Add transition styles for smoother animations
        buttonSet.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        const buttons = options
            .map((text, index) => `
                <button class="chat-button animate-in" 
                    style="animation-delay: ${index * 100}ms"
                >${utils.sanitizeHTML(text.trim())}</button>
            `)
            .join('');

        buttonSet.innerHTML = buttons;
        return buttonSet;
    }

    static animateButtonSet(buttonSet) {
        requestAnimationFrame(() => {
            buttonSet.style.opacity = '0';
            buttonSet.style.transform = 'translateY(-20px)';

            requestAnimationFrame(() => {
                buttonSet.style.opacity = '1';
                buttonSet.style.transform = 'translateY(0)';
            });
        });
    }

    static insertButtons(options) {
        if (!this.chatMessagesContainer || !Array.isArray(options) || !options.length) return;

        const buttonSet = this.createButtonSet(options);

        // Insert before loading indicator like MessageHandler does
        const loadingIndicator = this.chatMessagesContainer.querySelector('.message-loading');
        if (loadingIndicator) {
            this.chatMessagesContainer.insertBefore(buttonSet, loadingIndicator);
        } else {
            this.chatMessagesContainer.appendChild(buttonSet);
        }

        this.setupIntersectionObserver(buttonSet);
        this.animateButtonSet(buttonSet);
    }

    static updateButtons(options) {
        if (!this.container || !Array.isArray(options) || !options.length) return;

        const buttonSet = this.createButtonSet(options);
        this.container.innerHTML = '';
        this.container.appendChild(buttonSet);
        this.setupIntersectionObserver(buttonSet);
        this.animateButtonSet(buttonSet);
    }

    static setupIntersectionObserver(container) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 }
        );

        container.querySelectorAll(CONSTANTS.SELECTORS.chatButtons)
            .forEach(button => observer.observe(button));
    }

    static clearButtons() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
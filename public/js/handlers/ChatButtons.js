import { CONSTANTS } from '../constants.js';
import { utils } from '../utils.js';
import { LoadingHandler } from './LoadingHandler.js';

export class ChatButtons {
    static init() {
        this.container = utils.elements.get(CONSTANTS.SELECTORS.chatButtonsContainer);
        if (!this.container) return;

        this.setupIntersectionObserver(this.container);
        this.setupEventListeners(this.container);
    }

    static setupEventListeners(container) {
        container.addEventListener('click', this.handleButtonClick.bind(this));
    }

    static handleButtonClick(e) {
        const button = e.target.closest(CONSTANTS.SELECTORS.chatButtons);
        if (!button) return;

        // Dispatch a custom event instead of directly manipulating input
        document.dispatchEvent(new CustomEvent('chatButtonClick', {
            detail: { text: button.textContent }
        }));
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

    static updateButtons(options) {
        if (!this.container) return;

        // Don't update if no options
        if (!Array.isArray(options) || options.length === 0) return;

        // Create buttons-set container
        const buttonSet = document.createElement('div');
        buttonSet.className = 'buttons-set';

        // Add buttons to the set with staggered animation classes
        const buttons = options
            .map((text, index) => `
                <button class="chat-button animate-in" 
                    style="animation-delay: ${index * 100}ms"
                >${utils.sanitizeHTML(text)}</button>
            `)
            .join('');

        buttonSet.innerHTML = buttons;
        this.container.innerHTML = '';

        // Add the new button set with entrance animation
        requestAnimationFrame(() => {
            buttonSet.style.opacity = '0';
            buttonSet.style.transform = 'translateY(-20px)';
            this.container.insertBefore(buttonSet, this.container.firstChild);

            // Trigger entrance animation for the set
            requestAnimationFrame(() => {
                buttonSet.style.opacity = '1';
                buttonSet.style.transform = 'translateY(0)';
            });

            // Setup intersection observer for new buttons
            this.setupIntersectionObserver(buttonSet);
        });
    }

    static clearButtons() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
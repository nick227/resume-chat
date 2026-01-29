import { CONSTANTS } from '../constants.js';
import { NavigationHandler } from './NavigationHandler.js';
import { utils } from '../utils.js';
import { scrollService } from '../services/ScrollService.js';

export class ChatButtons {
    static initialized = false;
    static currentOptions = [];
    static moreButton = null;
    static observer = null;
    static init() {
        if (this.initialized) return;
        this.chatMessagesContainer = utils.elements.get(CONSTANTS.SELECTORS.chatMessages);
        this.container = this.getButtonSet();
        if (!this.container) return;

        this.setupIntersectionObserver(this.container);
        this.setupEventListeners(this.container);
        this.initialized = true;
    }

    static setupEventListeners(container) {
        container.addEventListener('click', this.handleButtonClick.bind(this));
    }

    static handleButtonClick(event) {
        const button = event.target.closest('.chat-button');
        if (!button) return;
        if (button.dataset.chatAction === 'more') return;

        if (document.querySelector('.page-view')) {
            NavigationHandler.clearRoute();
        }

        const text = button.textContent.trim();

        // Dispatch chat button click event
        const clickEvent = new CustomEvent('chatButtonClick', {
            detail: { text },
            bubbles: true // Make sure event bubbles up
        });
        document.dispatchEvent(clickEvent);
    }

    static toggleButtons(show) {
        if (!this.container) return;
        this.container.style.display = show ? 'flex' : 'none';
    }

    static getButtonSet() {
        if (!this.chatMessagesContainer) return null;

        const existingSet = this.chatMessagesContainer.querySelector(CONSTANTS.SELECTORS.chatButtonsContainer);
        if (existingSet) return existingSet;

        const buttonSet = document.createElement('div');
        buttonSet.className = 'buttons-set';
        buttonSet.dataset.buttonRail = 'true';

        const loadingIndicator = this.chatMessagesContainer.querySelector('.message-loading');
        if (loadingIndicator) {
            this.chatMessagesContainer.insertBefore(buttonSet, loadingIndicator.nextSibling);
        } else {
            this.chatMessagesContainer.appendChild(buttonSet);
        }

        return buttonSet;
    }

    static createButtonsFragment(options) {
        const fragment = document.createDocumentFragment();
        let renderedCount = 0;
        options.forEach((text, index) => {
            const label = typeof text === 'string' ? text : `${text ?? ''}`;
            const trimmedLabel = label.trim();
            if (!trimmedLabel) return;
            const button = document.createElement('button');
            button.className = 'chat-button animate-in';
            button.style.animationDelay = `${index * 100}ms`;
            button.textContent = trimmedLabel;
            fragment.appendChild(button);
            renderedCount += 1;
        });
        console.log('Rendered option buttons:', renderedCount);
        return fragment;
    }

    static updateFromResponse(options = [], buttons = []) {
        const combined = [...options, ...buttons];
        if (combined.length) {
            this.updateButtons(combined);
        } else {
            this.clearButtons();
        }
    }

    static updateButtons(options) {
        if (!this.container || !Array.isArray(options)) return;
        this.currentOptions = options;
        this.renderButtons();
    }

    static setMoreButton(button) {
        if (!button) return;
        this.moreButton = button;
        this.renderButtons();
    }

    static renderButtons() {
        if (!this.container) return;

        this.container.replaceChildren();

        if (this.moreButton) {
            this.container.appendChild(this.moreButton);
        }

        if (this.currentOptions.length) {
            this.container.appendChild(this.createButtonsFragment(this.currentOptions));
        }

        this.setupIntersectionObserver(this.container);
        if (this.shouldAutoScroll()) {
            scrollService.scrollToBottom();
        }
    }

    static setupIntersectionObserver(container) {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 }
        );

        container.querySelectorAll(CONSTANTS.SELECTORS.chatButtons)
            .forEach(button => this.observer.observe(button));
    }

    static clearButtons() {
        if (!this.container) return;
        this.currentOptions = [];
        this.renderButtons();
    }

    static destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.clearButtons();
        this.initialized = false;
    }

    static shouldAutoScroll() {
        return !document.querySelector('.chat-messages .page-view');
    }
}

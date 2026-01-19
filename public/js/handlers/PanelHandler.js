import { autoMessageLoader } from '../services/AutoMessageLoader.js';
import { ChatButtons } from './ChatButtons.js';
import { CONSTANTS } from '../constants.js';

/**
 * Handles dynamic tab panels in chat messages
 */
export class PanelHandler {
    static currentIndex = 1;
    static maxIndex = 14;
    static chatMessages = null;
    static panel = null;
    static showMoreButton = null;
    static buttonMessages = ['Very cool. What else?', 'What else you got?', 'Tell me more', 'Keep going', 'Nice continue'];
    static init() {
        this.chatMessages = document.querySelector(CONSTANTS.SELECTORS.chatMessages);
        if (!this.chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

        this.addButtons();
        this.setupTabHandling();
        this.setupShowMoreLinks();
    }
    static setupShowMoreLinks() {
        this.chatMessages.addEventListener('click', (event) => {
            const link = event.target.closest('.show-more-link');
            if (!link) return;

            document.querySelector(CONSTANTS.SELECTORS.chatMessages).style.justifyContent = 'flex-start';

            const nextElement = link.nextElementSibling;
            if (!nextElement) return;

            nextElement.style.display = 'block';
            link.style.display = 'none';
        });
    }
    static setupTabHandling() {
        this.chatMessages.addEventListener('click', (event) => {
            const tabButton = event.target.closest('.tab-button');
            if (!tabButton) return;

            const panel = tabButton.closest('.tabs');
            if (!panel) return;

            this.handleTabClick(tabButton, panel);
        });
    }
    static handleTabClick(tabButton, panel) {
        const targetTab = tabButton.getAttribute('data-tab');
        if (!targetTab) return;

        // Update active states
        panel.querySelectorAll('.tab-button').forEach(btn =>
            btn.classList.remove('active'));
        tabButton.classList.add('active');

        // Show matching content
        panel.querySelectorAll('.tab-content-item').forEach(item => {
            item.style.display = item.getAttribute('data-item') === targetTab ?
                'block' : 'none';
        });
    }
    static addButtons() {
        // Create More button
        this.showMoreButton = document.createElement('button');
        this.showMoreButton.classList.add('chat-button');
        this.showMoreButton.dataset.chatAction = 'more';
        this.showMoreButton.textContent = this.buttonMessages[0];

        // Add button to the top rail slot
        ChatButtons.setMoreButton(this.showMoreButton);

        // Add click handlers
        this.showMoreButton.addEventListener('click', () => this.addItem());
    }
    static async addItem() {
        if (!this.showMoreButton) return;

        try {
            this.showMoreButton.textContent = 'Loading...';
            this.showMoreButton.disabled = true;

            await autoMessageLoader.init({
                messages: [{
                    type: 'AUTO',
                    startDelay: 0,
                    delay: 0,
                    maxRuns: 1,
                    startIndex: this.currentIndex
                }]
            });

            this.currentIndex++;

            // Update button text
            this.showMoreButton.textContent = this.currentIndex < this.buttonMessages.length ?
                this.buttonMessages[this.currentIndex] :
                this.buttonMessages[this.buttonMessages.length - 1];

            this.showMoreButton.disabled = false;

            // Hide buttons if we've reached the end
            if (this.currentIndex >= this.maxIndex) {
                this.showMoreButton.remove();
            }

        } catch (error) {
            console.error('Error loading more content:', error);
            this.showMoreButton.textContent = 'Error loading content';
            this.showMoreButton.disabled = false;
        }
    }
}

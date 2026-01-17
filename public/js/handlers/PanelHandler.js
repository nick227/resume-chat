import { autoMessageLoader } from '../services/AutoMessageLoader.js';
import { CONSTANTS } from '../constants.js';

/**
 * Handles dynamic tab panels in chat messages
 */
export class PanelHandler {
    static currentIndex = 2;
    static maxIndex = 14;
    static chatMessages = null;
    static panel = null;
    static showMoreButton = null;
    static showAllButton = null;
    static buttonMessages = ['Very cool. Tell me more', 'What else you got?', 'Show me more', 'Keep going', 'Continue'];
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
        // Create Show All button
        const container = document.createElement('div');
        container.classList.add('buttons-set');
        this.showAllButton = document.createElement('button');
        this.showAllButton.classList.add('show-all-button');
        this.showAllButton.textContent = 'Show All';

        // Create More button
        this.showMoreButton = document.createElement('button');
        this.showMoreButton.classList.add('more-button');
        this.showMoreButton.textContent = this.buttonMessages[0];

        // Add buttons to container
        container.appendChild(this.showAllButton);
        container.appendChild(this.showMoreButton);
        this.chatMessages.appendChild(container);

        // Add click handlers
        this.showMoreButton.addEventListener('click', () => this.addItem());
        this.showAllButton.addEventListener('click', () => this.showAll());
    }
    static async showAll() {
        if (!this.showAllButton || !this.showMoreButton) return;

        this.showAllButton.remove();
        this.showMoreButton.remove();

        const remainingItems = this.maxIndex - this.currentIndex;
        if (remainingItems <= 0) return;

        try {
            await autoMessageLoader.init({
                messages: [{
                    type: 'AUTO',
                    startDelay: 0,
                    delay: 200,
                    maxRuns: remainingItems,
                    startIndex: this.currentIndex,
                    clearContainer: false
                }]
            });
        } catch (error) {
            console.error('Error loading all content:', error);
        }
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
                this.showAllButton.remove();
            }

        } catch (error) {
            console.error('Error loading more content:', error);
            this.showMoreButton.textContent = 'Error loading content';
            this.showMoreButton.disabled = false;
        }
    }
}
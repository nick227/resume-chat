/**
 * Handles dynamic tab panels in chat messages
 */
export class PanelHandler {
    static init() {
        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) return;

        // Single event listener for all tab clicks
        chatMessages.addEventListener('click', (event) => {
            const button = event.target.closest('.tab-button');
            if (!button) return;

            // Find the panel containing this button
            const panel = button.closest('.panel.tabs');
            if (!panel) return;

            const targetTab = button.getAttribute('data-tab');
            if (!targetTab) return;
            // Update active states
            panel.querySelectorAll('.tab-button').forEach(btn =>
                btn.classList.remove('active'));
            button.classList.add('active');

            // Show matching content
            panel.querySelectorAll('.tab-content-item').forEach(item => {
                item.style.display = item.getAttribute('data-item') === targetTab ?
                    'block' :
                    'none';
            });
        });
    }
}
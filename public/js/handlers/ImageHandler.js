export class ImageHandler {
    constructor() {
        this.images = [];
    }
    static init() {
        // Use event delegation from chat-messages container
        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

        chatMessages.addEventListener('click', (event) => {
            const imageWidget = event.target.closest('.image-widget');
            if (!imageWidget) return;

            this.openModal(imageWidget);
        });

        // Handle escape key globally
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal');
                if (modal) this.closeModal(modal);
            }
        });
    }
    static openModal(image) {
        // Remove any existing modals
        const existingModal = document.querySelector('.modal');
        if (existingModal) this.closeModal(existingModal);

        const modal = document.createElement('div');
        modal.className = 'modal';

        const modalImg = document.createElement('img');
        modalImg.src = image.src;
        modalImg.alt = image.alt || 'Modal image';

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Force reflow and add opacity for smooth fade in
        modal.offsetHeight;
        modal.style.opacity = '1';

        // Close on click
        modal.addEventListener('click', () => this.closeModal(modal));

        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
    }
    static closeModal(modal) {
        // Smooth fade out
        modal.style.opacity = '0';

        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}
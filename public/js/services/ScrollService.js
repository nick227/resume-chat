/**
 * Handles scroll behavior across the application
 */
export class ScrollService {
    static SCROLL_DELAY = 3000; // 3 seconds delay
    static instance = null;

    constructor() {
        if (ScrollService.instance) {
            return ScrollService.instance;
        }

        this.container = null;
        this.isUserScrolling = false;
        this.scrollTimeout = null;
        this.lastScrollTop = 0;

        ScrollService.instance = this;
    }

    /**
     * Initialize the scroll service with a container
     */
    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Setup scroll listener
        this.container.addEventListener('scroll', () => {
            const currentScroll = this.container.scrollTop;

            // Check if user scrolled up
            if (currentScroll < this.lastScrollTop) {
                this.handleUserScroll();
            }

            this.lastScrollTop = currentScroll;
        });
    }

    /**
     * Handle user scroll up action
     */
    handleUserScroll() {
        this.isUserScrolling = true;

        // Clear any existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        // Set new timeout
        this.scrollTimeout = setTimeout(() => {
            this.isUserScrolling = false;
        }, ScrollService.SCROLL_DELAY);
    }

    /**
     * Scroll to bottom if allowed
     */
    scrollToBottom() {
        if (!this.container || this.isUserScrolling) return;

        // Use double requestAnimationFrame for reliability
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                try {
                    this.container.scrollTo({
                        top: this.container.scrollHeight,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    // Fallback for older browsers
                    this.container.scrollTop = this.container.scrollHeight;
                }
            });
        });
    }
}

// Export singleton instance
export const scrollService = new ScrollService();
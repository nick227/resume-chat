/**
 * Handles scroll behavior across the application
 */
export class ScrollService {
    static SCROLL_DELAY = 200; // 3 seconds delay
    static SCROLL_THRESHOLD = 100; // Pixels from bottom to trigger scroll
    static instance = null;

    constructor() {
        if (ScrollService.instance) {
            return ScrollService.instance;
        }

        this.container = null;
        this.isUserScrolling = false;
        this.scrollTimeout = null;
        this.autoScrollEnabled = true;

        ScrollService.instance = this;
    }

    /**
     * Initialize the scroll service with a container
     */
    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Scroll container not found:', containerId);
            return;
        }

        // Track user scrolling
        this.container.addEventListener('wheel', () => this.handleUserScroll(), { passive: true });
        this.container.addEventListener('touchmove', () => this.handleUserScroll(), { passive: true });

        // Check scroll position
        this.container.addEventListener('scroll', () => {
            this.handleUserScroll();
        });
    }

    /**
     * Handle user scroll up action
     */
    handleUserScroll() {
        this.isUserScrolling = true;
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
            this.isUserScrolling = false;
        }, ScrollService.SCROLL_DELAY);
    }

    setAutoScroll(enabled) {
        this.autoScrollEnabled = enabled;
        console.log('Auto scroll:', enabled ? 'enabled' : 'disabled');
    }

    /**
     * Scroll to bottom if allowed
     */
    scrollToBottom() {
        if (!this.container) {
            console.log('No container to scroll');
            return;
        }
        if (this.isUserScrolling) {
            console.log('Scroll prevented: User is scrolling');
            return;
        }
        if (!this.autoScrollEnabled) {
            console.log('Scroll prevented: Auto scroll disabled');
            return;
        }

        console.log('Scrolling to bottom...');
        const scrollHeight = this.container.scrollHeight;

        requestAnimationFrame(() => {
            this.container.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });
            console.log('Scroll complete');
        });
    }
}

// Export singleton instance
export const scrollService = new ScrollService();
export const utils = {
    // Add development mode detection
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    async fetchAPI(endpoint, options = {}) {
        const response = await fetch(endpoint, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: options.body ? JSON.stringify(options.body) : undefined
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    },

    sanitizeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    elements: {
        cache: new Map(),

        get(selector) {
            if (!this.cache.has(selector)) {
                const element = document.querySelector(selector);
                if (element) {
                    this.cache.set(selector, element);
                }
            }
            return this.cache.get(selector);
        },

        clear() {
            this.cache.clear();
        }
    }
};
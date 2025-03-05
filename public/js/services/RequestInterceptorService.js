/**
 * Service to intercept and monitor HTTP requests
 */
export class RequestInterceptorService {
    static instance = null;

    constructor() {
        if (RequestInterceptorService.instance) {
            return RequestInterceptorService.instance;
        }

        this.listeners = new Set();
        this.setupInterceptor();
        RequestInterceptorService.instance = this;
    }

    /**
     * Set up the fetch interceptor
     */
    setupInterceptor() {
        const originalFetch = window.fetch;

        window.fetch = async(...args) => {
            const [resource, config] = args;

            try {
                // Notify listeners before request
                this.notifyListeners('before', { url: resource, config });

                const response = await originalFetch(resource, config);

                // Notify listeners after request
                this.notifyListeners('after', {
                    url: resource,
                    config,
                    status: response.status,
                    ok: response.ok
                });

                return response;
            } catch (error) {
                // Notify listeners of error
                this.notifyListeners('error', {
                    url: resource,
                    config,
                    error
                });
                throw error;
            }
        };
    }

    /**
     * Add a listener function
     * @param {Function} listener - Function to call on request events
     */
    addListener(listener) {
        this.listeners.add(listener);
    }

    /**
     * Remove a listener function
     */
    removeListener(listener) {
        this.listeners.delete(listener);
    }

    /**
     * Notify all listeners of request event
     */
    notifyListeners(event, data) {
        // Convert URL object to string if needed
        const urlString = data.url instanceof URL ? data.url.toString() : data.url;

        this.listeners.forEach(listener => {
            try {
                listener(event, {...data, url: urlString });
            } catch (error) {
                console.error('Error in request listener:', error);
            }
        });
    }
}

// Export singleton instance
export const requestInterceptor = new RequestInterceptorService();
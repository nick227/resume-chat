/**
 * Handles loading indicator UI operations
 */
export class LoadingHandler {
    /**
     * Generates loading indicator HTML
     * @param {string} loadingText - Text to display in loading indicator
     * @returns {string} Loading indicator HTML
     */
    static getLoadingHTML(loadingText) {
        return `
            <div class="message bot message-loading" style="display: none;">
                <div class="loading-content">
                    <span class="loading-text">${loadingText}</span>
                    <div class="loading-dots">
                        ${Array(3).fill('<span class="loading-dot">.</span>').join('')}
                    </div>
                </div>
            </div>
        `;
    }
}
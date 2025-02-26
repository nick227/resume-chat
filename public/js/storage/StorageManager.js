/**
 * Generic storage utilities for localStorage operations
 */
export class StorageManager {
    /**
     * Saves data to localStorage
     * @param {string} key - Storage key
     * @param {any} data - Data to store
     */
    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.warn('Storage save failed:', error);
        }
    }

    /**
     * Loads data from localStorage
     * @param {string} key - Storage key
     * @returns {any} Parsed data or null
     */
    static load(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn('Storage load failed:', error);
            return null;
        }
    }

    /**
     * Removes data from localStorage
     * @param {string} key - Storage key
     */
    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('Storage remove failed:', error);
        }
    }
}
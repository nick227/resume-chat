import { CONSTANTS } from '../constants.js';
import { utils } from '../utils.js';

export class AvatarHandler {
    static counter = 0;

    static init() {
        const avatarContainer = utils.elements.get(CONSTANTS.SELECTORS.avatarContainer);
        if (!avatarContainer) return;

        avatarContainer.addEventListener('click', () => AvatarHandler.handleAvatarClick());
    }

    static handleAvatarClick() {
        AvatarHandler.counter++;

        switch (AvatarHandler.counter) {
            case 2:
                alert('Hey what you keep clicking that for?');
                break;
            case 5:
                alert('okay okay');
                break;
            case 8:
                alert('Have you tried the voice assistant?');
                break;
        }
    }
}
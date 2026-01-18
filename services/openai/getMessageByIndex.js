const getMessageByIndex = (autoMessages, startIndex = 0) => {
    if (!Array.isArray(autoMessages)) {
        throw new Error('Auto messages not available');
    }
    if (startIndex < 0 || startIndex >= autoMessages.length) {
        throw new Error('Invalid message index');
    }

    const message = autoMessages[startIndex];
    if (!message) {
        throw new Error('Message not found');
    }

    return message;
};

module.exports = { getMessageByIndex };

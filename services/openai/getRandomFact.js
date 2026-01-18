const getRandomFact = async ({
    registerRequest,
    buildMessageConfig,
    client,
    parseResponse
}) => {
    if (typeof registerRequest !== 'function') {
        throw new Error('registerRequest is required');
    }
    if (typeof buildMessageConfig !== 'function') {
        throw new Error('buildMessageConfig is required');
    }
    if (!client || !client.responses || typeof client.responses.create !== 'function') {
        throw new Error('OpenAI client is not configured');
    }
    if (typeof parseResponse !== 'function') {
        throw new Error('parseResponse is required');
    }

    registerRequest();
    // Should use the same message config and processing as normal chat
    const message = 'Write a short fact about Nick. Be humble and low-key. Keep it short and concise.';
    const history = []; // Empty history for random facts

    const config = buildMessageConfig(message, history);
    const completion = await client.responses.create(config);

    if (!completion) {
        throw new Error('No response from OpenAI');
    }

    return parseResponse(completion);
};

module.exports = { getRandomFact };

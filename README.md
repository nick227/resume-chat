# AI Resume Chat

An interactive resume chat application powered by OpenAI, WebSocket, and Node.js. This application creates an engaging way to present professional experience through a conversational interface.

## Overview

This chat application combines:
- Automated message sequences with configurable delays
- OpenAI-powered responses to questions about professional experience
- WebSocket real-time communication
- Voice interaction through ElevenLabs
- Clean, responsive UI

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Real-time**: WebSocket (ws)
- **AI**: OpenAI API
- **Voice**: ElevenLabs Convai Widget
- **Frontend**: Vanilla JavaScript, CSS3

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- OpenAI API key
- ElevenLabs account

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/nick227/ai-resume-chat.git
cd ai-resume-chat
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:
```env
PORT=3001
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
OPENAI_API_KEY=your_openai_key
```

4. Import database schema:
```bash
mysql -u your_username -p your_database < schema.sql
```

5. Start the server:
```bash
npm start
```

## Configuration

### Auto Messages
Configure automated message sequences in `config/autoMessages.js`:
```javascript
const AUTO_MESSAGES = [{
    type: 'chat',
    message: 'Welcome message',
    options: ['Option 1', 'Option 2'],
    delay: 0
}];
```

### AI Prompts
Customize AI conversation context in `config/prompts.js`. This includes:
- Resume content
- Q&A responses
- Conversation style guidelines

## Key Features

### WebSocket Communication
- Real-time bidirectional communication
- Session management
- Automated message sequences with configurable delays
- Race condition prevention between messages

### OpenAI Integration
- Context-aware responses about professional experience
- Natural conversation flow
- Customizable conversation style

### Voice Integration
- ElevenLabs Convai widget integration
- Voice-based interaction
- Real-time voice responses

### UI Features
- Clean, responsive design
- Social media integration
- Resume download option
- Typing indicators
- Interactive chat buttons

## Project Structure

```
├── config/
│   ├── autoMessages.js    # Automated message sequences
│   └── prompts.js         # AI conversation context
├── controllers/
│   └── chatController.js  # Chat handling logic
├── models/
│   └── Message.js         # Database interactions
├── public/
│   ├── css/
│   ├── js/
│   │   ├── handlers/     # Event handlers
│   │   ├── api/         # API interactions
│   │   └── utils.js     # Utility functions
│   └── index.html
├── server.js             # Express server setup
└── socketServer.js       # WebSocket handling
```

## Development

### Adding Auto Messages
Add new messages to `autoMessages.js`:
```javascript
{
    type: 'chat',
    message: 'Your message',
    options: ['Button 1', 'Button 2'],
    delay: 1000 // milliseconds
}
```

### Modifying AI Responses
Update the conversation context in `prompts.js`:
```javascript
// Add professional experience
// Add Q&A responses
// Modify conversation style
```

## License

MIT License

## Contact

Nick Rios - [@ai_super_lizard](https://twitter.com/ai_super_lizard)
GitHub: [https://github.com/nick227](https://github.com/nick227)


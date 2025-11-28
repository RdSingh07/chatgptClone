# Gemini AI Setup Guide

## Environment Variable Setup

Create a `.env` file in the root directory of your project with the following content:

```
VITE_GEMINI_API_KEY=AIzaSyBc-cI4sK3Jw2DL-_2sFCWyHdDyZMqzomg
```

**Note:** The API key is currently hardcoded as a fallback in `src/services/geminiService.js`, but it's recommended to use environment variables for security.

## How It Works

1. **Gemini Service** (`src/services/geminiService.js`)

   - Initializes Google Gemini AI client
   - Generates AI responses using the `gemini-2.5-flash` model
   - Handles conversation history for context
   - Provides error handling

2. **App Integration** (`src/App.jsx`)

   - Calls Gemini API when user sends a message
   - Shows loading indicator while waiting for response
   - Disables input during AI response generation
   - Displays AI responses in the chat

3. **Features**
   - Real-time AI responses using Google Gemini
   - Conversation context awareness
   - Loading states and error handling
   - Typing indicator while AI is responding

## Testing

After setting up, restart your dev server:

```bash
npm run dev
```

Then send a message in the chat interface to test the Gemini AI integration.

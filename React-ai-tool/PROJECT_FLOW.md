# 📚 Project Flow Documentation - Complete Step-by-Step Guide

This document explains the entire project flow, file by file, showing how everything connects and works together.

---

## 🎯 Table of Contents

1. [Application Entry Point](#1-application-entry-point)
2. [Global Styles Setup](#2-global-styles-setup)
3. [Authentication Context](#3-authentication-context)
4. [Main Application Component](#4-main-application-component)
5. [Landing Page (Public)](#5-landing-page-public)
6. [Authentication Components](#6-authentication-components)
7. [Chat Interface Components](#7-chat-interface-components)
8. [Services Layer](#8-services-layer)
9. [Complete User Flow](#9-complete-user-flow)

---

## 1. Application Entry Point

### 📄 File: `index.html`

**Location**: Root directory  
**Purpose**: HTML template that loads the React application

**What happens here:**

- Defines the basic HTML structure
- Contains `<div id="root">` where React will mount
- Loads `main.jsx` as a module script
- Sets dark background color (#212121)

**Flow**: Browser loads → Reads HTML → Executes main.jsx

---

### 📄 File: `src/main.jsx`

**Location**: `src/main.jsx`  
**Purpose**: React application entry point - First JavaScript file that runs

**Code Flow:**

```javascript
1. Import React and ReactDOM
2. Import global styles (index.css)
3. Import App component
4. Import AuthProvider (authentication context)
5. Create React root
6. Render App wrapped in AuthProvider
```

**What happens:**

- Creates the React root in the DOM
- Wraps entire app in `<StrictMode>` for development checks
- Wraps app in `<AuthProvider>` to provide authentication context globally
- Renders the `<App />` component

**Next Step**: → Goes to `App.jsx`

---

## 2. Global Styles Setup

### 📄 File: `src/index.css`

**Location**: `src/index.css`  
**Purpose**: Global CSS styles applied to entire application

**What it does:**

- Imports Tailwind CSS
- Resets all margins/padding (universal reset)
- Sets body background to #212121 (dark theme)
- Sets body height/width to 100vh/100vw
- Sets white text color
- Sets font family
- Prevents body overflow

**Applied to**: Entire application (inherited by all components)

**Next Step**: → Styles are now active, App.jsx loads

---

## 3. Authentication Context

### 📄 File: `src/contexts/AuthContext.jsx`

**Location**: `src/contexts/AuthContext.jsx`  
**Purpose**: Provides authentication state to entire application

**Flow:**

```javascript
1. Creates AuthContext using createContext()
2. AuthProvider component:
   - Checks sessionStorage for existing user on mount
   - Provides login(), signup(), logout() functions
   - Manages user state globally
3. useAuth() hook - allows any component to access auth state
```

**Key Functions:**

- `login(email, password)` - Authenticates user
- `signup(email, password, name)` - Creates new user
- `logout()` - Clears session
- Returns: `{ user, isAuthenticated, loading, login, signup, logout }`

**Uses**: `src/services/authService.js` for actual authentication logic

**Next Step**: → App.jsx uses this context

---

## 4. Main Application Component

### 📄 File: `src/App.jsx`

**Location**: `src/App.jsx`  
**Purpose**: Main orchestrator - decides what to show based on authentication

**Flow:**

```javascript
1. Uses useAuth() hook to get authentication state
2. Uses useState for:
   - messages (current conversation messages)
   - conversations (list of all conversations)
   - activeConversation (currently selected conversation)
   - isLoadingAI (loading state for AI responses)
   - isSidebarOpen (controls mobile drawer visibility)

3. useEffect: Loads conversations from localStorage when user logs in

4. Conditional Rendering:
   IF loading → Show spinner
   IF not authenticated → Show LandingPage
   IF authenticated → Show Chat Interface:
     - Sidebar (with drawer state)
     - Overlay (if drawer open on mobile)
     - Hamburger menu button (mobile only)
     - ChatArea + InputArea
```

**Key Functions:**

- `handleSendMessage(text)` - Sends message, gets AI response, saves to localStorage
- `handleNewChat()` - Creates new conversation, closes drawer on mobile
- `handleSelectConversation(id)` - Switches between conversations, closes drawer on mobile
- `handleClearAll()` - Clears all conversation history with confirmation

**Mobile Features:**

- **Drawer State**: `isSidebarOpen` controls sidebar visibility
- **Hamburger Button**: Fixed top-left button (mobile only) to open drawer
- **Overlay**: Dark overlay appears when drawer is open (mobile only)
- **Auto-Close**: Drawer closes automatically when selecting conversation or creating new chat

**Uses Services:**

- `geminiService.js` - For AI responses
- `conversationService.js` - For saving/loading conversations

**Renders Components:**

- `LandingPage` (if not authenticated)
- `Sidebar` + `ChatArea` + `InputArea` (if authenticated)

**Next Step**: → Based on auth state, goes to LandingPage OR Chat Interface

---

## 5. Landing Page (Public)

### 📄 File: `src/components/LandingPage.jsx`

**Location**: `src/components/LandingPage.jsx`  
**Purpose**: Public landing page shown before authentication

**Flow:**

```javascript
1. Shows header with logo and Login/Signup buttons
2. Shows main content with "What can I help with?" title
3. Shows input area with action buttons (Attach, Search, Study)
4. Manages modal state for authentication forms
5. When Login/Signup clicked → Opens modal with form
```

**State Management:**

- `showAuthModal` - Controls modal visibility
- `authMode` - "login" or "signup" to determine which form to show

**Renders Components:**

- `Login.jsx` (in modal when authMode === "login")
- `Signup.jsx` (in modal when authMode === "signup")

**CSS**: `src/components/LandingPage.css`

**Next Step**: → User clicks Login/Signup → Modal opens with form

---

## 6. Authentication Components

### 📄 File: `src/components/Login.jsx`

**Location**: `src/components/Login.jsx`  
**Purpose**: Login form component

**Flow:**

```javascript
1. User enters email and password
2. On submit:
   - Validates fields are filled
   - Calls login() from AuthContext
   - AuthContext calls authService.login()
   - authService checks localStorage for user
   - If valid → Sets session in sessionStorage
   - Closes modal
   - App.jsx detects isAuthenticated = true
   - Shows chat interface
```

**State:**

- `email`, `password` - Form inputs
- `error` - Error message to display
- `loading` - Loading state during login

**Uses**: `useAuth()` hook from AuthContext

**CSS**: `src/components/Auth.css` (shared with Signup)

**Next Step**: → On success → App.jsx shows chat interface

---

### 📄 File: `src/components/Signup.jsx`

**Location**: `src/components/Signup.jsx`  
**Purpose**: Registration form component

**Flow:**

```javascript
1. User enters name, email, password, confirmPassword
2. On submit:
   - Validates all fields
   - Checks password match
   - Checks password length (min 6 chars)
   - Calls signup() from AuthContext
   - AuthContext calls authService.signup()
   - authService saves user to localStorage
   - Sets session in sessionStorage
   - Closes modal
   - App.jsx detects isAuthenticated = true
   - Shows chat interface
```

**State:**

- `name`, `email`, `password`, `confirmPassword` - Form inputs
- `error` - Error message
- `loading` - Loading state

**Uses**: `useAuth()` hook from AuthContext

**CSS**: `src/components/Auth.css` (shared with Login)

**Next Step**: → On success → App.jsx shows chat interface

---

## 7. Chat Interface Components

### 📄 File: `src/components/Sidebar.jsx`

**Location**: `src/components/Sidebar.jsx`  
**Purpose**: Left sidebar with conversation list and user profile

**Flow:**

```javascript
1. Receives props: conversations, activeConversation, callbacks, isOpen, onClose
2. Shows "New chat" button at top
3. Shows close button (X) on mobile to close drawer
4. Maps through conversations array → Shows list
5. Highlights active conversation
6. Shows user profile at bottom with dropdown
7. Dropdown shows: Logout option
8. Shows "Clear All" button if conversations exist
9. On mobile: Slides in/out based on isOpen prop
10. On desktop: Always visible
```

**State:**

- `showDropdown` - Controls user dropdown visibility

**Functions:**

- `getFirstLetter()` - Extracts first letter of user's first name for avatar
- Click handlers for conversation selection, new chat, clear all, logout

**Props:**

- `isOpen` - Boolean - Controls drawer visibility on mobile
- `onClose()` - Callback to close drawer on mobile

**CSS**: `src/components/Sidebar.css`

**Mobile Features:**

- **Drawer Mode**: Hidden by default on mobile (≤768px), slides in when opened
- **Fixed Position**: Overlays content on mobile
- **Close Button**: X button visible only on mobile
- **Smooth Animation**: 0.3s slide-in/out transition
- **Auto-Close**: Closes when selecting conversation or creating new chat

**Next Step**: → User clicks conversation → App.jsx loads messages

---

### 📄 File: `src/components/ChatArea.jsx`

**Location**: `src/components/ChatArea.jsx`  
**Purpose**: Main chat display area

**Flow:**

```javascript
1. Receives messages array and isLoadingAI prop
2. IF messages.length === 0:
   - Shows empty state with icon and "How can I help you today?"
3. ELSE:
   - Maps through messages → Renders ChatMessage for each
   - Shows typing indicator if isLoadingAI === true
```

**Renders Components:**

- `ChatMessage.jsx` - For each message

**CSS**: `src/components/ChatArea.css`

**Mobile Features:**

- **Reduced Padding**: 16px on mobile vs 24px on desktop
- **Top Padding**: Extra padding-top (72px) for hamburger menu button
- **Optimized Spacing**: Smaller gap between messages (16px vs 24px)

**Next Step**: → Each message renders as ChatMessage component

---

### 📄 File: `src/components/ChatMessage.jsx`

**Location**: `src/components/ChatMessage.jsx`  
**Purpose**: Individual message bubble component

**Flow:**

```javascript
1. Receives message object: { id, text, sender, timestamp }
2. Determines if message is from user or AI
3. Renders:
   - Avatar (U for user, AI icon for AI)
   - Message text in styled bubble
   - Different styling for user (right) vs AI (left)
```

**CSS**: `src/components/ChatMessage.css`

**Next Step**: → Message displayed in chat

---

### 📄 File: `src/components/InputArea.jsx`

**Location**: `src/components/InputArea.jsx`  
**Purpose**: Message input bar at bottom

**Flow:**

```javascript
1. User types message in textarea
2. On Enter (without Shift) → Submits form
3. On Shift+Enter → New line
4. Calls onSendMessage(text) prop function
5. Clears input after sending
6. Disabled when isLoadingAI === true
```

**State:**

- `input` - Current input value

**CSS**: `src/components/InputArea.css`

**Mobile Features:**

- **Reduced Padding**: 12px on mobile vs 16px on desktop
- **Full Width**: Input form takes full width on mobile
- **Touch Optimized**: Properly sized buttons and inputs for mobile

**Next Step**: → Calls App.jsx handleSendMessage() → Sends to Gemini API

---

## 8. Services Layer

### 📄 File: `src/services/authService.js`

**Location**: `src/services/authService.js`  
**Purpose**: Handles user authentication and localStorage operations

**Functions:**

**`getUsers()`**

- Reads from localStorage key: `"chatgpt_clone_users"`
- Returns array of all users
- Returns empty array if none exist

**`signup(email, password, name)`**

- Gets all users
- Checks if email already exists
- Creates new user object with: `{ id, email, password, name, createdAt }`
- Saves to localStorage
- Returns user without password

**`login(email, password)`**

- Gets all users
- Finds user by email
- Validates password
- Returns user without password
- Throws error if not found or invalid password

**`getCurrentUser()`**

- Reads from sessionStorage key: `"current_user"`
- Returns user object or null

**`setCurrentUser(user)`**

- Saves user to sessionStorage
- Removes if user is null

**`logout()`**

- Removes current_user from sessionStorage

**Storage:**

- **localStorage**: All users data (persistent)
- **sessionStorage**: Current logged-in user (session only)

**Used by**: `AuthContext.jsx`

---

### 📄 File: `src/services/conversationService.js`

**Location**: `src/services/conversationService.js`  
**Purpose**: Handles conversation and message storage in localStorage

**Storage Key Format**: `chatgpt_clone_conversations_{userId}`

**Functions:**

**`getConversations(userId)`**

- Reads conversations from localStorage for specific user
- Returns array of conversations
- Returns empty array if none exist

**`createConversation(userId, title)`**

- Creates new conversation object: `{ id, title, messages, createdAt, updatedAt }`
- Adds to beginning of conversations array
- Saves to localStorage
- Returns new conversation

**`addMessage(userId, conversationId, message)`**

- Finds conversation by ID
- Creates message object: `{ id, text, sender, timestamp }`
- Adds to conversation.messages array
- Updates conversation.updatedAt
- Auto-generates title from first user message
- Saves to localStorage
- Returns new message

**`getMessages(userId, conversationId)`**

- Gets conversation by ID
- Returns messages array or empty array

**`clearAllConversations(userId)`**

- Removes all conversations from localStorage for user

**Data Structure:**

```json
[
  {
    "id": 1234567890,
    "title": "What is React?",
    "messages": [
      {
        "id": 1234567891,
        "text": "What is React?",
        "sender": "user",
        "timestamp": "2024-01-01T12:00:00.000Z"
      },
      {
        "id": 1234567892,
        "text": "React is...",
        "sender": "ai",
        "timestamp": "2024-01-01T12:00:01.000Z"
      }
    ],
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:01.000Z"
  }
]
```

**Used by**: `App.jsx`

---

### 📄 File: `src/services/geminiService.js`

**Location**: `src/services/geminiService.js`  
**Purpose**: Handles Google Gemini AI API calls

**Functions:**

**`getGeminiClient()`**

- Gets API key from environment variable or fallback
- Creates and returns GoogleGenAI client instance

**`generateAIResponse(userMessage, conversationHistory)`**

- Gets Gemini client
- Builds conversation context from history
- Calls Gemini API with model: "gemini-2.5-flash"
- Extracts response text
- Returns AI response string
- Handles errors gracefully

**API Key:**

- Reads from: `import.meta.env.VITE_GEMINI_API_KEY`
- Fallback: Hardcoded key (for development)

**Used by**: `App.jsx` → `handleSendMessage()`

---

## 9. Complete User Flow

### 🔄 Complete Application Flow Diagram

```
1. Browser loads index.html
   ↓
2. main.jsx executes
   - Creates React root
   - Wraps App in AuthProvider
   ↓
3. AuthContext initializes
   - Checks sessionStorage for existing user
   - Sets user state
   ↓
4. App.jsx renders
   - Checks isAuthenticated from AuthContext
   ↓
   ├─ IF NOT AUTHENTICATED:
   │   ↓
   │   5a. LandingPage renders
   │      - Shows header with Login/Signup buttons
   │      - Shows main content
   │      ↓
   │   6a. User clicks Login/Signup
   │      - Opens modal
   │      - Shows Login.jsx or Signup.jsx
   │      ↓
   │   7a. User submits form
   │      - Login/Signup calls authService
   │      - authService saves to localStorage
   │      - Sets sessionStorage
   │      - AuthContext updates user state
   │      - App.jsx detects isAuthenticated = true
   │      ↓
   │   → Goes to Chat Interface
   │
   └─ IF AUTHENTICATED:
       ↓
       5b. Chat Interface renders
          - Sidebar (conversations list)
          - ChatArea (messages display)
          - InputArea (message input)
          ↓
       6b. App.jsx useEffect runs
          - Loads conversations from localStorage
          - Sets active conversation
          - Loads messages
          ↓
       7b. User sends message
          - InputArea calls handleSendMessage()
          - App.jsx saves user message to localStorage
          - App.jsx calls geminiService.generateAIResponse()
          - Gemini API returns response
          - App.jsx saves AI response to localStorage
          - ChatArea displays both messages
          ↓
       8b. User creates new chat
          - Sidebar calls handleNewChat()
          - App.jsx creates new conversation in localStorage
          - Switches to new conversation
          ↓
       9b. User switches conversation
          - Sidebar calls handleSelectConversation()
          - App.jsx loads messages from localStorage
          - Displays messages in ChatArea
          ↓
       10b. User clears all
           - Sidebar calls handleClearAll()
           - App.jsx clears localStorage
           - Creates new empty conversation
```

---

## 🔗 Component Dependency Tree

```
main.jsx
  └─ AuthProvider (AuthContext.jsx)
      └─ App.jsx
          ├─ LandingPage.jsx (if not authenticated)
          │   ├─ Login.jsx (in modal)
          │   └─ Signup.jsx (in modal)
          │
          └─ Chat Interface (if authenticated)
              ├─ Sidebar.jsx
              │   └─ Uses: useAuth() hook
              │
              ├─ ChatArea.jsx
              │   └─ ChatMessage.jsx (for each message)
              │
              └─ InputArea.jsx
```

---

## 🔄 Data Flow

### Authentication Flow:

```
User Input → Login/Signup Component
  → AuthContext.login/signup()
    → authService.login/signup()
      → localStorage (save user)
      → sessionStorage (set current user)
        → AuthContext updates state
          → App.jsx detects change
            → Shows Chat Interface
```

### Message Flow:

```
User types message → InputArea
  → App.jsx.handleSendMessage()
    → conversationService.addMessage() (save user message)
      → localStorage
    → geminiService.generateAIResponse()
      → Google Gemini API
        → Returns AI response
    → conversationService.addMessage() (save AI response)
      → localStorage
    → Update state
      → ChatArea re-renders
        → ChatMessage displays both messages
```

### Conversation Flow:

```
User clicks conversation → Sidebar
  → App.jsx.handleSelectConversation()
    → conversationService.getMessages()
      → Reads from localStorage
        → Updates messages state
          → ChatArea displays messages
```

---

## 📦 Storage Structure

### localStorage Keys:

1. **`chatgpt_clone_users`**

   - Type: JSON string
   - Contains: Array of all registered users
   - Structure:
     ```json
     [
       {
         "id": "1234567890",
         "email": "user@example.com",
         "password": "password123",
         "name": "John Doe",
         "createdAt": "2024-01-01T00:00:00.000Z"
       }
     ]
     ```

2. **`chatgpt_clone_conversations_{userId}`**
   - Type: JSON string
   - Contains: Array of conversations for specific user
   - Structure: See conversationService.js documentation above

### sessionStorage Keys:

1. **`current_user`**
   - Type: JSON string
   - Contains: Currently logged-in user (without password)
   - Structure:
     ```json
     {
       "id": "1234567890",
       "email": "user@example.com",
       "name": "John Doe",
       "createdAt": "2024-01-01T00:00:00.000Z"
     }
     ```

---

## 🎯 Key Concepts Explained

### 1. **Context API (AuthContext)**

- Provides global state without prop drilling
- Any component can access auth state using `useAuth()` hook
- Updates propagate to all consuming components

### 2. **localStorage vs sessionStorage**

- **localStorage**: Persists across browser sessions (permanent)
- **sessionStorage**: Clears when browser tab closes (temporary)
- Users stored in localStorage (permanent)
- Current session stored in sessionStorage (temporary)

### 3. **Component Props Flow**

- Parent → Child: Data flows down via props
- Child → Parent: Callbacks passed as props
- Example: `App.jsx` passes `onSendMessage` to `InputArea.jsx`

### 4. **State Management**

- **Local State**: `useState` for component-specific data
- **Global State**: `useContext` for shared data (auth)
- **Persistent State**: localStorage for data that survives refreshes

### 5. **Effect Hooks**

- `useEffect` runs after render
- Used for: Loading data, setting up subscriptions, cleanup
- Example: Loading conversations when user logs in

### 6. **Mobile Responsiveness**

- **Breakpoint**: 768px (mobile/tablet vs desktop)
- **Mobile Drawer**: Sidebar hidden by default, slides in when opened
- **CSS Media Queries**: `@media (max-width: 768px)` for mobile styles
- **Fixed Positioning**: Sidebar uses fixed position on mobile for overlay effect
- **Full Width**: Chat area takes 100% width on mobile
- **Touch Optimized**: Larger touch targets, optimized spacing

---

## 📱 Mobile Responsiveness

### Responsive Breakpoints

- **Mobile**: ≤768px - Drawer mode, full-width layout
- **Desktop**: >768px - Sidebar always visible, side-by-side layout

### Mobile Features

1. **Drawer Sidebar** (`src/components/Sidebar.jsx`)

   - Hidden by default on mobile
   - Slides in from left when hamburger button clicked
   - Fixed position overlay
   - Close button (X) visible only on mobile
   - Auto-closes when selecting conversation or creating new chat

2. **Hamburger Menu** (`src/App.jsx`)

   - Fixed top-left button (mobile only)
   - Opens sidebar drawer
   - Styled to match dark theme

3. **Overlay** (`src/App.css`)

   - Dark semi-transparent overlay
   - Appears when drawer is open
   - Clicking overlay closes drawer
   - Mobile only (hidden on desktop)

4. **Full-Width Chat** (`src/App.css`)

   - Main content takes 100% width on mobile
   - No sidebar taking up space
   - Optimized padding for mobile screens

5. **Mobile Optimizations**
   - Reduced padding in chat area (16px vs 24px)
   - Smaller message bubbles (90% width vs 85%)
   - Adjusted font sizes (14px vs 15px)
   - Touch-friendly button sizes

### CSS Implementation

**Sidebar.css:**

```css
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%); /* Hidden by default */
  }
  .sidebar.sidebar-open {
    transform: translateX(0); /* Slides in when open */
  }
}
```

**App.css:**

```css
@media (max-width: 768px) {
  .main-content {
    width: 100%; /* Full width */
    margin-left: 0; /* No sidebar margin */
  }
  .mobile-menu-btn {
    display: flex; /* Show hamburger button */
  }
}
```

---

## 🚀 How to Understand the Codebase

### Step 1: Start with Entry Point

- Read `index.html` → `main.jsx`
- Understand how React app initializes

### Step 2: Follow Authentication Flow

- Read `AuthContext.jsx` → `authService.js`
- Understand how users are stored and authenticated

### Step 3: Understand Main App Logic

- Read `App.jsx` thoroughly
- See how it decides what to render
- Understand state management

### Step 4: Study Components

- Start with `LandingPage.jsx` (simpler)
- Then `Sidebar.jsx`, `ChatArea.jsx`, `InputArea.jsx`
- See how they receive props and call callbacks

### Step 5: Understand Services

- Read `authService.js` - User storage
- Read `conversationService.js` - Message storage
- Read `geminiService.js` - AI integration

### Step 6: Trace a Complete Flow

- Pick a user action (e.g., "Send a message")
- Trace through all files involved
- See how data flows and state updates

---

## 📝 Quick Reference

### File Execution Order:

1. `index.html` - HTML loads
2. `main.jsx` - React initializes
3. `index.css` - Global styles applied
4. `AuthContext.jsx` - Auth context created
5. `App.jsx` - Main component renders
6. Components render based on auth state

### Key Imports to Remember:

- `useAuth()` - Get authentication state (from AuthContext)
- `authService` - User authentication functions
- `conversationService` - Conversation/message storage
- `geminiService` - AI response generation

### Common Patterns:

- **Props Down, Events Up**: Data flows down, events flow up
- **Context for Global State**: Use Context API for shared state
- **localStorage for Persistence**: Save data that should survive refreshes
- **useEffect for Side Effects**: Load data, set up subscriptions

---

## 🎓 Learning Path

1. **Beginner**: Start with `main.jsx` → `App.jsx` → Simple components
2. **Intermediate**: Understand Context API → Services → Data flow
3. **Advanced**: Trace complete flows → Optimize → Add features

---

**This documentation provides a complete understanding of how every file connects and works together in the application flow.**

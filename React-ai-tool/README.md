# React AI Tool - ChatGPT Clone

A modern, full-featured ChatGPT clone built with React and Vite. This application provides a complete chat interface with user authentication, conversation management, and a beautiful dark-themed UI.

## 📖 Documentation

- **[PROJECT_FLOW.md](./PROJECT_FLOW.md)** - **Complete step-by-step flow documentation** - Explains the entire project file by file, showing how everything connects and works together. **Start here if you want to understand the complete flow!**
- **[GEMINI_SETUP.md](./GEMINI_SETUP.md)** - Setup guide for Google Gemini AI integration

## 🚀 Features

### Authentication System

- **User Registration (Signup)**: Create new accounts with name, email, and password
- **User Login**: Secure authentication with email and password
- **Session Management**: Persistent login sessions using sessionStorage
- **User Profile**: Display user information with first name initial avatar
- **Logout**: Secure logout functionality with dropdown menu

### Chat Interface

- **ChatGPT-like Layout**: Modern sidebar navigation with main chat area
- **Message Display**: User and AI messages with distinct styling
- **Real-time Messaging**: Send and receive messages with smooth UI updates
- **AI Integration**: Powered by Google Gemini AI (gemini-2.5-flash model)
- **Conversation Management**: Create and switch between multiple conversations
- **Empty State**: Beautiful welcome screen when no messages exist
- **Conversation History**: Maintains context across messages in a conversation

### Landing Page

- **Public Landing Page**: Accessible before authentication
- **Header Navigation**: Login and Signup buttons in top-right corner
- **Modal Authentication**: Login/Signup forms in elegant modal overlays
- **Interactive Input**: Action buttons (Attach, Search, Study) and voice input button
- **Login Prompt**: Toast notification appears when clicking input area while logged out, prompting users to login first
- **Smart Input Handling**: Input field is read-only when logged out, with click-to-login functionality

### UI/UX Features

- **Dark Theme**: Modern dark color scheme (#212121 background)
- **Responsive Design**: Fully optimized for mobile and desktop
- **Mobile Drawer Sidebar**: Sidebar slides in/out on mobile devices (≤768px)
- **Full-Width Mobile Chat**: Chat area uses full screen width on mobile
- **Hamburger Menu**: Easy access to sidebar on mobile devices
- **Smooth Animations**: Transitions and hover effects throughout
- **Custom Scrollbars**: Styled scrollbars for better aesthetics
- **Loading States**: Spinner animations during authentication
- **Touch-Optimized**: Mobile-friendly touch targets and spacing
- **Responsive Toast Notifications**: Mobile-optimized login prompts with adaptive layouts

## 🛠️ Technologies Used

### Core Technologies

- **React 19.2.0**: Modern React with hooks
- **Vite 7.2.4**: Fast build tool and dev server
- **JavaScript (ES6+)**: Modern JavaScript features
- **Google Gemini AI**: AI-powered chat responses via @google/genai SDK

### Styling

- **Tailwind CSS**: Utility-first CSS framework (via @import)
- **Custom CSS**: Component-specific styling files
- **CSS Modules**: Scoped component styles

### State Management

- **React Context API**: Authentication state management
- **React Hooks**: useState, useEffect, useRef, useContext

### Data Storage

- **localStorage**: Persistent user data storage (JSON format)
  - User accounts and registration data
  - All conversations and messages per user
- **sessionStorage**: Current user session management
  - Active user session (cleared on browser close)

### Mobile Optimization

- **Responsive Breakpoint**: 768px (mobile/tablet vs desktop)
- **Drawer Navigation**: Sidebar hidden by default on mobile, slides in when needed
- **Full-Width Layout**: Chat area takes full width on mobile for better readability
- **Auto-Close Drawer**: Sidebar automatically closes after selecting conversation or creating new chat
- **Overlay**: Dark overlay appears when drawer is open on mobile
- **Touch-Friendly**: Optimized button sizes and spacing for mobile interaction

## 📁 Project Structure

```
React-ai-tool/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Auth.css              # Authentication form styles
│   │   ├── ChatArea.css          # Chat area container styles
│   │   ├── ChatArea.jsx          # Main chat display component
│   │   ├── ChatMessage.css       # Individual message styles
│   │   ├── ChatMessage.jsx       # Message bubble component
│   │   ├── InputArea.css         # Input bar styles
│   │   ├── InputArea.jsx         # Message input component
│   │   ├── LandingPage.css       # Landing page styles
│   │   ├── LandingPage.jsx      # Public landing page
│   │   ├── Login.jsx             # Login form component
│   │   ├── Sidebar.css           # Sidebar navigation styles
│   │   ├── Sidebar.jsx           # Sidebar with conversations
│   │   └── Signup.jsx            # Signup form component
│   ├── contexts/
│   │   └── AuthContext.jsx       # Authentication context provider
│   ├── services/
│   │   ├── authService.js        # Authentication service (localStorage)
│   │   ├── conversationService.js # Conversation & message storage service
│   │   └── geminiService.js      # Google Gemini AI integration service
│   ├── App.css                   # Main app styles
│   ├── App.jsx                   # Root application component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

## 🎨 Component Details

### Core Components

#### `src/App.jsx`

**Purpose**: Main application component that orchestrates the entire app flow.

**Functionality**:

- Root component that manages application state
- Handles authentication routing (shows LandingPage if not authenticated, chat interface if authenticated)
- Manages conversations and messages state
- Coordinates between Sidebar, ChatArea, and InputArea components
- **Mobile Drawer Management**: Controls sidebar visibility on mobile devices
- **Hamburger Menu**: Renders mobile menu button to open sidebar
- **Overlay Control**: Manages overlay when drawer is open on mobile
- Integrates with Gemini AI for real-time responses

**State Management**:

- `messages`: Array of message objects `[{ id, text, sender, timestamp }]`
- `conversations`: Array of conversation objects `[{ id, title, messages }]`
- `activeConversation`: ID of currently active conversation
- `isLoadingAI`: Boolean - Loading state for AI responses
- `isSidebarOpen`: Boolean - Controls mobile drawer visibility

**Key Functions**:

- `handleSendMessage(text)`: Sends message, gets AI response, saves to localStorage
- `handleNewChat()`: Creates new conversation, resets messages, closes drawer on mobile
- `handleSelectConversation(id)`: Loads conversation, closes drawer on mobile
- `handleClearAll()`: Clears all conversations with confirmation

**Props**: None (uses `useAuth` hook from context)

**Dependencies**:

- `useState` from React
- `useAuth` from AuthContext
- Components: Sidebar, ChatArea, InputArea, LandingPage

**CSS File**: `src/App.css`

---

#### `src/components/LandingPage.jsx`

**Purpose**: Public landing page displayed before user authentication.

**Functionality**:

- Displays public-facing landing page with header and main content
- Header contains logo and authentication buttons (Login/Signup)
- Main content shows welcome message and input area with action buttons
- Manages modal state for authentication forms
- Handles switching between login and signup modals

**State Management**:

- `showAuthModal`: Boolean to control modal visibility
- `authMode`: String ("login" or "signup") to determine which form to show
- `showLoginPrompt`: Boolean to control login prompt toast visibility

**Key Functions**:

- Modal open/close handlers
- Mode switching between login and signup
- Login prompt display when clicking input area while logged out
- Auto-dismiss login prompt after 3 seconds

**Props**: None

**Dependencies**:

- `useState` from React
- Components: Login, Signup

**CSS File**: `src/components/LandingPage.css`

**Features**:

- Click outside modal to close
- Close button (X) in modal
- Action buttons: Attach, Search, Study (currently non-functional)
- Voice input button (currently non-functional)
- **Login Prompt Toast**: Appears when clicking input-container while logged out
  - Shows informative message: "Please login first to continue"
  - Includes direct "Login" button to open login modal
  - Auto-dismisses after 3 seconds
  - Fully responsive with mobile-optimized layout
  - Smooth slide-up animation
- **Smart Input Handling**: Input field is read-only when logged out
- **Click-to-Login**: Clicking anywhere on input-container triggers login prompt

---

#### `src/components/Sidebar.jsx`

**Purpose**: Left navigation sidebar with conversation list and user profile.

**Functionality**:

- Displays "New chat" button at top
- Shows list of all conversations
- Highlights active conversation
- User profile section at bottom with avatar (first letter of first name)
- Dropdown menu on user profile click with logout option
- Handles conversation selection
- **Mobile Drawer**: Slides in/out on mobile devices (≤768px)
- **Close Button**: X button to close drawer (mobile only)

**State Management**:

- `showDropdown`: Boolean to control user dropdown visibility
- Uses `useRef` for dropdown element reference

**Key Functions**:

- `getFirstLetter()`: Extracts first letter of user's first name (splits by space, takes first part)
- `handleClickOutside`: Closes dropdown when clicking outside (via useEffect)

**Props**:

- `conversations`: Array of conversation objects
- `activeConversation`: ID of active conversation
- `onSelectConversation(id)`: Callback when conversation is clicked
- `onNewChat()`: Callback when "New chat" button is clicked
- `onClearAll()`: Callback to clear all conversations
- `isOpen`: Boolean - Controls drawer visibility on mobile
- `onClose()`: Callback to close drawer on mobile

**Dependencies**:

- `useState`, `useEffect`, `useRef` from React
- `useAuth` from AuthContext

**CSS File**: `src/components/Sidebar.css`

**Features**:

- Click outside to close dropdown
- Animated dropdown appearance
- User avatar shows first letter of first name
- Fallback to email first letter or "U" if no name
- **Mobile Drawer Mode**: Hidden by default on mobile, slides in when opened
- **Close Button**: X button visible only on mobile to close drawer
- **Responsive**: Fixed position on mobile, relative on desktop
- **Smooth Animation**: Slide-in/out transition (0.3s ease-in-out)
- **Auto-Close**: Closes automatically when selecting conversation or creating new chat

---

#### `src/components/ChatArea.jsx`

**Purpose**: Main chat display area that shows messages or empty state.

**Functionality**:

- Displays empty state when no messages exist
- Renders list of messages when messages array has items
- Scrollable container for message list
- Centers content with max-width constraint

**Props**:

- `messages`: Array of message objects `[{ id, text, sender, timestamp }]`

**Dependencies**:

- Component: ChatMessage

**CSS File**: `src/components/ChatArea.css`

**Features**:

- Empty state with icon and welcome message
- Scrollable message container
- Custom scrollbar styling
- Max-width centered layout (768px)
- **Mobile Optimized**: Reduced padding and spacing on mobile
- **Top Padding**: Extra padding-top on mobile for hamburger menu button

---

#### `src/components/ChatMessage.jsx`

**Purpose**: Individual message bubble component for displaying chat messages.

**Functionality**:

- Renders single message with avatar and text
- Different styling for user vs AI messages
- User messages: right-aligned, gray background
- AI messages: left-aligned, darker background
- Different avatars for user (letter "U") and AI (SVG icon)

**Props**:

- `message`: Message object `{ id, text, sender, timestamp }`
  - `sender`: "user" or "ai"

**Dependencies**: None

**CSS File**: `src/components/ChatMessage.css`

**Features**:

- Conditional rendering based on sender type
- Avatar display (user shows "U", AI shows stack icon)
- Responsive message width (max 85% of container, 90% on mobile)
- Proper text wrapping and word break
- **Mobile Optimized**: Smaller padding and font size on mobile devices

---

#### `src/components/InputArea.jsx`

**Purpose**: Bottom input bar for typing and sending messages.

**Functionality**:

- Textarea for typing messages
- Send button (disabled when input is empty)
- Form submission handling
- Keyboard shortcuts: Enter to send, Shift+Enter for new line
- Footer disclaimer text

**State Management**:

- `input`: String value of textarea input

**Key Functions**:

- `handleSubmit(e)`: Prevents default, sends message if not empty, clears input
- `handleKeyDown(e)`: Handles Enter key (send) vs Shift+Enter (new line)

**Props**:

- `onSendMessage(text)`: Callback function called when message is sent

**Dependencies**:

- `useState` from React

**CSS File**: `src/components/InputArea.css`

**Features**:

- Auto-resizing textarea (max-height: 200px)
- Send button disabled state styling
- Footer disclaimer text
- Focus border color change
- **Mobile Optimized**: Reduced padding on mobile devices
- **Full Width**: Input form takes full width on mobile

---

#### `src/components/Login.jsx`

**Purpose**: Login form component for user authentication.

**Functionality**:

- Email and password input fields
- Form validation (checks if fields are filled)
- Error message display
- Loading state during authentication
- Switch to signup form option
- Closes modal on successful login

**State Management**:

- `email`: String - user email input
- `password`: String - user password input
- `error`: String - error message to display
- `loading`: Boolean - loading state during login

**Key Functions**:

- `handleSubmit(e)`: Validates inputs, calls login service, handles success/error

**Props**:

- `onSwitchToSignup()`: Callback to switch to signup form
- `onClose()`: Callback to close modal (called on successful login)

**Dependencies**:

- `useState` from React
- `useAuth` from AuthContext

**CSS File**: `src/components/Auth.css` (shared with Signup)

**Features**:

- Form validation
- Error handling with user-friendly messages
- Loading state with disabled inputs
- Link to switch to signup

---

#### `src/components/Signup.jsx`

**Purpose**: Registration form component for new user signup.

**Functionality**:

- Name, email, password, and confirm password input fields
- Form validation:
  - Checks all fields are filled
  - Validates password match
  - Validates minimum password length (6 characters)
- Error message display
- Loading state during registration
- Switch to login form option
- Closes modal on successful signup

**State Management**:

- `name`: String - user name input
- `email`: String - user email input
- `password`: String - user password input
- `confirmPassword`: String - password confirmation input
- `error`: String - error message to display
- `loading`: Boolean - loading state during signup

**Key Functions**:

- `handleSubmit(e)`: Validates all inputs, checks password match and length, calls signup service

**Props**:

- `onSwitchToLogin()`: Callback to switch to login form
- `onClose()`: Callback to close modal (called on successful signup)

**Dependencies**:

- `useState` from React
- `useAuth` from AuthContext

**CSS File**: `src/components/Auth.css` (shared with Login)

**Features**:

- Comprehensive form validation
- Password confirmation matching
- Minimum password length validation
- Error handling with specific error messages
- Loading state with disabled inputs
- Link to switch to login

---

### Context & Services

#### `src/contexts/AuthContext.jsx`

**Purpose**: React Context provider for global authentication state management.

**Functionality**:

- Provides authentication state to entire application
- Manages current user state
- Provides login, signup, and logout functions
- Handles session persistence (checks sessionStorage on mount)
- Manages loading states

**Exports**:

- `AuthProvider`: Context provider component
- `useAuth`: Custom hook to access auth context

**State Management**:

- `user`: Object - current authenticated user (null if not logged in)
- `loading`: Boolean - initial loading state while checking session

**Key Functions**:

- `login(email, password)`: Authenticates user, sets session, updates state
  - Returns: `{ success: boolean, user?: object, error?: string }`
- `signup(email, password, name)`: Creates new user, sets session, updates state
  - Returns: `{ success: boolean, user?: object, error?: string }`
- `logout()`: Clears session and user state

**Context Value**:

```javascript
{
  user: object | null,
  login: function,
  signup: function,
  logout: function,
  isAuthenticated: boolean,
  loading: boolean
}
```

**Dependencies**:

- `createContext`, `useContext`, `useState`, `useEffect` from React
- `authService` functions: getCurrentUser, setCurrentUser, login, signup, logout

**Lifecycle**:

- On mount: Checks sessionStorage for existing user session
- Sets loading to false after check completes

---

#### `src/services/authService.js`

**Purpose**: Service layer for authentication operations and localStorage management.

**Functionality**:

- Manages user data storage in localStorage (JSON format)
- Handles user registration (signup)
- Handles user authentication (login)
- Manages current user session in sessionStorage
- Provides utility functions for user data access

**Storage Keys**:

- `"chatgpt_clone_users"`: localStorage key for all users array
- `"current_user"`: sessionStorage key for current user session

**Exported Functions**:

1. **`getUsers()`**

   - Returns: Array of all user objects
   - Reads from localStorage, parses JSON, handles errors

2. **`signup(email, password, name)`**

   - Parameters:
     - `email`: String - user email
     - `password`: String - user password (plain text)
     - `name`: String - user full name
   - Returns: User object without password
   - Functionality:
     - Checks if user already exists (by email)
     - Creates new user object with: `{ id, email, password, name, createdAt }`
     - Saves to localStorage
     - Returns user without password

3. **`login(email, password)`**

   - Parameters:
     - `email`: String - user email
     - `password`: String - user password
   - Returns: User object without password
   - Throws: Error if user not found or invalid password
   - Functionality:
     - Finds user by email
     - Validates password
     - Returns user without password

4. **`getCurrentUser()`**

   - Returns: User object or null
   - Reads from sessionStorage, parses JSON, handles errors

5. **`setCurrentUser(user)`**

   - Parameters: `user` - User object or null
   - Saves user to sessionStorage or removes if null

6. **`logout()`**
   - Removes current user from sessionStorage

**Data Structure**:

```javascript
// User object in localStorage
{
  id: string,           // Timestamp as string
  email: string,
  password: string,      // Plain text (should be hashed in production)
  name: string,
  createdAt: string       // ISO date string
}

// User object returned (without password)
{
  id: string,
  email: string,
  name: string,
  createdAt: string
}
```

**Error Handling**:

- Try-catch blocks for JSON parsing
- Error logging to console
- Throws descriptive errors for invalid operations

**Dependencies**: None (pure JavaScript functions)

**Notes**:

- Passwords stored in plain text (security risk for production)
- Uses Date.now() for user IDs
- Automatically generates name from email if not provided

---

#### `src/services/conversationService.js`

**Purpose**: Service layer for managing conversations and messages in localStorage.

**Functionality**:

- Manages conversation storage per user in localStorage
- Handles message creation and retrieval
- Auto-generates conversation titles from first user message
- Provides conversation management functions

**Storage Key Format**: `chatgpt_clone_conversations_{userId}`

**Exported Functions**:

- `getConversations(userId)`: Retrieves all conversations for a user
- `createConversation(userId, title)`: Creates a new conversation
- `addMessage(userId, conversationId, message)`: Adds a message to a conversation
- `getMessages(userId, conversationId)`: Retrieves all messages for a conversation
- `clearAllConversations(userId)`: Removes all conversations for a user

**Data Structure**:

- Conversations stored as JSON array in localStorage
- Each conversation contains: `{ id, title, messages, createdAt, updatedAt }`
- Each message contains: `{ id, text, sender, timestamp }`

**Used by**: `App.jsx` for conversation and message management

---

#### `src/services/geminiService.js`

**Purpose**: Service layer for Google Gemini AI API integration.

**Functionality**:

- Initializes Google Gemini AI client
- Generates AI responses using conversation context
- Handles API errors gracefully
- Maintains conversation history for context-aware responses

**Exported Functions**:

- `getGeminiClient()`: Creates and returns GoogleGenAI client instance
- `generateAIResponse(userMessage, conversationHistory)`: Generates AI response

**API Configuration**:

- Model: `gemini-2.5-flash`
- API Key: Read from `import.meta.env.VITE_GEMINI_API_KEY` or fallback
- Conversation context: Maintains full conversation history for better responses

**Error Handling**:

- Handles API key errors
- Handles quota/rate limit errors
- Returns user-friendly error messages

**Used by**: `App.jsx` → `handleSendMessage()` function

**Dependencies**: `@google/genai` package

---

### Additional Files

#### `src/main.jsx`

**Purpose**: Application entry point that renders the root component.

**Functionality**:

- Creates React root
- Renders App component wrapped in StrictMode and AuthProvider
- Imports global styles

**Dependencies**:

- `StrictMode` from React
- `createRoot` from react-dom/client
- `App` component
- `AuthProvider` from AuthContext
- `index.css` for global styles

---

#### `src/index.css`

**Purpose**: Global CSS styles and Tailwind CSS import.

**Functionality**:

- Imports Tailwind CSS
- Global reset styles (\* { margin: 0, padding: 0, box-sizing: border-box })
- Body styles (background, height, width, font-family)
- Root element styles

**Styles**:

- Global reset
- Body: #212121 background, 100vh height, white text color
- Root: 100% height and width

---

#### `src/App.css`

**Purpose**: Main application container styles.

**Functionality**:

- Styles for app-container (flex layout)
- Main content area styles
- Loading spinner styles and animation
- **Mobile Responsive Styles**: Drawer overlay, mobile menu button, responsive margins

**Key Classes**:

- `.app-container`: Flex container, full viewport
- `.main-content`: Flex column, overflow hidden, responsive width (full on mobile, adjusted on desktop)
- `.loading-container`: Centered loading state
- `.loading-spinner`: Animated spinner with rotation
- `.sidebar-overlay`: Dark overlay when drawer is open (mobile only)
- `.mobile-menu-btn`: Hamburger menu button (mobile only, fixed top-left)

**Responsive Breakpoints**:

- **Mobile**: ≤768px - Drawer mode, full-width chat area
- **Desktop**: >768px - Sidebar always visible, side-by-side layout

---

#### `index.html`

**Purpose**: HTML template for the application.

**Functionality**:

- Base HTML structure
- Meta tags (charset, viewport)
- Title: "react-ai-tool"
- Root div for React
- Script tag for main.jsx module

**Structure**:

- DOCTYPE html
- Head with meta tags and title
- Body with root div and script

## 🔐 Authentication Flow

1. **Landing Page**: User sees public landing page with login/signup buttons
2. **Signup**:

   - User clicks "Sign up for free"
   - Modal opens with signup form
   - User enters name, email, password, confirm password
   - Data saved to localStorage as JSON
   - User automatically logged in
   - Modal closes, chat interface appears

3. **Login**:

   - User clicks "Log in"
   - Modal opens with login form
   - User enters email and password
   - Credentials validated against localStorage
   - Session created in sessionStorage
   - Modal closes, chat interface appears

4. **Session**:

   - Current user stored in sessionStorage
   - Persists across page refreshes
   - Cleared on logout

5. **Logout**:
   - Click user profile in sidebar
   - Dropdown menu appears
   - Click "Logout"
   - Session cleared, redirected to landing page

## 💾 Data Storage

### User Data (localStorage)

- **Key**: `"chatgpt_clone_users"`
- **Format**: JSON array of user objects
- **Structure**:
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

### Session Data (sessionStorage)

- **Key**: `"current_user"`
- **Format**: JSON object (user without password)
- **Structure**:
  ```json
  {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
  ```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd React-ai-tool
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📝 Usage Instructions

### For New Users

1. **Sign Up**:

   - Click "Sign up for free" button (top right)
   - Fill in name, email, password, and confirm password
   - Click "Sign up"
   - You'll be automatically logged in

2. **Try Input Before Login**:

   - Click on the input area or input field on the landing page
   - A toast notification will appear prompting you to login first
   - Click the "Login" button in the toast to open the login modal
   - Or click "Log in" in the header to access login directly

3. **Start Chatting**:

   - Type your message in the input bar at the bottom
   - Press Enter or click Send button
   - AI response will appear (powered by Google Gemini AI)
   - The AI maintains conversation context for better responses

4. **Create New Chat**:

   - Click "New chat" button in sidebar
   - Start a fresh conversation

5. **Logout**:
   - Click on your user profile (bottom of sidebar)
   - Click "Logout" in the dropdown menu
   - You'll be redirected to the landing page

### For Returning Users

1. **Log In**:

   - Click "Log in" button (top right)
   - Enter email and password
   - Click "Log in"

2. **Continue Chatting**:
   - Your previous conversations appear in sidebar
   - Click on any conversation to view messages
   - Create new chats as needed

### Mobile Usage

1. **Opening Sidebar**:

   - Tap the hamburger menu button (☰) in the top-left corner
   - Sidebar slides in from the left
   - Dark overlay appears behind it

2. **Closing Sidebar**:

   - Tap the X button in the sidebar header
   - Tap anywhere on the dark overlay
   - Sidebar automatically closes when you select a conversation or create a new chat

3. **Mobile Layout**:

   - Chat area uses full screen width
   - Messages are optimized for mobile viewing
   - Input area is touch-friendly

4. **Login Prompt on Mobile**:
   - When logged out, tap the input area on the landing page
   - A mobile-optimized toast notification appears at the bottom
   - On small screens (< 480px), the toast content stacks vertically for better readability
   - Tap "Login" button in the toast to open the login modal

## 🎨 Color Scheme

- **Background**: `#212121` (Dark gray)
- **Sidebar**: `#171717` (Darker gray)
- **Cards/Containers**: `#2a2a2a` (Medium dark)
- **Borders**: `#2f2f2f`, `#3f3f3f` (Subtle borders)
- **Primary Accent**: `#10a37f` (Green/Teal)
- **Text Primary**: `#ececec` (Light gray)
- **Text Secondary**: `#9ca3af` (Medium gray)
- **Toast/Notifications**: `#2a2a2a` background with `#3f3f3f` border

## 🔮 Future Enhancements

- [x] Login prompt when clicking input while logged out
- [ ] Integrate real AI API (OpenAI, Anthropic, etc.)
- [ ] Message persistence per conversation
- [ ] Conversation title generation from first message
- [ ] Message editing and deletion
- [ ] Markdown rendering in messages
- [ ] Code syntax highlighting
- [ ] File attachments
- [ ] Voice input functionality
- [ ] Search functionality
- [ ] Export conversations
- [ ] User settings/preferences
- [ ] Password hashing (bcrypt)
- [ ] Email verification
- [ ] Password reset functionality

## 📄 License

This project is private and for educational purposes.

## 👨‍💻 Development Notes

- Uses React 19 with modern hooks
- No external UI libraries (pure CSS)
- Tailwind CSS imported but custom CSS used for components
- localStorage for persistence (can be migrated to backend)
- SessionStorage for current session
- Component-based architecture
- Context API for global state
- Google Gemini AI integration via @google/genai package
- Responsive design with mobile-first approach
- Toast notifications for user feedback
- Event handling with proper event propagation control

## 🐛 Known Limitations

- Passwords stored in plain text (should be hashed in production)
- No backend API (all data in localStorage)
- Requires Google Gemini API key for AI functionality
- No real-time updates (would need WebSocket)
- Conversations stored locally (not synced across devices)
- No conversation search/filter functionality
- API key exposed in client-side code (should use backend proxy in production)

## 📞 Support

For issues or questions, please check the code comments or create an issue in the repository.

---

**Built with ❤️ using React and Vite**

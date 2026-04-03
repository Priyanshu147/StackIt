# StackIt – A Minimal Q&A Forum Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/GraphQL-15-E10098?logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/Apollo-3-311C87?logo=apollographql&logoColor=white" alt="Apollo" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Material--UI-4-0081CB?logo=mui&logoColor=white" alt="Material UI" />
</p>

**StackIt** is a full-stack, Stack Overflow–inspired Q&A forum platform built with the MERN stack and GraphQL. It allows users to ask technical questions, post answers, vote on content, accept best answers, and build reputation — all in a clean, responsive UI with dark mode support.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [GraphQL API Overview](#-graphql-api-overview)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication
- **Register & Login** with username and password
- **JWT-based** authentication with secure token storage
- Role-based access control (`USER` / `ADMIN`)

### ❓ Questions
- **Post questions** with a title, detailed body, and tags
- **Edit or delete** your own questions
- **View questions** sorted by: Hot, Votes, Views, Newest, or Oldest
- **Filter questions** by tag or keyword search
- **Paginated question list** with load-more support

### 💬 Answers
- **Post answers** to any question
- **Edit or delete** your own answers
- **Accept an answer** as the best answer (question author only)
- **Sort answers** by votes or date

### 🗳️ Voting System
- **Upvote or downvote** questions and answers
- Vote points are tracked per user and contribute to **reputation**

### 💬 Comments
- Add, edit, and delete **comments on questions**
- Add, edit, and delete **comments on answers**

### 🏷️ Tags
- Tag questions with relevant keywords
- **Browse all tags** with their question counts
- Click a tag to filter questions by it

### 👤 User Profiles
- View any user's profile page with:
  - Total questions and answers
  - Reputation score
  - Recent question and answer activity

### 🌙 Dark Mode
- Toggle between **light and dark themes** across the entire app

### 🔍 Search
- Full-text **search bar** to filter questions by keyword

### 📱 Responsive Design
- Fully responsive layout for **desktop and mobile** using Material UI
- Collapsible **mobile navigation menu**

---

## 🛠 Tech Stack

| Layer      | Technology |
|------------|-----------|
| **Frontend** | React 17, React Router v5, Apollo Client 3 |
| **UI Library** | Material UI (MUI) v4 |
| **State Management** | React Context API |
| **Forms & Validation** | React Hook Form + Yup |
| **Backend** | Node.js, Apollo Server 2 |
| **API** | GraphQL |
| **Database** | MongoDB with Mongoose ODM |
| **Auth** | JSON Web Tokens (JWT), bcrypt |
| **Date Utilities** | date-fns |

---

## 📁 Project Structure

```
StackIt/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       │   ├── NavBar.js
│       │   ├── VoteButtons.js
│       │   ├── AnswerForm.js
│       │   ├── AuthFormModal.js
│       │   ├── SearchBar.js
│       │   ├── DarkModeSwitch.js
│       │   └── ...
│       ├── pages/           # Page-level components & routing
│       │   ├── QuesListPage.js
│       │   ├── QuestionPage.js
│       │   ├── AskQuestionPage.js
│       │   ├── UserPage.js
│       │   ├── AllTagsPage.js
│       │   ├── AllUsersPage.js
│       │   └── Routes.js
│       ├── context/         # Global state (auth, dark mode, toasts)
│       ├── graphql/         # Apollo queries & mutations
│       └── utils/           # Helper functions
│
└── server/                  # Node.js + Apollo GraphQL backend
    ├── graphql/
    │   ├── typeDefs.js      # GraphQL schema definition
    │   └── resolvers/       # Query & mutation resolvers
    │       ├── user.js
    │       ├── question.js
    │       ├── answer.js
    │       ├── tag.js
    │       ├── quesComment.js
    │       └── ansComment.js
    ├── models/              # Mongoose data models
    │   ├── user.js
    │   ├── question.js
    │   ├── answer.js
    │   └── comment.js
    ├── utils/               # Auth checker, validators, helpers
    ├── db.js                # MongoDB connection
    └── index.js             # Apollo Server entry point
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) v6 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cluster)

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Priyanshu147/StackIt.git
   cd StackIt
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

---

### Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/stackit
SECRET=your_jwt_secret_key_here
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the GraphQL server (default: `4000`) |
| `MONGODB_URI` | MongoDB connection string |
| `SECRET` | Secret key used to sign JWT tokens |

---

### Running the App

**Start the backend server**
```bash
cd server
npm run dev      # development (nodemon)
# or
npm start        # production
```

**Start the frontend** (in a new terminal)
```bash
cd client
npm start
```

The app will be available at:
- **Frontend:** http://localhost:3000
- **GraphQL Playground:** http://localhost:4000

---

## 📡 GraphQL API Overview

### Queries

| Query | Description |
|-------|-------------|
| `getQuestions(sortBy, page, limit, filterByTag?, filterBySearch?)` | Paginated list of questions with optional filters |
| `viewQuestion(quesId)` | Get a single question with answers and comments |
| `getUser(username)` | Get a user's profile with stats and activity |
| `getAllUsers` | List all registered users |
| `getAllTags` | List all tags with question counts |

### Mutations

| Mutation | Description |
|----------|-------------|
| `register(username, password)` | Create a new account |
| `login(username, password)` | Authenticate and receive a JWT |
| `postQuestion(title, body, tags)` | Ask a new question |
| `editQuestion(quesId, title, body, tags)` | Edit your question |
| `deleteQuestion(quesId)` | Delete your question |
| `voteQuestion(quesId, voteType)` | Upvote or downvote a question |
| `postAnswer(quesId, body)` | Answer a question |
| `editAnswer(quesId, ansId, body)` | Edit your answer |
| `deleteAnswer(quesId, ansId)` | Delete your answer |
| `voteAnswer(quesId, ansId, voteType)` | Upvote or downvote an answer |
| `acceptAnswer(quesId, ansId)` | Mark an answer as accepted |
| `addQuesComment / editQuesComment / deleteQuesComment` | Manage question comments |
| `addAnsComment / editAnsComment / deleteAnsComment` | Manage answer comments |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and all existing features continue to work.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">Made with ❤️ by <a href="https://github.com/Priyanshu147">Priyanshu147</a></p>

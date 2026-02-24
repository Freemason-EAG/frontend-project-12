### Hexlet tests and linter status:
[![Actions Status](https://github.com/Freemason-EAG/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Freemason-EAG/frontend-project-12/actions)

[![Render](https://img.shields.io/badge/Deployed-Render-blue)](https://frontend-project-12-90j1.onrender.com)

**Hexlet Chat** — real-time web application for communication, a simplified analog of Slack with the ability to create channels and exchange messages in real time.

---

## Features

- ✅ User registration and authentication
- ✅ Create, rename and delete channels
- ✅ Real-time messaging (WebSockets)
- ✅ Profanity filter
- ✅ Toast notifications
- ✅ Internationalization (i18n) — Russian language
- ✅ Responsive interface with React Bootstrap

---

## Technologies

- **Frontend:** React, Redux Toolkit, React Router, Formik, Yup, React Bootstrap, Socket.IO-client
- **Backend:** @hexlet/chat-server (ready-made server), WebSocket
- **Build & Deploy:** Vite, Render, Rollbar (error monitoring)

---

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/Freemason-EAG/frontend-project-12.git
cd frontend-project-12

# Install dependencies
make install
```

The application is deployed on Render and available at: https://frontend-project-12-90j1.onrender.com
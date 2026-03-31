# Speech Enabled Email Assistant With Facial Recognition

An AI-powered voice-controlled email assistant that uses speech recognition, text-to-speech, and facial recognition to provide secure, hands-free email access.

This project is designed especially for visually impaired users, people with physical disabilities, and users who prefer voice-based interaction instead of typing.

---

## Features

- Facial Recognition Login
- Voice-Based Email Sending
- Read Emails Using Text-to-Speech
- Speech-to-Text for Email Composition
- Secure Authentication System
- IMAP and SMTP Email Integration
- AI-Based Voice Command Detection
- Dashboard with Email Analytics
- Voice Command History
- Responsive Modern UI
- Accessibility Support
- Multilingual Voice Support
- Draft Saving and Email Scheduling

---

## Voice Commands

Examples of supported voice commands:

- "Send email to John"
- "Read unread emails"
- "Reply to the latest email"
- "Delete this email"
- "Open inbox"
- "Search emails from HR"
- "Schedule email for tomorrow morning"
- "Logout"

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- Flask / Node.js
- Python
- OpenCV
- face-recognition Library

### Database
- MySQL / MongoDB

### Email Services
- IMAP
- SMTP

### AI and Voice Processing
- SpeechRecognition
- gTTS
- Web Speech API
- spaCy / NLTK / OpenAI API

---

## System Modules

### 1. Authentication Module
- Face recognition login
- Email/password login
- Session management
- Secure user authentication

### 2. Voice Processing Module
- Real-time speech recognition
- Text-to-speech output
- Command detection
- Voice confirmation

### 3. Email Management Module
- Send email
- Read unread emails
- Reply to emails
- Delete emails
- Search emails
- Schedule emails

### 4. Dashboard Module
- Total emails
- Unread emails
- Sent emails
- Voice command statistics
- Most contacted people

### 5. Accessibility Module
- Voice-only navigation
- Screen-reader support
- Large text mode
- High contrast mode

---

## Folder Structure

```bash
speech-email-assistant/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.js
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── face_recognition/
│   ├── voice_processing/
│   └── app.py
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── README.md
├── package.json
└── requirements.txt

# EduConnect 🎓

## Problem Statement
**Education inequality is a global crisis.** Over 258 million children remain out of school, and millions more attend schools with inadequate resources. Students in underserved communities lack access to quality mentorship, personalized learning resources, and guidance for their futures.

## Solution
**EduConnect** is an AI-powered platform that democratizes access to quality education by:
- 🤖 **AI Tutoring Assistant** - 24/7 personalized learning support using advanced AI
- 👥 **Mentor Matching** - Connects students with experienced mentors globally
- 📚 **Resource Library** - Free, curated educational materials and courses
- 📊 **Learning Analytics** - Personalized progress tracking and recommendations
- 💬 **Community Support** - Peer learning and collaborative spaces

## Impact
- Reaches students in remote/underserved communities
- Provides free, high-quality educational support
- Bridges the mentor-mentee gap
- Tracks progress and adapts to individual learning styles
- Empowers students to achieve their potential

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI/ML:** OpenAI API, TensorFlow.js for recommendations
- **Deployment:** Docker, Azure App Service / AWS

## Project Structure
```
EduConnect/
├── backend/          # Node.js Express API
├── frontend/         # React application
├── docs/            # Documentation
└── README.md        # This file
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- OpenAI API key (optional for AI features)

### Quick Start with Docker
```bash
docker-compose up --build
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: MongoDB on localhost:27017
```

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with API URL
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

**Frontend Only (MVP):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel

# Deploy backend separately to Railway, Render, or Heroku
# See docs/VERCEL_DEPLOYMENT.md for details
```

**Full Stack Deployment:**
See [Vercel Deployment Guide](../docs/VERCEL_DEPLOYMENT.md) for serverless backend setup.

**Quick Deploy Scripts:**
```bash
# Linux/Mac
bash deploy-to-vercel.sh

# Windows
deploy-to-vercel.bat
```

### Other Deployment Options

- **Backend:** Railway, Render, Heroku, AWS, Azure
- **Database:** MongoDB Atlas (recommended)
- **Frontend:** Vercel, Netlify, GitHub Pages

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for detailed instructions.

## Features

### 1. AI Tutoring Assistant
- Real-time answers to academic questions
- Multi-subject support (Math, Science, Languages, etc.)
- Adaptive learning difficulty
- Explanation videos and resources

### 2. Mentor Matching Engine
- AI-powered mentor recommendations based on:
  - Student learning goals
  - Mentor expertise
  - Geographic availability
  - Scheduling compatibility
- Structured mentorship framework with milestones

### 3. Resource Library
- Curated courses from top educators
- Free textbooks and study materials
- Practice problems with solutions
- Career guidance resources

### 4. Learning Analytics Dashboard
- Progress visualization
- Skill assessment
- Personalized learning paths
- Goal tracking and milestone celebration

### 5. Community Features
- Study groups
- Peer Q&A forums
- Success stories from other students
- Mentor advice columns

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Students
- `GET /api/students/:id/learning-path` - Get personalized learning path
- `POST /api/students/:id/progress` - Log learning progress
- `GET /api/students/:id/recommendations` - Get AI recommendations

### Mentors
- `GET /api/mentors` - List available mentors
- `POST /api/mentors/:id/request` - Request mentor
- `GET /api/mentors/:id/availability` - Check mentor availability

### AI Tutoring
- `POST /api/ai/ask` - Ask AI tutor a question
- `GET /api/ai/resources/:topic` - Get learning resources
- `POST /api/ai/explain` - Get explanation on topic

### Resources
- `GET /api/resources` - Browse resource library
- `POST /api/resources/search` - Search resources
- `GET /api/resources/:id` - Get resource details

## Sustainability Model
- **Free tier** for students in underserved communities
- **Premium tier** with advanced analytics for educators
- **Enterprise partnerships** with NGOs and schools
- **Sponsorships** from educational organizations

## Team
- **Project Lead:** [Your Name]
- **AI/ML Engineer:** [Team Member]
- **Full Stack Developer:** [Team Member]
- **Designer/UX:** [Team Member]

## Contributing
We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## License
MIT License - See LICENSE file

## Roadmap
- [ ] V1.0 - Core platform (Q1 2024)
- [ ] V1.5 - Mobile app (Q2 2024)
- [ ] V2.0 - Offline support for low-connectivity areas (Q3 2024)
- [ ] V2.5 - 10+ language support (Q4 2024)
- [ ] V3.0 - Advanced skill certification (2025)

## Contact
- 📧 Email: team@educonnect.io
- 🌐 Website: www.educonnect.io
- 🐦 Twitter: @EduConnectAI

## Acknowledgments
Built with ❤️ for the Microsoft Imagine Cup 2024

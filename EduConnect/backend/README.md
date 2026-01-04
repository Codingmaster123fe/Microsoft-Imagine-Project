# EduConnect Backend

Node.js/Express backend API for the EduConnect learning platform.

## Features

- User authentication with JWT
- Student learning path management
- Mentor discovery and matching
- AI tutoring endpoints
- Resource library management
- Input validation and error handling
- Logging with Morgan
- Security headers with Helmet

## Setup

```bash
npm install
cp .env.example .env
# Configure your .env file with actual credentials
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time
- `OPENAI_API_KEY` - OpenAI API key for AI tutoring
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production/test)

## API Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/students/:id/learning-path` - Get learning path
- `POST /api/students/:id/progress` - Log progress
- `GET /api/students/:id/recommendations` - Get recommendations
- `GET /api/mentors` - List mentors
- `POST /api/mentors/:id/request` - Request mentor
- `GET /api/mentors/:id/availability` - Check availability
- `POST /api/ai/ask` - Ask AI tutor
- `GET /api/ai/resources/:topic` - Get resources
- `POST /api/ai/explain` - Get explanation
- `GET /api/resources` - Browse resources
- `POST /api/resources/search` - Search resources
- `GET /api/resources/:id` - Get resource details

## Project Structure

```
backend/
├── routes/           # API route handlers
├── middleware/       # Express middleware
├── utils/           # Utility functions
├── config/          # Configuration files
├── server.js        # Main server file
└── package.json
```

## Development

```bash
npm run dev    # Start with nodemon
npm test       # Run tests
npm lint       # Run ESLint
```

## TODO

- [ ] Create MongoDB User model schema
- [ ] Implement database persistence
- [ ] Add rate limiting middleware
- [ ] Add email verification
- [ ] Integrate OpenAI API for AI tutor
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API documentation with Swagger

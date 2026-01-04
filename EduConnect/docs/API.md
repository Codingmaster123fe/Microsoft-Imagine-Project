# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "userType": "student"  // or "mentor"
}

Response: 201
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "john@example.com",
    "name": "John Doe",
    "userType": "student"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response: 200
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Get Profile
```
GET /auth/profile
Authorization: Bearer <token>

Response: 200
{
  "email": "john@example.com",
  "name": "John Doe",
  "userType": "student",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Students

#### Get Learning Path
```
GET /students/{id}/learning-path
Authorization: Bearer <token>

Response: 200
{
  "studentId": "123",
  "currentLevel": "intermediate",
  "goals": ["Master calculus"],
  "subjects": [...],
  "estimatedCompletion": "3 months"
}
```

#### Log Progress
```
POST /students/{id}/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "Calculus",
  "score": 85,
  "timeSpent": 45
}

Response: 201
{
  "studentId": "123",
  "topic": "Calculus",
  "score": 85,
  "feedback": "🎉 Great job!"
}
```

#### Get Recommendations
```
GET /students/{id}/recommendations
Authorization: Bearer <token>

Response: 200
{
  "studentId": "123",
  "recommendations": [...]
}
```

### Mentors

#### List Mentors
```
GET /mentors?subject=Mathematics&availability=weekends
Authorization: Bearer <token>

Response: 200
{
  "total": 3,
  "mentors": [
    {
      "id": 1,
      "name": "Dr. Sarah Chen",
      "expertise": ["Mathematics"],
      "rating": 4.9
    }
  ]
}
```

#### Request Mentor
```
POST /mentors/{id}/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "123",
  "goals": ["Master calculus"],
  "preferredTimes": ["weekends"]
}

Response: 201
{
  "requestId": "REQ_123456",
  "status": "pending",
  "message": "Mentor request sent!"
}
```

#### Check Availability
```
GET /mentors/{id}/availability
Authorization: Bearer <token>

Response: 200
{
  "mentorId": "1",
  "weeklyHours": 10,
  "nextAvailable": "2024-01-06T10:00:00Z",
  "schedule": [...]
}
```

### AI Tutor

#### Ask Question
```
POST /ai/ask
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "How do you calculate derivatives?",
  "subject": "Mathematics"
}

Response: 200
{
  "question": "How do you calculate derivatives?",
  "answer": "...",
  "resources": [...],
  "followUpQuestions": [...]
}
```

#### Get Resources
```
GET /ai/resources/{topic}
Authorization: Bearer <token>

Response: 200
{
  "topic": "Calculus",
  "resources": [
    {
      "id": 1,
      "title": "Calculus Basics",
      "type": "article"
    }
  ]
}
```

#### Get Explanation
```
POST /ai/explain
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "Derivatives",
  "level": "intermediate"
}

Response: 200
{
  "topic": "Derivatives",
  "explanation": "...",
  "keyPoints": [...],
  "examples": [...]
}
```

### Resources

#### Browse Resources
```
GET /resources?category=mathematics&difficulty=intermediate
Authorization: Bearer <token>

Response: 200
{
  "total": 10,
  "resources": [...]
}
```

#### Search Resources
```
POST /resources/search
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "calculus"
}

Response: 200
{
  "query": "calculus",
  "resultsCount": 42,
  "results": [...]
}
```

#### Get Resource Details
```
GET /resources/{id}
Authorization: Bearer <token>

Response: 200
{
  "id": "1",
  "title": "Introduction to Python",
  "category": "programming",
  "chapters": [...]
}
```

## Error Responses

```json
{
  "error": "Error message here"
}
```

### Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Testing
Use Postman or cURL to test endpoints:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

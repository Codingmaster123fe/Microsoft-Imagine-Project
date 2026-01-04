# EduConnect Frontend

React frontend for the EduConnect learning platform.

## Features

- Responsive design with Tailwind CSS
- User authentication flow
- Student dashboard
- Mentor discovery interface
- Resource library browser
- Progress tracking visualization
- Mobile-friendly layout

## Setup

```bash
npm install
npm start
```

The app will open on `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── App.js        # Main app component
│   ├── index.js      # Entry point
│   └── index.css     # Global styles
├── public/
│   └── index.html
├── tailwind.config.js
└── package.json
```

## Environment Variables

Create `.env.local` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Components to Build

- [ ] Login/Register pages
- [ ] Student dashboard
- [ ] Mentor listing page
- [ ] Resource library browser
- [ ] AI chat interface
- [ ] Progress tracker
- [ ] User profile page
- [ ] Settings page

## Styling

Using Tailwind CSS for styling. Configure in `tailwind.config.js`.

## Available Scripts

- `npm start` - Run dev server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from CRA (irreversible)

## TODO

- [ ] Create reusable components
- [ ] Implement auth context
- [ ] Add API integration
- [ ] Add error boundaries
- [ ] Implement routing with React Router
- [ ] Add form validation
- [ ] Add loading states
- [ ] Add error handling
- [ ] Mobile responsive testing
- [ ] Performance optimization

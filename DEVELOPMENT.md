# Development Guide - Methynix Connect

## Project Overview

Methynix Connect is a production-grade event discovery platform that uses real-time geolocation technology to help users discover and create events in their local community.

**Key Technologies:**
- Frontend: React 18, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT (JSON Web Tokens)
- Security: Helmet, Rate Limiting, CORS, Input Validation

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB (local or cloud instance)
- Git

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd methynix-meet
```

#### 2. Backend Setup
```bash
cd server
cp .env.example .env
npm install
# Configure your MongoDB URI and JWT secrets in .env
npm start
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../client
cp .env.example .env
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

### Client (`/client`)
```
src/
├── atoms/          # Atomic UI components (Button, Input, etc.)
├── components/     # Composite components (Header, Footer, etc.)
├── contexts/       # React Context API (Authentication)
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API integration & Axios setup
├── routes/         # Route protection & routing logic
└── styles/         # Global styles & Tailwind config
```

### Server (`/server`)
```
├── config/         # Database & environment configuration
├── controllers/    # Request handlers
├── middlewares/    # Auth, error handling, validation
├── models/         # Mongoose schemas
├── repositories/   # Data access layer
├── routes/         # API endpoints
├── services/       # Business logic
├── utils/          # Helpers & error classes
└── validators/     # Joi validation schemas
```

## Key Features

### 1. Real-Time Event Discovery
- Geolocation-based event filtering
- Event creation with location locking
- Real-time event updates

### 2. Security Implementation
- JWT authentication with refresh tokens
- Bcrypt password hashing
- CORS with credential support
- Rate limiting on all API endpoints
- Helmet security headers
- Input validation via Joi

### 3. User Experience
- Responsive design across all devices
- Smooth animations with Framer Motion
- Toast notifications for feedback
- Modal dialogs for confirmations
- Loading states with skeleton screens

### 4. Admin Dashboard
- User management
- Event moderation
- System analytics
- Activity logs

## Development Workflow

### Creating a New Component

**Frontend (React):**
```javascript
// src/components/MyComponent.jsx
const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div className="holo-card p-6">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

**Backend (Controller):**
```javascript
// server/controllers/myController.js
const getMyData = catchAsync(async (req, res, next) => {
  const data = await MyService.getData(req.params.id);
  res.status(200).json({
    status: 'success',
    data: data,
  });
});

module.exports = { getMyData };
```

### Adding a New Route

**Backend:**
```javascript
// server/routes/myRoutes.js
const router = express.Router();
const { getMyData } = require('../controllers/myController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getMyData);

module.exports = router;
```

**Frontend:**
```javascript
// Update src/routes.jsx
import MyPage from './pages/MyPage';

// Add to router children:
{
  path: 'my-route',
  element: <MyPage />,
}
```

## Environment Variables

### Client (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_ENV=development
VITE_ENABLE_NOTIFICATIONS=true
```

### Server (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/methynix_connect
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

## Testing

### Frontend
```bash
cd client
npm run test      # Run Jest tests
npm run lint      # Run ESLint
```

### Backend
```bash
cd server
npm test          # Run test suite
npm run lint      # Run ESLint
```

## Building for Production

### Frontend
```bash
cd client
npm run build
npm run preview   # Preview production build locally
```

Output will be in `dist/` folder.

### Backend
Ensure NODE_ENV=production and all security headers are configured.

## Security Checklist

- [ ] All passwords use bcrypt/argon2
- [ ] JWT tokens have short expiry times
- [ ] Refresh tokens stored in httpOnly cookies
- [ ] All user inputs validated server-side
- [ ] Geolocation requires explicit permission
- [ ] HTTPS enforced in production
- [ ] Rate limiting configured
- [ ] CORS properly restricted
- [ ] Environment variables not committed
- [ ] Regular security audits performed

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Verify MONGODB_URI in .env
- Check firewall/network permissions

### CORS Error
- Verify CORS_ORIGIN in server .env
- Ensure frontend port matches configuration
- Check browser console for specific error

### Authentication Issues
- Clear browser cookies/localStorage
- Verify JWT_SECRET is configured
- Check token expiry time

## Performance Optimization

### Frontend
- Code splitting via Vite rollup options
- Image optimization
- Lazy loading routes
- React Query caching

### Backend
- Database indexing on frequently queried fields
- Pagination for list endpoints
- Caching strategies (Redis recommended)
- Connection pooling for MongoDB

## Deployment

### Frontend (Vercel/Netlify)
```bash
# Connect repository to Vercel/Netlify
# Set environment variables in platform dashboard
# Deploy automatically on push to main
```

### Backend (Heroku/Railway/Render)
```bash
# Connect repository to platform
# Set environment variables
# Configure Node buildpack if needed
# Deploy from main branch
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

## Support & Documentation

- Backend API Documentation: See server README
- Frontend Component Library: Storybook (optional)
- Security Guidelines: See SECURITY.md
- Deployment Guide: See DEPLOYMENT.md

---

**Last Updated:** 2026-08-08
**Version:** 1.0.0

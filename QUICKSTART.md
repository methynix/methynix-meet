# Quick Start - Methynix Meet

**Made by Methynix Software Company** | 📧 info@methynix.com | 📞 0715455422

## Get Running in 5 Minutes

### Option 1: Automated Setup (Recommended)

```bash
cd /path/to/methynix-meet
./start.sh
```

This will:
- Install dependencies for both frontend and backend
- Start the backend server (http://localhost:5000)
- Start the frontend dev server (http://localhost:5173)

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 - Seed Database:**
```bash
cd server
npm run seed
```

**Terminal 3 - Frontend:**
```bash
cd client
npm install
npm run dev
```

## Access the App

🌐 **Frontend:** http://localhost:5173
🔌 **Backend API:** http://localhost:5000/api

## Test the Features

### 1. View Events (Public)
- Go to http://localhost:5173/dashboard
- See 6 sample events from Cloudinary
- Events show: title, description, location, date, image

### 2. Try to Join an Event
- Click "Join" button on any event
- Get prompted: "Please login to join events"
- Redirected to login page

### 3. Create Account & Login
- Sign up: http://localhost:5173/register
- Use any email (e.g., test@example.com)
- Password must have: uppercase, lowercase, number, special char
- Example: `TestPass123!`

### 4. Join Event (After Login)
- Return to dashboard
- Click "Join" on an event
- Should see "Joined" status
- Event card updates with your attendance

### 5. Create Your Own Event
- Click "PROJECT EVENT" in header (after login)
- Fill in event details
- Event appears on dashboard

## Key Features to Test

✅ **Header says "MEET"** (not Methynix)
✅ **Events visible without login**
✅ **Login prompt when joining as guest**
✅ **Cloudinary images load**
✅ **Beautiful dashboard with 6 sample events**
✅ **Footer shows Methynix contact info**
✅ **Privacy & Terms pages work**
✅ **Support Us page accessible**
✅ **Responsive on mobile/tablet**

## Database Events Included

1. **Tech Community Meetup** (New York) - Sept 15
2. **Networking Dinner** (Chicago) - Sept 20
3. **Community BBQ** (Los Angeles) - Sept 25
4. **Startup Workshop** (San Francisco) - Sept 28
5. **Marketing Conference** (Miami) - Oct 5
6. **Wellness Retreat** (Atlanta) - Oct 10

All use Cloudinary images from your folder.

## If Something Breaks

### Events not showing
```bash
cd server
npm run seed
```

### Can't connect to MongoDB
- Ensure MongoDB is running locally OR
- Check MONGODB_URI in server/.env

### Styling looks broken
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Clear browser cache

### Port already in use
- Frontend uses 5173
- Backend uses 5000
- Kill other processes using these ports

## Navigation

- **Home:** http://localhost:5173
- **Dashboard:** http://localhost:5173/dashboard
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **Create Event:** http://localhost:5173/create-event
- **Privacy:** http://localhost:5173/privacy
- **Terms:** http://localhost:5173/terms
- **Support Us:** http://localhost:5173/support

## Environment Files

### server/.env
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/methynix_meet
JWT_SECRET=dev_secret_key
REFRESH_TOKEN_SECRET=dev_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

### client/.env
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

Both `.env.example` files are provided in each directory.

## API Endpoints to Test

### Get All Events
```bash
curl http://localhost:5000/api/events
```

### Get Event Details
```bash
curl http://localhost:5000/api/events/{eventId}
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "TestPass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "TestPass123!"
  }'
```

## Tips

💡 **To add more events:**
- Edit `server/seeds/eventSeeds.js`
- Add new event objects with Cloudinary URLs
- Run `npm run seed` again

💡 **To change event dates:**
- Edit the `eventDate` in seed file
- Use dates in future so events display

💡 **To use different images:**
- Replace Cloudinary URLs with your own
- Must be publicly accessible

💡 **To view MongoDB:**
- Install MongoDB Compass
- Connect to `mongodb://localhost:27017`
- Browse `methynix_meet` database

## Support

Need help?
- 📧 Email: info@methynix.com
- 📞 Phone: 0715455422
- 📋 Check: SEED_DATABASE.md for seeding issues

---

**Enjoy using Methynix Meet!** 🎉

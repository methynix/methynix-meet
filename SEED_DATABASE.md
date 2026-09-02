# Database Seeding Guide - Methynix Meet

This guide explains how to populate your database with sample events using Cloudinary images.

## Events Included in Seed

The seed script creates 6 sample events using Cloudinary images:

1. **Tech Community Meetup 2026** (New York)
   - Image: event1_kecswu.jpg
   - Date: September 15, 2026 @ 6:00 PM
   - Category: Technology
   - Max Attendees: 100

2. **Networking Dinner for Professionals** (Chicago)
   - Image: event2_ddtb5h.jpg
   - Date: September 20, 2026 @ 7:30 PM
   - Category: Networking
   - Max Attendees: 75

3. **Community Celebration & BBQ** (Los Angeles)
   - Image: event3_teadmn.jpg
   - Date: September 25, 2026 @ 12:00 PM
   - Category: Community
   - Max Attendees: 200

4. **Startup Innovation Workshop** (San Francisco)
   - Image: event1_kecswu.jpg
   - Date: September 28, 2026 @ 10:00 AM
   - Category: Workshop
   - Max Attendees: 50

5. **Digital Marketing Conference** (Miami)
   - Image: event2_ddtb5h.jpg
   - Date: October 5, 2026 @ 9:00 AM
   - Category: Conference
   - Max Attendees: 150

6. **Wellness & Yoga Retreat** (Atlanta)
   - Image: event3_teadmn.jpg
   - Date: October 10, 2026 @ 7:00 AM
   - Category: Wellness
   - Max Attendees: 80

## Cloudinary URLs

All events use images from your Methynix Cloudinary folder:

- `https://res.cloudinary.com/dwt1u991q/image/upload/v1786183894/event1_kecswu.jpg`
- `https://res.cloudinary.com/dwt1u991q/image/upload/v1786183895/event2_ddtb5h.jpg`
- `https://res.cloudinary.com/dwt1u991q/image/upload/v1786183891/event3_teadmn.jpg`

## How to Seed the Database

### Step 1: Configure Environment Variables

Make sure your `.env` file in the server directory is configured:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/methynix_meet
JWT_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

### Step 2: Ensure MongoDB is Running

If using MongoDB locally:
```bash
# Make sure MongoDB service is running
mongod
```

If using MongoDB Atlas, ensure your connection string is correct in `.env`.

### Step 3: Run the Seed Script

From the server directory:

```bash
npm run seed
```

Or directly:

```bash
node seeds/eventSeeds.js
```

### Expected Output

```
Connected to MongoDB
Cleared existing events
✅ Seeded 6 events successfully!
Events:
1. Tech Community Meetup 2026 (New York) - Sun Sep 15 2026
2. Networking Dinner for Professionals (Chicago) - Fri Sep 20 2026
3. Community Celebration & BBQ (Los Angeles) - Wed Sep 25 2026
4. Startup Innovation Workshop (San Francisco) - Sat Sep 28 2026
5. Digital Marketing Conference (Miami) - Sun Oct 05 2026
6. Wellness & Yoga Retreat (Atlanta) - Fri Oct 10 2026

Database connection closed
```

## Verifying the Seed

After running the seed, you can verify the events were created:

1. **Using MongoDB Compass:**
   - Connect to your MongoDB instance
   - Navigate to `methynix_meet` database
   - Open the `events` collection
   - You should see 6 documents

2. **Using the App:**
   - Navigate to `http://localhost:5173/dashboard`
   - You should see all 6 events displayed

3. **Using API:**
   ```bash
   curl http://localhost:5000/api/events
   ```

## Clearing Events

The seed script automatically clears existing events before seeding. To manually clear:

```javascript
// In MongoDB shell or Compass
db.events.deleteMany({})
```

## Adding More Events

To add more events, edit `server/seeds/eventSeeds.js`:

```javascript
const eventSeeds = [
  {
    title: 'Your Event Title',
    description: 'Event description here',
    image: 'https://res.cloudinary.com/your-image-url',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude], // Example: [-74.0060, 40.7128]
    },
    city: 'City Name',
    eventDate: new Date('YYYY-MM-DDTHH:MM:SSZ'),
    category: 'technology|networking|community|workshop|conference|wellness|other',
    maxAttendees: 100,
    status: 'active', // or 'cancelled', 'completed'
  },
  // ... more events
];
```

Then run `npm run seed` again.

## Troubleshooting

### "Connected to MongoDB" but then it hangs

- Check if MongoDB service is running
- Verify MONGODB_URI in .env is correct
- Ensure the database is accessible

### "Cannot find module 'mongoose'"

- Run `npm install` in the server directory

### Events not showing on dashboard

- Verify events were created: `npm run seed` should show "✅ Seeded X events"
- Check `/api/events` endpoint returns data
- Restart the frontend dev server

### Cloudinary images not loading

- Verify the Cloudinary URLs are correct
- Check your internet connection
- Ensure Cloudinary account is active

## Notes

- Events are seeded with future dates (September-October 2026)
- All events have `status: 'active'`
- Event locations are set to major US cities
- To display events, dates should be in the future
- Users can join events without authentication (they'll be prompted to login)

---

**For questions or issues**: info@methynix.com | 0715455422

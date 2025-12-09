#  METHYNIX CONNECT


**Methynix Connect** is a next-generation event discovery platform designed to connect people based on real-time geolocation. Wrapped in a stunning **Neo-Cosmic Hologram** interface, it allows users to project (create) events, discover gatherings within their specific city, and manage attendance via a secure digital manifest.

Built with a focus on **Clean Architecture**, **DRY principles**, and **High Performance**.

---

##  Key Features

### 📡 Geospatial Intelligence
- **Real-Time Detection:** Automatically detects user location to serve nearby events.
- **City-Lock Protocol:** Users can only project events within their current city limits to ensure data authenticity.
- **Smart Mapping:** Integrated **Leaflet** & **OpenStreetMap** for precise pin-dropping and reverse geocoding (Coordinates → Readable Address).

###  Robust Architecture
- **Repo-Service-Controller Pattern:** Strict separation of concerns in the backend.
  - **Controllers:** Handle HTTP requests/responses.
  - **Services:** Execute business logic and validation.
  - **Repositories:** Direct database communication.
- **Security First:** JWT Authentication, Joi Validation, Rate Limiting, and Helmet security headers.

###  Neo-Cosmic UI/UX
- **Holographic Design:** Glassmorphism, neon glows, and futuristic fonts (`Orbitron`).
- **Interactive Elements:** Framer Motion animations for smooth transitions.
- **User Experience:** Toast notifications, custom modal portals (no native alerts), and reactive form handling.

###  Technical Highlights
- **State Management:** React Query (TanStack) for server state & caching.
- **Forms:** React Hook Form for performant, uncontrolled inputs.
- **Database:** MongoDB with Geospatial Indexing (`2dsphere`).

---

##  Tech Stack

### Frontend (Client)
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6.4+ (Data API)
- **State/Cache:** @tanstack/react-query, Context API
- **Maps:** React Leaflet, OpenStreetMap API
- **HTTP:** Axios (with Interceptors)

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Validation:** Joi
- **Auth:** JWT (JSON Web Tokens)

---

##  Project Structure

The project follows a strict enterprise-grade directory structure to ensure maintainability.

```bash
root/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── atoms/          # Atomic components (Input, Button)
│   │   ├── components/     # Molecular components (EventCard, Navbar)
│   │   ├── hooks/          # Custom Hooks (useGeoLocation, useEventsQuery)
│   │   ├── pages/          # View Controllers
│   │   ├── services/       # API integration
│   │   └── ...
│
├── server/                 # Backend Application
│   ├── src/
│   │   ├── config/         # DB Connection
│   │   ├── controllers/    # Request Handling
│   │   ├── middlewares/    # Auth, Error, Validation
│   │   ├── models/         # Mongoose Schemas & Hooks
│   │   ├── repositories/   # Data Access Layer
│   │   ├── services/       # Business Logic Layer
│   │   ├── utils/          # AppError, CatchAsync
│   │   └── validators/     # Joi Schemas

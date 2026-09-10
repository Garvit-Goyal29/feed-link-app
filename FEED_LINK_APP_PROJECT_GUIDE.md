# 🍽️ Feed-Link App — Comprehensive Project Guide & Interview Preparation Manual

---

## 📌 Executive Summary

**Feed-Link App** is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to bridge the gap between excess food providers (restaurants, event hosts, grocery stores, individual donors) and food receivers (NGOs, community kitchens, shelter homes, individuals in need). By digitizing the food donation pipeline, Feed-Link reduces food waste, combats hunger, and facilitates rapid local food distribution.

---

## 🏗️ 1. System Architecture & High-Level Design

```
+-----------------------------------------------------------------------------------+
|                                 FRONTEND (Vite + React 19)                         |
|  - React Router DOM v7 (SPA Navigation)                                           |
|  - Tailwind CSS v4 & Motion/AOS (Styling & Animation)                            |
|  - Fetch / Axios API Integration                                                  |
+-----------------------------------------------------------------------------------+
                                         │
                                   HTTP / REST API
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                                 BACKEND (Node.js + Express 5)                      |
|  - ES Modules ("type": "module")                                                  |
|  - Modular Controllers (Auth, Donation, Receiver)                                 |
|  - JWT Authentication & Bcrypt Hashing                                            |
|  - Asynchronous Nodemailer Service with Parallel Mail Dispatch                    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ├─────────────────────────┐
                                         ▼                         ▼
                      +--------------------+     +--------------------+
                      |  MongoDB Database  |     |   Nodemailer SMTP  |
                      |   (Mongoose 9)     |     |   (Email Dispatch) |
                      +--------------------+     +--------------------+
```

### Core Business Workflows

1. **User Registration & Authentication**:
   - Donors and Receivers create an account via `/api/auth/signup` with email regex and 10-digit phone validation.
   - Passwords are securely hashed with `bcrypt` before storage.
   - Signin generates JWT (JSON Web Token) for stateless session verification.

2. **Food Listing & Donation Creation**:
   - A logged-in donor submits surplus food details (food item, quantity, expiry date/time, pickup location, description).
   - A `Donation` document is created with status `available`.

3. **Food Discovery & Request Submission**:
   - Receivers view available food items on the `/receive` interface.
   - Submitting a request creates a `Receiver` (Request) entry linking the receiver's contact info with `foodId`, setting status to `pending` and donation status to `requested`.

4. **Request Fulfillment & Automated Email Dispatch**:
   - The donor receives notifications in their dashboard (`/donate/request`).
   - Accepting a request changes status to `accepted` and triggers `Promise.all` parallel HTML transactional emails via Nodemailer to both donor and receiver containing pickup contact details.
   - Rejecting frees the food listing back to `available`.

5. **Completion & History Tracking**:
   - Once handover is complete, the donor marks the request as `completed`, moving it into historical analytics logs.

---

## 🛠️ 2. Detailed Breakdown of Tech Stack & Tools (With Justifications)

### Frontend Technologies

| Tech / Library | Version | Purpose in Feed-Link App | Why It Was Chosen |
| :--- | :--- | :--- | :--- |
| **React** | `^19.2.0` | UI Component Framework | Declarative UI, virtual DOM diffing, component reusability, and rich ecosystem. React 19 brings concurrent rendering optimizations. |
| **Vite** | `^7.3.1` | Build Tool & Dev Server | Uses native ES Modules (ESM) for near-instant hot module replacement (HMR), instant startup times, and fast production bundles compared to legacy Webpack/CRA. |
| **React Router DOM** | `^7.13.1` | Client-Side Routing | Provides Single Page Application (SPA) dynamic routing without full browser reloads (`<Routes>`, `<Route>`, `<BrowserRouter>`). |
| **Tailwind CSS** | `^4.2.1` | Styling & Layout | Utility-first CSS engine allowing rapid responsive UI design without writing custom boilerplate CSS files. |
| **Framer Motion (`motion`)** | `^12.38.0` | Declarative Animations | Smooth UI entry animations, hover interactions, page transitions, and interactive visual polish. |
| **AOS (Animate On Scroll)** | `^2.3.4` | Scroll Animations | Triggers smooth fade/slide-in effects as users scroll down landing pages (Home, About, How It Works). |
| **Heroicons** | `^2.2.0` | Iconography | Lightweight, accessible SVG icon set crafted for modern React interfaces. |

### Backend Technologies

| Tech / Library | Version | Purpose in Feed-Link App | Why It Was Chosen |
| :--- | :--- | :--- | :--- |
| **Node.js** | Environment | Runtime Environment | Asynchronous, event-driven I/O ideal for handling concurrent API requests non-blockingly. |
| **Express.js** | `^5.2.1` | Web Application Framework | Minimalist and fast routing framework for structuring RESTful API endpoints and middleware pipelines. Express 5 provides improved promise handling. |
| **MongoDB & Mongoose** | `^9.3.3` | Database & ODM | MongoDB's JSON-like document model fits semi-structured donation data natively. Mongoose provides schema validation, data casting, and relational references (`ref`). |
| **bcrypt** | `^6.0.0` | Password Security | Industry standard password hashing using key derivation functions (salting + hashing) to withstand brute-force & rainbow table attacks. |
| **jsonwebtoken (JWT)** | `^9.0.3` | Token Authentication | Stateless authentication mechanism. Enables secure, verifiable request authorization without storing session state on the server. |
| **Nodemailer** | `^8.0.4` | Transactional Email Service | Asynchronous node package for dispatching automated transactional emails (request approvals, contact details exchange) via SMTP. |
| **CORS** | `^2.8.6` | Security Middleware | Cross-Origin Resource Sharing enables the backend server to accept HTTP requests securely from the React frontend origin. |
| **dotenv** | `^17.3.1` | Environment Config | Loads sensitive credentials (DB URIs, secret keys, email passwords) from `.env` into `process.env`, isolating code from secrets. |
| **Nodemon** | `^3.1.14` | Dev Productivity | Automatically restarts the Node backend server upon code modifications. |

---

## 📊 3. Database Schema & Data Modeling

### 1. User Model (`userModel.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  phone: { type: String, required: true, match: /^\d{10}$/ }
}
```

### 2. Donation Model (`donateModel.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phone: { type: String, match: /^\d{10}$/ },
  location: { type: String, required: true },
  food: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "requested", "accepted", "completed", "expired"],
    default: "available"
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true }
```

### 3. Receiver / Request Model (`receiverModel.js`)
```javascript
{
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Donation" },
  userEmail: String,
  donorEmail: String,
  userPhone: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}
```

---

## 📡 4. REST API Endpoint Specification

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register new donor/receiver account | No |
| `POST` | `/api/auth/signin` | Authenticate user & return JWT token | No |
| `POST` | `/api/donation/donate` | Create a new food donation listing | Yes |
| `GET` | `/api/donation/` | List all available food donations | No |
| `GET` | `/api/donation/request` | Retrieve incoming requests for donor | Yes |
| `GET` | `/api/donation/history` | Retrieve completed past donations | Yes |
| `DELETE` | `/api/donation/:id` | Remove a donation entry | Yes |
| `POST` | `/api/donation/acceptRequest` | Accept a food request & send notifications | Yes |
| `POST` | `/api/donation/rejectRequest` | Reject a food request & reset food status | Yes |
| `POST` | `/api/donation/completeRequest`| Mark food handover as completed | Yes |
| `POST` | `/api/receiver/request` | Submit a request for available food | Yes |
| `GET` | `/health` | Server health check endpoint | No |

---

## 🎯 5. Comprehensive Technical Interview Questions & Answers

### 🔵 Category 1: Architecture & System Flow

#### Q1: Walk me through the high-level architecture of the Feed-Link project.
**Answer:**
Feed-Link follows a classic decoupled MERN client-server architecture:
- **Frontend Layer**: Built with React 19 and Vite. Uses React Router DOM for SPA client-side routing and Tailwind CSS/Framer Motion for styling and animations.
- **Backend API Layer**: Node.js and Express 5 REST APIs exposed under route groupings (`/api/auth`, `/api/donation`, `/api/receiver`).
- **Database & Services**: MongoDB Atlas accessed via Mongoose ODM for persistent storage, and Nodemailer connected via SMTP for asynchronous transactional email notifications.

---

#### Q2: Explain the lifecycle state machine of a food donation listing.
**Answer:**
A donation moves through specific state transitions:
1. **`available`**: Default state when a donor creates a listing via `/api/donation/donate`.
2. **`requested`**: Triggered when a receiver submits a claim request. A pending `Receiver` record is created.
3. **`accepted`**: Set when the donor approves the request (`acceptRequest`). Triggers parallel automated emails sending donor & receiver contact info to each other.
4. **`completed`**: Set when pickup is confirmed (`completeRequest`). The item moves into history logs.
5. **`expired`**: Set if current date exceeds `expiryDate` without fulfillment.

---

#### Q3: How did you implement parallel email dispatching in `acceptRequest.js` and why?
**Answer:**
When a donor accepts a request, both the donor and receiver must receive confirmation emails containing sensitive contact details for pickup. Instead of sequentially awaiting each email dispatch (which doubles latency and risks timing out the HTTP response):
```javascript
await Promise.all([
  transporter.sendMail({ to: receiverEmail, ... }),
  transporter.sendMail({ to: donorEmail, ... })
]);
```
Using `Promise.all` runs both email transport operations concurrently in non-blocking I/O, reducing execution time significantly and improving user responsiveness.

---

### 🟢 Category 2: Frontend (React, Vite, Tailwind & State)

#### Q4: Why did you choose Vite over Create React App (CRA)?
**Answer:**
Create React App uses Webpack under the hood, which pre-bundles the entire codebase before serving it during development. Vite leverages native ES Modules (ESM) in modern browsers, bundling code on-demand. This results in:
- Instant server start times (milliseconds vs. tens of seconds).
- Extremely fast Hot Module Replacement (HMR) regardless of application size.
- Optimized Rollup-based production builds.

---

#### Q5: How do you handle environment-specific API URLs in Vite?
**Answer:**
Vite exposes environment variables prefixed with `VITE_` via `import.meta.env`.
In `food-frontend/src/config/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default API_URL;
```
This ensures seamless transition between local development (`localhost:5000`) and production deployment (e.g., Vercel / Render backend URLs) without hardcoding values.

---

#### Q6: Explain how route handling is configured for deployment on Vercel (`vercel.json`).
**Answer:**
Single Page Applications (SPAs) use client-side routing. When a user directly visits a sub-route like `https://feed-link.com/donate`, the static hosting web server looks for a physical directory named `/donate`. Without rewrite rules, it returns a 404 error.
The `vercel.json` config resolves this:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This instructs Vercel to route all incoming requests back to `index.html`, allowing React Router to parse the URL client-side.

---

### 🟡 Category 3: Backend (Node.js, Express & Security)

#### Q7: Why is password hashing essential and how is `bcrypt` utilized in this app?
**Answer:**
Storing passwords in plain text is a severe security vulnerability. If the database is compromised, all user accounts are exposed.
`bcrypt` uses key stretching and unique salts:
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```
- **Salting**: Appends random data to each password prior to hashing, rendering pre-computed rainbow tables useless.
- **Cost Factor (`10`)**: Determines the CPU iterations required to compute the hash, making brute-force dictionary attacks computationally expensive.

---

#### Q8: What are ES Modules (`"type": "module"`) in Node.js backend and how do they differ from CommonJS (`require`)?
**Answer:**
In `package.json`, `"type": "module"` enables native ES6 `import/export` syntax instead of Node's legacy CommonJS `require()` / `module.exports`.
- **Static Analysis**: ES Modules are analyzed at compile-time, allowing tree-shaking and cleaner static imports.
- **Standardization**: Aligns backend JavaScript syntax directly with modern frontend React codebases.

---

#### Q9: What is CORS and why is `app.use(cors())` required?
**Answer:**
Cross-Origin Resource Sharing (CORS) is a browser security mechanism that restricts HTTP requests initiated from scripts running in one origin (e.g., `http://localhost:5173`) to a different origin (e.g., `http://localhost:5000`).
Using `express.json()` and `cors()` middleware configures HTTP headers (`Access-Control-Allow-Origin`) so the frontend client can perform `GET`, `POST`, `DELETE` operations without being blocked by browser browser cross-origin policy.

---

### 🔴 Category 4: Database (MongoDB & Mongoose)

#### Q10: How do references (`ref`) and `ObjectId` work in Mongoose schemas?
**Answer:**
In relational databases, foreign keys establish joins. In MongoDB/Mongoose, schema references store the `_id` of another document:
```javascript
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
```
When querying donations, Mongoose allows invoking `.populate("userId")` to dynamically join and substitute the `ObjectId` with the full `User` document.

---

#### Q11: How do Mongoose Schema built-in validations work?
**Answer:**
Mongoose enforces schema-level rules before writing data to MongoDB:
- **`required: true`**: Guarantees mandatory fields are provided.
- **`unique: true`**: Creates a unique index in MongoDB to prevent duplicate emails.
- **`match: /.+\@.+\..+/`**: Uses Regular Expressions to validate email formatting.
- **`enum: ["available", "requested", ...]`**: Restricts allowed values to a predefined white-list.

---

### 🟣 Category 5: System Design, Scalability & Advanced Scenarios

#### Q12: How would you scale Feed-Link to handle 500,000 active food listings and real-time location matching?
**Answer:**
To scale Feed-Link for high volume and location-based discovery:
1. **Geospatial Indexing**: Replace string locations with MongoDB 2DSphere GeoJSON coordinates (`[longitude, latitude]`). Use `$near` or `$geoWithin` queries to fetch donations within X kilometers of a receiver.
2. **Database Caching with Redis**: Cache active available listings in Redis in-memory storage to reduce DB disk read pressure.
3. **Asynchronous Message Queue**: Offload email dispatches from Express HTTP handlers to a background job queue (e.g., BullMQ with Redis).
4. **WebSocket / Push Notifications**: Use Socket.io or Web Push API to alert nearby receivers in real-time when a donor lists fresh food.

---

#### Q13: How do you prevent race conditions when two receivers attempt to claim the exact same food listing simultaneously?
**Answer:**
If two requests execute concurrently, both could read `status: "available"` before either updates it.
**Solutions**:
- **Atomic MongoDB Updates**: Use `findOneAndUpdate` with query conditions:
  ```javascript
  const updatedDonation = await donateModel.findOneAndUpdate(
    { _id: foodId, status: "available" },
    { status: "requested" },
    { new: true }
  );
  if (!updatedDonation) {
    return res.status(409).json({ message: "Food item already claimed." });
  }
  ```
- **Optimistic Locking / Transactions**: Use Mongoose sessions and transactions for multi-document ACID compliance.

---

## ⚡ 6. Summary Checklist for Interviews

- [x] **Project Elevator Pitch**: "Feed-Link is a full-stack MERN application that connects food donors with receivers to eliminate food waste using real-time requests, JWT authentication, and automated email workflows."
- [x] **Tech Highlights**: React 19, Vite, Tailwind CSS v4, Node 5, Express, MongoDB, Mongoose, Nodemailer, Bcrypt, JWT.
- [x] **Key Architecture Feature**: Concurrent email sending with `Promise.all` and idempotent status transition handlers.
- [x] **Security Practices**: Bcrypt password hashing, environment secret management, CORS configuration, schema input validation.

---
*Created for Feed-Link App Project Documentation & Technical Interview Preparation.*

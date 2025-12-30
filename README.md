// The provided content seems to be a duplicated section of a Markdown document describing a
// Microfinance Backend application. It includes details about the features, setup instructions, API
// routes, deployment information, and contributing guidelines.

// ...existing code...
# Microfinance Backend

Simple Express + MongoDB backend for a microfinance application.

## Features
- User authentication (register, login, logout)
- Loan application flow (apply, upload documents, guarantor, download slip)
- Admin routes for loan categories
- PDF loan slip generation
- Cloudinary file uploads

## Quick Start

Prerequisites:
- Node.js 18+
- MongoDB instance
- Cloudinary account (for file uploads)


Setup:
1. Install dependencies:
   npm install

2. Create a .env file (see `.env.example` if available) with:
   - MONGODB_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - PORT (optional)

3. Run in development:
   npm run dev

Start:
- Production: npm start
- Dev: npm run dev (uses nodemon)

See the server entry in [index.js](index.js) and scripts in [package.json](package.json).

## Main API Routes

Auth:
- POST /api/auth/register — register a new user ([src/routes/userAuth.routes.js](src/routes/userAuth.routes.js))
- POST /api/auth/login — login
- GET /api/auth/me — current user (protected)
- POST /api/auth/logout — logout
- PUT /api/auth/update-profile — update profile (uploads)

Loan:
- POST /api/loan/apply-loan — create basic loan (protected) ([src/routes/userloan.routes.js](src/routes/userloan.routes.js))
- PUT /api/loan/borrower-info — upload borrower documents (protected)
- POST /api/loan/guarantor — add guarantor (protected)
- GET /api/loan/my-loans — list user loans (protected)
- GET /api/loan/download-slip/:id — download generated loan slip (protected)
- Admin-only: manage loan categories (create/get/update)

## Deployment
Deployed at: https://// filepath: g:\haider7903\microfinance\README.md
// ...existing code...
# Microfinance Backend

Simple Express + MongoDB backend for a microfinance application.

## Features
- User authentication (register, login, logout)
- Loan application flow (apply, upload documents, guarantor, download slip)
- Admin routes for loan categories
- PDF loan slip generation
- Cloudinary file uploads

## Quick Start

Prerequisites:
- Node.js 18+
- MongoDB instance
- Cloudinary account (for file uploads)

Setup:
1. Install dependencies:
   npm install

2. Create a .env file (see `.env.example` if available) with:
   - MONGODB_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - PORT (optional)

3. Run in development:
   npm run dev

Start:
- Production: npm start
- Dev: npm run dev (uses nodemon)

See the server entry in [index.js](index.js) and scripts in [package.json](package.json).

## Main API Routes

Auth:
- POST /api/auth/register — register a new user ([src/routes/userAuth.routes.js](src/routes/userAuth.routes.js))
- POST /api/auth/login — login
- GET /api/auth/me — current user (protected)
- POST /api/auth/logout — logout
- PUT /api/auth/update-profile — update profile (uploads)

Loan:
- POST /api/loan/apply-loan — create basic loan (protected) ([src/routes/userloan.routes.js](src/routes/userloan.routes.js))
- PUT /api/loan/borrower-info — upload borrower documents (protected)
- POST /api/loan/guarantor — add guarantor (protected)
- GET /api/loan/my-loans — list user loans (protected)
- GET /api/loan/download-slip/:id — download generated loan slip (protected)
- Admin-only: manage loan categories (create/get/update)

## Deployment
Deployed at: [https://](https://microfinance-56ai.onrender.com/)

Contributing
- Follow existing code style. Routes/controllers are in src/controllers and src/routes. Models are in src/models.

License
- ISC
// ...existing code...

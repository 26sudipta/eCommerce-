# E-Commerce Backend API

Backend server for the Smart E-Commerce Platform built with Express.js, MongoDB, and Firebase Authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- MongoDB Atlas connection string
- Firebase Admin SDK credentials
- Other configuration

### 3. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js                  # MongoDB connection
│   └── firebase-admin.js      # Firebase Admin SDK setup
├── models/
│   ├── User.js                # User schema
│   ├── Product.js             # Product schema
│   ├── Order.js               # Order schema
│   ├── Review.js              # Review schema
│   └── Contact.js             # Contact form schema
├── routes/
│   ├── auth.routes.js         # Authentication routes
│   ├── product.routes.js      # Product CRUD routes
│   ├── order.routes.js        # Order management routes
│   ├── review.routes.js       # Review routes
│   └── contact.routes.js      # Contact form routes
├── controllers/               # Route handlers (to be implemented)
├── middleware/
│   ├── auth.middleware.js     # JWT/Firebase token verification
│   └── admin.middleware.js    # Admin authorization
├── server.js                  # Main entry point
└── package.json
```

## 🔑 Environment Variables

Required variables in `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FRONTEND_URL=http://localhost:5173
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-token` - Verify Firebase token
- `GET /api/auth/user/:uid` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:cat` - Get products by category
- `POST /api/products/seed` - Seed from DummyJSON
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Cancel order
- `PATCH /api/orders/:id/status` - Update status (Admin)

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/product/:id` - Get product reviews
- `POST /api/reviews` - Submit review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get messages (Admin)

## 🔒 Authentication

Uses Firebase Authentication with Admin SDK for token verification.

**Protected routes require:**
```javascript
Authorization: Bearer <firebase_token>
```

## 📦 DummyJSON Integration

The product API will fetch initial data from DummyJSON:
```
https://dummyjson.com/products
```

All products are stored in MongoDB for CRUD operations.

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📝 Next Steps

1. ✅ Setup MongoDB Atlas cluster
2. ✅ Create Firebase project and get credentials
3. ⏳ Implement controllers for routes
4. ⏳ Test API endpoints
5. ⏳ Deploy to Render/Railway

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your connection string
- Whitelist your IP in MongoDB Atlas

**Firebase Error:**
- Verify your service account credentials
- Check private key formatting (newlines)

**CORS Error:**
- Update `FRONTEND_URL` in `.env`
- Check frontend is running on correct port

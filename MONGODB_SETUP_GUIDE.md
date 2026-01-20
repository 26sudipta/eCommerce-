# MongoDB Atlas Setup Guide - Complete Tutorial

This guide will walk you through setting up MongoDB Atlas (cloud database) for your E-Commerce project.

---

## 📋 What You'll Get
- Free cloud MongoDB database
- 512MB storage (plenty for your project)
- Connection string for your backend
- No credit card required

---

## 🚀 Step-by-Step Setup

### **Step 1: Create MongoDB Atlas Account**

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   
2. **Sign Up Options:**
   - Option A: Sign up with Google (recommended - fastest)
   - Option B: Sign up with email
     - Enter your email
     - Create a password (min 8 characters)
     - First Name and Last Name
     - Click "Create your Atlas account"

3. **Verify Email (if using email signup):**
   - Check your inbox
   - Click verification link
   - Return to MongoDB Atlas

---

### **Step 2: Create Your Organization & Project**

1. **Welcome Screen:**
   - You might see "Welcome to Atlas"
   - Click "Build a Database" or "Create"

2. **Choose Deployment Type:**
   - You'll see three options:
     - **Serverless** (pay as you go)
     - **Dedicated** (paid)
     - **Shared** (FREE) ← Choose this one
   - Click **"Create"** under **Shared** (M0 Free Tier)

3. **Configure Cluster:**
   
   **Cloud Provider & Region:**
   - **Provider:** AWS, Google Cloud, or Azure (any works)
   - **Region:** Choose closest to you for better speed
     - For USA: `us-east-1 (N. Virginia)` or `us-west-2 (Oregon)`
     - For Europe: `eu-west-1 (Ireland)`
     - For Asia: `ap-south-1 (Mumbai)`
   - Look for **"FREE TIER AVAILABLE"** tag
   
   **Cluster Tier:**
   - Should show **M0 Sandbox** (FREE)
   - 512MB Storage
   - Shared RAM
   
   **Cluster Name:**
   - Default: `Cluster0` (you can rename if you want)
   - Example: `EcommerceCluster`
   
   **Additional Settings:**
   - Leave default (MongoDB version, etc.)
   
4. **Click "Create Cluster"**
   - Takes 1-3 minutes to provision
   - You'll see a loading screen

---

### **Step 3: Setup Database Access (Create User)**

While cluster is creating, you'll be prompted for security setup:

1. **Authentication Method:**
   - Choose **"Username and Password"** (recommended)
   
2. **Create Database User:**
   ```
   Username: admin
   Password: [Click "Autogenerate Secure Password"]
   ```
   - **IMPORTANT:** Copy and save the password somewhere safe!
   - Or create your own password (min 8 characters, no special shell characters)
   
3. **Database User Privileges:**
   - Select **"Read and write to any database"** (default)
   - Or choose **"Atlas Admin"** for full access

4. **Click "Create User"**

---

### **Step 4: Setup Network Access (IP Whitelist)**

1. **Where to Connect From:**
   - You'll see "Where would you like to connect from?"

2. **Add IP Address:**
   
   **Option A: Allow Access from Anywhere (EASIEST for development)**
   - Click **"Add My Current IP Address"**
   - Then click **"Add a Different IP Address"**
   - Enter: `0.0.0.0/0`
   - Description: `Allow all IPs`
   - Click **"Add Entry"**
   - ⚠️ Note: Only for development, restrict in production!

   **Option B: Add Your Current IP Only (MORE SECURE)**
   - Click **"Add My Current IP Address"**
   - It will auto-detect: `123.45.67.89/32`
   - Click **"Add Entry"**
   - Note: You'll need to add IP every time your IP changes

3. **Click "Finish and Close"**

---

### **Step 5: Get Your Connection String**

1. **Navigate to Cluster:**
   - Click on **"Database"** in left sidebar
   - You should see your cluster (e.g., `Cluster0`)
   - Status should be green and say "Active"

2. **Connect to Cluster:**
   - Click **"Connect"** button on your cluster

3. **Choose Connection Method:**
   - Select **"Drivers"**
   - Driver: **Node.js**
   - Version: **5.5 or later** (or latest)

4. **Copy Connection String:**
   - You'll see something like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Modify Connection String:**
   - Replace `<username>` with your actual username (e.g., `admin`)
   - Replace `<password>` with your actual password
   - Add database name before the `?`:
   
   **Before:**
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   
   **After:**
   ```
   mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
   
   - `ecommerce` is your database name (you can name it anything)

---

### **Step 6: Add Connection String to Your Project**

1. **Navigate to your project:**
   ```bash
   cd /home/sudipta/WEV_APP/tools_final/ecommerce/server
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file:**
   ```bash
   nano .env
   # or use any text editor
   ```

4. **Add your connection string:**
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Replace with YOUR connection string
   MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   
   # Other configs (add these later when you setup Firebase)
   FIREBASE_PROJECT_ID=
   FIREBASE_PRIVATE_KEY=
   FIREBASE_CLIENT_EMAIL=
   FRONTEND_URL=http://localhost:5173
   ```

5. **Save and close**

---

### **Step 7: Test MongoDB Connection**

1. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start the server:**
   ```bash
   npm run dev
   ```

3. **Look for success message:**
   ```
   ✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
   🚀 Server running on http://localhost:5000
   ```

4. **Test health check:**
   - Open browser: http://localhost:5000/api/health
   - Should see:
   ```json
   {
     "status": "OK",
     "message": "E-Commerce API is running",
     "timestamp": "2026-01-21T..."
   }
   ```

---

## 🗂️ Explore Your Database (Optional)

### **Using MongoDB Atlas UI:**

1. **Go to Database Tab:**
   - Click **"Database"** in left sidebar
   - Click **"Browse Collections"** on your cluster

2. **View Collections:**
   - You'll see your database: `ecommerce`
   - Collections will appear after you add data:
     - `users`
     - `products`
     - `orders`
     - `reviews`
     - `contacts`

### **Using MongoDB Compass (Desktop App):**

1. **Download Compass:**
   - Visit: https://www.mongodb.com/try/download/compass
   - Install for your OS

2. **Connect:**
   - Open Compass
   - Paste your connection string
   - Click "Connect"

3. **Explore:**
   - Visual interface to browse data
   - Run queries
   - Import/export data

---

## 🛠️ Common Issues & Solutions

### **Issue 1: "Authentication failed"**
**Problem:** Wrong username or password in connection string

**Solution:**
- Go to Database Access in Atlas
- Reset user password
- Update connection string with new password
- Make sure password doesn't contain special characters like `@`, `:`, `/`
  - If it does, URL encode them:
    - `@` → `%40`
    - `:` → `%3A`
    - `/` → `%2F`

### **Issue 2: "MongoServerSelectionError: connection timed out"**
**Problem:** Your IP is not whitelisted

**Solution:**
- Go to Network Access in Atlas
- Add your current IP: `0.0.0.0/0` (for dev)
- Wait 2-3 minutes for changes to apply

### **Issue 3: "Database name not specified"**
**Problem:** Missing database name in connection string

**Solution:**
```
❌ Wrong:
mongodb+srv://admin:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true

✅ Correct:
mongodb+srv://admin:pass@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true
```

### **Issue 4: "Connection string is invalid"**
**Problem:** Malformed connection string

**Solution:**
- Check for spaces in connection string
- Ensure `<password>` is replaced with actual password
- Ensure `<username>` is replaced with actual username
- Format: `mongodb+srv://USER:PASS@HOST/DATABASE?OPTIONS`

### **Issue 5: "MongooseServerSelectionError"**
**Problem:** Server can't reach MongoDB

**Solutions:**
1. Check internet connection
2. Check firewall settings
3. Try different network (mobile hotspot)
4. Verify cluster is running (green status in Atlas)

---

## 📊 Monitor Your Database

### **Database Usage:**
1. Go to **"Metrics"** tab in Atlas
2. See:
   - Connections
   - Operations per second
   - Network usage
   - Storage size

### **Connection Limit:**
- Free tier: 100 connections max
- Your app uses 1-5 connections typically

### **Storage Limit:**
- Free tier: 512MB
- Plenty for thousands of products and orders

---

## 🔐 Security Best Practices

### **For Development:**
- ✅ Use `0.0.0.0/0` for easy testing
- ✅ Use strong password

### **For Production:**
1. **Restrict IP Access:**
   - Remove `0.0.0.0/0`
   - Add only server IPs (e.g., Render, Railway IPs)

2. **Use Environment Variables:**
   - Never commit `.env` file to Git
   - Add `.env` to `.gitignore`

3. **Rotate Credentials:**
   - Change passwords periodically
   - Use different users for dev/production

4. **Enable Encryption:**
   - Atlas encrypts data by default
   - Use TLS/SSL (already in connection string)

---

## 🎯 Quick Reference

### **Important URLs:**
- Atlas Dashboard: https://cloud.mongodb.com
- Documentation: https://docs.mongodb.com
- Compass Download: https://www.mongodb.com/try/download/compass

### **Your Credentials:**
```
Cluster Name: [Your cluster name]
Username: [Your database user]
Password: [Your password]
Database Name: ecommerce
Connection String: [Save in .env file]
```

### **Atlas Navigation:**
- **Database:** View clusters and collections
- **Database Access:** Manage users
- **Network Access:** Manage IP whitelist
- **Metrics:** Monitor performance
- **Backups:** (Paid feature)

---

## ✅ Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free M0 cluster
- [ ] Created database user with password
- [ ] Added IP address to whitelist (`0.0.0.0/0`)
- [ ] Got connection string
- [ ] Modified connection string with credentials
- [ ] Added database name to connection string
- [ ] Added to `.env` file in server folder
- [ ] Tested connection (server starts successfully)
- [ ] Saw "MongoDB Connected" message

---

## 🚀 Next Steps

After MongoDB is connected:
1. ✅ Setup Firebase Authentication
2. ✅ Implement backend controllers
3. ✅ Seed products from DummyJSON
4. ✅ Test API endpoints
5. ✅ Connect frontend

---

## 💡 Pro Tips

1. **Backup Your Credentials:**
   - Save username, password, connection string in a secure place

2. **Use MongoDB Compass:**
   - Easier to visualize data than Atlas UI
   - Great for debugging

3. **Collections Auto-Create:**
   - You don't need to create collections manually
   - Mongoose creates them when you insert first document

4. **Test Queries:**
   - Use Atlas Data Explorer or Compass
   - Practice MongoDB queries before coding

5. **Monitor Free Tier:**
   - Check usage in Metrics tab
   - 512MB is usually enough for student projects

---

## 📞 Need Help?

**MongoDB Support:**
- Documentation: https://docs.atlas.mongodb.com
- Community Forums: https://www.mongodb.com/community/forums
- University (Free Courses): https://university.mongodb.com

**Common Resources:**
- Connection String Format: https://docs.mongodb.com/manual/reference/connection-string
- Security Checklist: https://docs.atlas.mongodb.com/security-checklist
- Troubleshooting: https://docs.atlas.mongodb.com/troubleshoot-connection

---

**Ready to connect!** 🎉

Once you see "✅ MongoDB Connected" in your terminal, you're all set!

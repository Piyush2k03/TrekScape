# Admin User Setup Guide

## Method 1: Using the Create Admin Script (Recommended)

1. **Run the script:**
   ```bash
   cd backend
   npm run create-admin
   ```

2. **Default Admin Credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`
   - Username: `admin`

3. **Custom Admin Credentials:**
   Create a `.env` file in the backend directory (if you don't have one) and add:
   ```env
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD=your-secure-password
   ADMIN_USERNAME=your-admin-username
   ```
   Then run: `npm run create-admin`

## Method 2: Using MongoDB Compass / MongoDB Shell

1. **Connect to your MongoDB database**

2. **Find your database** (usually named based on your connection string)

3. **Navigate to the `users` collection**

4. **Insert a new document** or update an existing user:
   ```json
   {
     "username": "admin",
     "email": "admin@example.com",
     "password": "$2a$10$YourHashedPasswordHere",
     "role": "admin"
   }
   ```

   **Note:** You need to hash the password using bcrypt. The hash should look like: `$2a$10$...`

   **Quick hash generator:** You can use the createAdmin script to generate a hash, or use an online bcrypt generator.

## Method 3: Update Existing User via MongoDB

1. **Find an existing user** in your `users` collection

2. **Update the `role` field** to `"admin"`:
   ```javascript
   // In MongoDB shell
   db.users.updateOne(
     { email: "existing-user@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Login with that user's credentials** - they will now have admin access

## Method 4: Use the Admin Panel (if you can access it)

If you already have admin access through another user:
1. Login as that admin
2. Go to `/admin/users`
3. Edit a user and change their role to "admin"

---

## Important Notes:

- ⚠️ **Change the default password** after first login for security
- 🔒 **Keep admin credentials secure** - never commit them to version control
- 📝 The `role` field must be exactly `"admin"` (lowercase) to work
- 🔐 Passwords are hashed using bcrypt before storage

## Troubleshooting:

- **"Admin user already exists"**: The script will update the existing user to admin role
- **"MongoDB connection failed"**: Make sure your `.env` file has the correct `MONGO_URI`
- **"Invalid credentials"**: Double-check the email and password you're using to login



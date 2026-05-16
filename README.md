# Admission Odisha - Project Setup Guide

This project consists of a **React Frontend** (Vite) and a **Yii2 PHP Backend**.

## Prerequisites
- **Node.js** (v18+)
- **PHP** (v7.4+)
- **Composer**
- **MySQL**

## 🚀 Getting Started

### 1. Database Setup
- Create a MySQL database named `admission_odisha`.
- Import the SQL file located at `database/admission_odisha.sql` into your new database.
- Configure your database credentials in `backend/config/db.php`.

### 2. Backend Setup (Yii2)
```bash
cd backend
composer install
```
- Create a file `backend/config/secrets.php` (if it doesn't exist) to store your secrets (like Gmail App Password for mail functionality):
```php
<?php
return [
    'gmail_app_password' => 'your-app-password-here',
];
```
- Start the PHP server:
```bash
php yii serve --port=8080
```
The backend should now be running at `http://localhost:8080`.

### 3. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
```
- Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8080/index.php
```
- Start the development server:
```bash
npm run dev
```
The frontend should now be running at `http://localhost:5173`.

## ⚠️ Common Issues
- **CORS Errors**: Ensure the backend `SiteController.php` includes your frontend origin in its `corsFilter`.
- **404 API Errors**: Ensure the `VITE_API_BASE_URL` in your `.env` correctly points to the `index.php` of your backend.
- **Missing Images**: Images are linked relative to the backend. Ensure the backend is running and the paths in the database match your local setup.

## 🌐 Deployment Note
If you are pushing this to GitHub for others to see:
1. **GitHub Pages** only supports static sites. It **cannot** run the PHP backend.
2. To make it work online, you need to host the backend on a service that supports PHP/MySQL (like Heroku, DigitalOcean, or Shared Hosting) and update the `VITE_API_BASE_URL` to point to the live URL.
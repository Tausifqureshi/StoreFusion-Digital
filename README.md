# 🚀 StoreFusion Digital — Premium Full-Stack E-Commerce Platform

<div align="center">

[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite 7](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.7-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-0C2340?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)

**A modern, responsive full-stack e-commerce web application featuring real-time Firebase authentication, Redux-persist cart caching, interactive customer testimonials & reviews, and secure Razorpay payment checkout.**

[🌐 Live Demo](#-live-demo) • [🛠️ Tech Stack](#️-tech-stack) • [✨ Top Features](#-top-features) • [📸 Screenshots](#-project-screenshots)

</div>

---

## 🌐 Live Demo
Experience the live application in production:

- **Primary Live URL**: [https://storefusion-digital.vercel.app](https://storefusion-digital.vercel.app)
- **Alternative Mirror**: [https://e-commerce-storefusion.web.app](https://e-commerce-storefusion.web.app)

> [!TIP]
> **Testing the Demo:**
> - Try adding products to your cart and refreshing — your cart persists automatically via `redux-persist`.
> - Test the **Interactive Testimonial & Review System** on any Product Details page to submit reviews with 5-star ratings.
> - Log in to test secure Razorpay checkout and protected Admin Dashboard features.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18 (`v18.3.1`), Vite (`v7.3.1`), React Router DOM (`v7`) |
| **State Management** | Redux Toolkit (`v2.2.7`), `redux-persist` (`v6.0.0`) |
| **Styling & UI** | Tailwind CSS (`v3.4`), Material UI (`@mui/material`), Framer Motion |
| **Backend & Database** | Firebase Authentication, Firebase Firestore / Realtime DB |
| **Payment & Charts** | Razorpay Payment SDK, Chart.js (`v4.4`) |

---

## ✨ Top Features

| 🚀 Feature | 💡 Description | ⚙️ Key Tech / Highlight |
| :--- | :--- | :--- |
| ⭐ **Interactive Testimonial & Review System** | End-to-end customer review management with 5-star ratings, verified buyer badges, and real-time Firebase DB sync. | `AddTestimonial.jsx`<br/>**Firebase RTDB Sync** |
| 🛒 **Redux-Persist Shopping Cart** | Persistent cart across browser sessions and page refreshes without data loss, with real-time tax & subtotal calculation. | `redux-persist`<br/>**Instant Price Calculation** |
| 🔍 **Instant Catalog Search & Multi-Filters** | Filter products by Category (Electronics, Fashion, Home Decor), customizable price slider, and instant keyword search. | `/allproducts`<br/>**Instant UI Filtering** |
| 🔐 **Firebase Authentication & Security** | Secure user registration, sign-in, auth state persistence, and protected routes for checkout & admin views. | `Firebase Auth`<br/>**Protected Routes** |
| 💳 **Secure Razorpay Payment Gateway** | Integrated checkout modal for seamless UPI, Debit/Credit Card, NetBanking, and Wallet payments. | `Razorpay SDK`<br/>**Secure Transactions** |
| 📊 **Comprehensive Admin Dashboard** | Centralized `/admin` control panel to manage inventory, monitor customer orders, and moderate reviews. | `/admin`<br/>**Chart.js Analytics** |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Tausifqureshi/StoreFusion-Digital.git

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

---

## 📸 Project Screenshots

### 1️⃣ Home Page & Promotional Hero Section
![Home Page](./public/screenshots/home_page.png)

---

### 2️⃣ Product Catalog & Instant Multi-Category Filters
![Products Catalog](./public/screenshots/products_catalog.png)

---

### 3️⃣ Product Info & Interactive Customer Testimonials
![Customer Testimonials](./public/screenshots/product_reviews.png)

---

### 4️⃣ Shopping Cart & Secure Razorpay Checkout
![Cart & Secure Checkout](./public/screenshots/cart_checkout.png)

---

<div align="center">

**Built with ❤️ for High-Performance E-Commerce Experiences.**

</div>

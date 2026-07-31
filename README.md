# StoreFusion Digital

<div align="center">

[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite 7](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.7-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-0C2340?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)

**A full-stack e-commerce application built with React, Redux Toolkit, and Firebase, featuring interactive customer reviews, persistent cart state, and integrated Razorpay payments.**

[Live Demo](#live-demo) • [Tech Stack](#tech-stack) • [Key Features](#key-features) • [Quick Start](#quick-start) • [Screenshots](#project-screenshots)

</div>

---

## Short Project Description

StoreFusion Digital is a production-ready single-page e-commerce application designed to provide a complete customer purchasing workflow. It integrates real-time database operations, user authentication, responsive design, and payment processing. The application emphasizes state persistence, component reusability, and clean data flow architecture.

---

## Live Demo

- **Production Deployment:** [https://storefusion-digital.vercel.app](https://storefusion-digital.vercel.app)
- **Mirror Deployment:** [https://e-commerce-storefusion.web.app](https://e-commerce-storefusion.web.app)

> [!TIP]
> **Testing Instructions:**
> - Add items to the cart and refresh the page to observe automatic local state persistence via `redux-persist`.
> - Navigate to any product details page to test the interactive testimonial submission and 5-star rating flow.
> - Sign in with test credentials to evaluate protected checkout and administration features.

---

## Tech Stack

- **Frontend Core:** React 18 (`v18.3.1`), Vite (`v7.3.1`), React Router DOM (`v7.14.0`)
- **State Management:** Redux Toolkit (`v2.2.7`), `redux-persist` (`v6.0.0`)
- **Styling & UI:** Tailwind CSS (`v3.4.12`), Material UI (`@mui/material`), Framer Motion, Emotion
- **Backend Services:** Firebase Authentication, Firebase Realtime Database / Firestore (`v12.10.0`)
- **Payment Processing:** Razorpay Checkout Gateway SDK
- **Data Visualization:** Chart.js (`v4.4.4`), `react-chartjs-2`

---

## Key Features

- **Interactive Testimonials & Review System:** Full review management allowing authenticated users to submit, edit, and delete feedback with 5-star ratings, synced with Firebase (`AddTestimonial.jsx`, `SingleReviewCard.jsx`).
- **Persistent Shopping Cart:** Utilizes `redux-persist` to store cart contents across browser reloads, calculating real-time subtotals, shipping, and tax.
- **Dynamic Catalog Filtering:** Supports instant search queries, category filters (Electronics, Fashion, Home Decor), and price range adjustments on `/allproducts`.
- **User Authentication & Authorization:** Implements secure Firebase sign-up, sign-in, session retention, and route protection for order histories and administrative tools.
- **Integrated Payment Gateway:** Seamless Razorpay payment checkout modal supporting UPI, Debit/Credit Cards, NetBanking, and Wallets.
- **Administrative Console:** Dedicated `/admin` route for inventory monitoring, customer order management, and moderation of customer reviews.

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Tausifqureshi/StoreFusion-Digital.git
cd StoreFusion-Digital
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view the application.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## Project Screenshots

### 1. Home Page & Hero Section
![Home Page](./public/screenshots/home_page.png)

---

### 2. Product Catalog & Category Filters
![Products Catalog](./public/screenshots/products_catalog.png)

---

### 3. Product Details & Interactive Customer Reviews
![Customer Testimonials](./public/screenshots/product_reviews.png)

---

### 4. Shopping Cart & Razorpay Checkout
![Cart & Secure Checkout](./public/screenshots/cart_checkout.png)

---

## Developer Information

- **Developer:** Tausif Qureshi
- **GitHub:** [https://github.com/Tausifqureshi](https://github.com/Tausifqureshi)
- **Repository:** [StoreFusion-Digital](https://github.com/Tausifqureshi/StoreFusion-Digital)
- **License:** MIT License

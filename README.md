# Shopee Clone

## Project Overview

**Shopee Clone** is an e-commerce web application developed by **Lê Vũ Hoàng**, replicating the core functionalities of a real-world shopping platform.

Key features include:

- User registration, login, and authentication
- Product listing with pagination, filtering, sorting, and searching
- Product detail view
- Shopping cart and checkout flow
- User profile update with avatar upload

The app is built with **React 19**, **TypeScript**, and **Vite** for a modern and efficient development environment.  
Forms are handled using **React Hook Form** + **Yup**, async state is managed by **React Query**, and the UI is fully responsive thanks to **Tailwind CSS 4**.  
API communication is handled via **Axios**.

---

## 🚀 Tech Stack

- **React 19**
- **Vite** (Build tool)
- **TypeScript**
- **Tailwind CSS 4**
- **React Query 5** (Data fetching & caching)
- **React Hook Form** + **Yup** (Form management & validation)
- **React Router DOM 7**
- **React Toastify** (Toast notifications)
- **Axios** (HTTP client)
- **ESLint** + **Prettier** (Code linting & formatting)

---

## Core Features

| Feature                   | HTTP Route                       | Description                                             |
| ------------------------- | -------------------------------- | ------------------------------------------------------- |
| Register                  | `POST /register`                 | Create a new user account                               |
| Login                     | `POST /login`                    | Receive access token                                    |
| Logout                    | `POST /logout`                   | Invalidate user session                                 |
| Get current user info     | `GET /me`                        | Returns current user's data                             |
| List products             | `GET /products`                  | Supports filtering, searching, sorting                  |
| Product detail            | `GET /products/:id`              | View product details by ID                              |
| Get product categories    | `GET /categories`                | Used for filtering products                             |
| Add to cart               | `POST /purchases/add-to-cart`    | Add product to cart (with `product_id` and `buy_count`) |
| Get cart / orders         | `GET /purchases?status=...`      | `-1`: cart, `0`: all, `1~5`: specific order status      |
| Update cart item quantity | `PUT /purchases/update-purchase` | Modify quantity of items in cart                        |
| Remove from cart          | `DELETE /purchases`              | Remove items by `purchase_id` array                     |
| Checkout                  | `POST /purchases/buy-products`   | Submit an order with selected products                  |
| Update user profile       | `PUT /user`                      | Update name, password, avatar, etc.                     |
| Upload avatar             | `POST /user/upload-avatar`       | Upload profile picture using `FormData`                 |

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Author

_Lê Vũ Hoàng_
Frontend Developer
📧 Email: levuhoangks@gmail.com

Zembil E-Commerce – Backend

The Zembil E-Commerce Backend is the server-side implementation of the Zembil platform — a niche-focused e-commerce system for Men, Women, and Kids’ clothing.
It provides secure authentication, product management, order processing, delivery assignment, and role-based dashboards for customers, admins, and delivery staff.

-Features

User Authentication & Roles

JWT-based secure login & registration.

Roles: Customer, Admin, Delivery Staff.

Product & Category Management

Products with descriptions, images, price, and sizes.

Categories (Men, Women, Kids) with filtering.

Shopping Cart & Orders

Cart system with multiple items, sizes, and quantities.

Orders linked to users and shipping addresses.

Automatic total price calculation.

Delivery & Order Tracking

Orders assigned to delivery staff based on zones.

Delivery dashboard for staff to manage assigned orders.

Status updates: Processing → Shipped → Delivered.

Admin Dashboard

Manage products, categories, staff, and orders.

Register delivery staff and assign zones.

Reviews

Users can rate and review products.

🛠 Tech Stack

Backend: Node.js, Express.js

Database: PostgreSQL (with Sequelize ORM)

Authentication: JWT & BCrypt.js

Other Tools:

dotenv – environment variables

cors – Cross-origin support
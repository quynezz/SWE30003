# Long Chau Pharmacy 🩺

![Long Chau Logo](src/assets/logo.jpg)Welcome to **Long Chau Pharmacy**, Vietnam's premier online pharmacy platform designed to make healthcare accessible, convenient, and reliable. This web application provides a seamless user experience for browsing medicines, locating stores, managing orders, and more, all wrapped in a modern, responsive, and user-friendly interface.

---

## 🚀 Project Overview

Long Chau Pharmacy is a full-stack web application built to simplify healthcare access for millions of users. With a focus on user experience, accessibility, and performance, this project offers a robust platform for purchasing medicines, uploading prescriptions, and finding nearby pharmacy locations. The application is designed with a clean, modern UI and leverages cutting-edge technologies to ensure a delightful experience.

---

## ✨ Features

- **User Authentication**: Secure sign-up and login functionality with email and Google OAuth support, featuring real-time form validation and error handling.
- **Product Browsing**: Explore a wide range of medicines with a responsive product catalog, complete with search and filter options.
- **Order Management**: Seamless order placement with detailed order confirmation and summary pages, including pricing, discounts, and shipping details.
- **Store Locator**: Interactive store locator with filtering by services and proximity, featuring a placeholder for future map integration.
- **Responsive Design**: Fully responsive UI optimized for mobile, tablet, and desktop devices, ensuring a consistent experience across all screen sizes.
- **Accessibility**: ARIA-compliant components with keyboard navigation support to ensure inclusivity for all users.
- **Animations**: Smooth animations using Framer Motion to enhance user engagement and experience.
- **Real-time Feedback**: Toast notifications for user actions, providing instant feedback on form submissions and errors.

---

## 🛠️ Technologies Used

- **Frontend**:
  - React - JavaScript library for building user interfaces
  - React Router - For client-side routing
  - Tailwind CSS - Utility-first CSS framework for styling
  - Framer Motion - For animations and transitions
  - PrimeReact - UI components (Toast notifications)
  - Lucide React - Icon library for modern, accessible icons
- **Tools & Utilities**:
  - Vite - Fast frontend build tool
  - ESLint - For code linting and maintaining code quality
  - Prettier - For consistent code formatting
- **Other**:
  - LocalStorage for cart persistence
  - Simulated API calls for demo purposes

---

## 🏗️ Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/long-chau-pharmacy.git
   cd long-chau-pharmacy
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open the application**: Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## 🚀 Usage

1. **Sign Up/Login**:

   - Create a new account or sign in using the `/signup` or `/login` routes.
   - Use Google OAuth for quick authentication (simulated in this version).
   - Real-time validation ensures accurate input with clear error messages.

2. **Browse Products**:

   - Visit the `/products` route to explore available medicines.
   - Use search and filter options to find specific products.

3. **Place an Order**:

   - Add items to your cart and proceed to checkout.
   - View the order confirmation on the `/order-success` page with detailed pricing and order ID.

4. **Find a Store**:

   - Navigate to the `/store-locator` page to find nearby Long Chau pharmacies.
   - Filter by services or search by name/address.

5. **Upload Prescription**:

   - Use the `/prescription` route to upload prescriptions (feature placeholder).

---

## 📂 Project Structure

```
long-chau-pharmacy/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images and icons
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Shadcn UI components
│   ├── data/                  # Mock data (e.g., featuredProducts.js)
│   ├── lib/                   # Utility functions (e.g., cn.js)
│   ├── pages/                 # Page components (e.g., SignUpForm.jsx, Hero.jsx)
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
├── README.md                  # Project documentation
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                # Prettier configuration
```

---

## 🤝 Contributing

We welcome contributions to enhance Long Chau Pharmacy! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit: `git commit -m "Add your feature"`.
4. Push to your branch: `git push origin feature/your-feature-name`.
5. Open a pull request with a detailed description of your changes.

Please follow the Code of Conduct and ensure your code adheres to the project's ESLint and Prettier configurations.

---

## 📜 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the license terms.

---

## 🙌 Acknowledgements

- Shadcn UI for beautiful, accessible components
- PrimeReact for toast notifications
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling
- Lucide Icons for modern iconography

---

## 📬 Contact

For questions, suggestions, or feedback, reach out via:

- **GitHub Issues**: Create an issue
- **Email**: your-email@example.com

Follow us on X for updates!

---

*Built by *Lau Ngoc Quyen*, *Nguyen Thuan Khang*, *Le Ba Tung* ❤️ .*

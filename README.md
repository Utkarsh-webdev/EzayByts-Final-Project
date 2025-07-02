# EventHub 🎉 - Event Management Platform

EventHub is a full-featured Event Management Web App where users can explore, book, and manage events, while administrators can create and monitor event analytics.

---

## 🚀 Live Demo

🔗 [Visit EventHub on Vercel](https://event-hub-zeta.vercel.app/)

---

## 🛠️ Features

### 🧑‍💻 User Features:

* 🔐 Register / Login (Firebase Authentication)
* 📅 Browse all events
* 🔍 Search & filter by category
* 🎟️ Book events instantly
* 📥 View "My Bookings" Dashboard

### 🛠️ Admin Features:

* 🔑 Admin-only route protection
* 📊 Admin Dashboard with analytics
* ➕ Create, ✏️ Edit, ❌ Delete events
* 📈 View total bookings, users, events

---

## 🧱 Tech Stack

| Layer      | Tech                              |
| ---------- | --------------------------------- |
| Frontend   | React, Vite, Tailwind CSS         |
| Auth & DB  | Firebase Auth, Firestore Database |
| Deployment | Vercel (Frontend Hosting)         |

---

## 🧑‍💻 Project Setup

```bash
# Clone the repo
https://github.com/your-username/eventhub.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 📁 Folder Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, AdminRoute)
├── context/          # AuthContext for global state
├── pages/            # Route pages (Home, Events, Login, Dashboard, etc.)
├── firebase.js       # Firebase configuration
├── App.jsx           # Main app entry with routing
└── index.css         # Tailwind styles
```

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication → Email/Password
4. Create Firestore Database (in test mode)
5. Replace your config in `src/firebase.js`:

```js
// src/firebase.js
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};
```

---

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo → Auto-detect React
4. Set build command:

   * `npm run build`
   * Output dir: `dist` (for Vite)
5. Click **Deploy** 🚀

---

## 📸 Screenshots

> Add screenshots in `/assets/` and link here:

```
![Home Page](./assets/home.png)
![Admin Panel](./assets/admin-dashboard.png)
```

---

## 📧 Contact

For queries or collaboration, reach out to:

* **Name**: Utkarsh Jha
* **Email**: [utkarshjha832@gmail.com](mailto:utkarshjha832@gmail.com)
* **LinkedIn**: [Connect](https://linkedin.com/in/utkarshjha)

---

## 🧾 License

[MIT](LICENSE)

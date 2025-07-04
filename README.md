# 📝 To-Do List Web App – MERN Stack Project

## 📁 Project Structure

```
MERN-Todo-App/
├── todofrontend/       // React Frontend with Tailwind CSS
└── todobackend/       // Node.js + Express + MongoDB Backend
```

---

## 🚀 Live Demo

* **Frontend (Vercel)**: [https://mern-todo-app-lilac.vercel.app/](https://mern-todo-app-lilac.vercel.app/)
* **Backend (Railway)**: [https://mern-todo-app-production-b3c1.up.railway.app/](https://mern-todo-app-production-b3c1.up.railway.app/)

---

## 🛠 Tech Stack

### 🔹 Frontend

* React.js
* React Router
* Tailwind CSS

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (with Mongoose)

### 🔐 Authentication

* bcryptjs
* jsonwebtoken (JWT)

### ☁️ Deployment

* Vercel (Frontend)
* Railway (Backend)

---

## ✨ Features

* ✅ User Authentication (Signup/Login using JWT)
* 🆕 Add, edit, delete tasks
* 📌 Filter by task **Status**: `Pending` | `Completed`
* 🔺 Filter by **Priority**: `Low`, `Medium`, `High`

---

## 🖼 UI Preview

### 🔐 Authentication Pages

#### Login Page
![login UI](https://github.com/user-attachments/assets/f1990e39-986b-42a5-9c93-10cd1431339a)

#### Signup Page

---![signup ui](https://github.com/user-attachments/assets/ed04e66e-2f8f-434b-aa8f-efb111e55385)


### 📋 Main Dashboard

#### Task Management Page

> *Add new tasks, edit them, delete, and filter by priority or status.*

![image](https://github.com/user-attachments/assets/76312180-4529-4f19-a988-48fd9b1e211c)


---

## 📌 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vihari7/MERN-Todo-App.git
cd MERN-Todo-App
```

### 2. Setup Backend

```bash
cd server
npm install
npm run dev
```

Make sure to configure `.env` with your MongoDB URI and JWT secret.

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🧪 Future Improvements

* Add due dates and calendar view
* Push notifications or reminders
* Drag-and-drop task reordering
* Dark mode

---

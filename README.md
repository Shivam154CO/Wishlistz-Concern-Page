# Wishlistz - Customer Support Portal

![Wishlistz Support](https://via.placeholder.com/1200x400/6366f1/ffffff?text=Wishlistz+Customer+Support)

A beautiful and efficient customer support system for handling user concerns, built with modern technologies.

## ✨ Features

### 👤 For Users
- **Easy Issue Reporting** - Simple form to submit problems
- **Screenshot Upload** - Attach multiple images
- **Instant Ticket ID** - Get tracking number immediately
- **Clean Interface** - No distractions, just what you need

### 🛠️ For Support Team
- **Dashboard** - View all customer concerns
- **Status Management** - Update ticket progress
- **Filter & Search** - Find tickets quickly
- **Internal Notes** - Add private comments

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Shivam154CO/Wishlistz---Concern-Page.git
cd Wishlistz---Concern-Page
```

2. **Start Backend**
```bash
cd backend
npm install
npm start
```

3. **Start Frontend**
```bash
cd frontend
npm install
npm start
```

4. **Open in browser**
- Visit: http://localhost:3000

## 🏗️ Project Structure

```
📦 Wishlistz-Support
├── 📂 frontend           # React TypeScript App
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── ConcernForm.tsx
│   │   │   └── ConcernList.tsx
│   │   ├── 📂 types
│   │   │   └── concern.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
│
└── 📂 backend            # Node.js Express API
    ├── 📂 controllers
    ├── 📂 models
    ├── 📂 routes
    ├── server.js
    └── package.json
```

## 🎨 Tech Stack

### Frontend
- **React** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **MongoDB** - Database

## 📱 Screens

### User View
![User Form](https://via.placeholder.com/800x450/6366f1/ffffff?text=Report+an+Issue)

### Admin Dashboard
![Admin Panel](https://via.placeholder.com/800x450/8b5cf6/ffffff?text=Support+Dashboard)

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/concerns` | Submit new concern |
| GET | `/api/concerns` | Get all concerns |
| PUT | `/api/concerns/:id` | Update concern status |
| GET | `/api/concerns/:id` | Get specific concern |

## 🎯 Issue Categories

- 💳 **Payment Issues**
- 📦 **Order Not Received**
- 🚫 **Damaged Items**
- 🐛 **Technical Bugs**
- 🔐 **Login Problems**
- ❓ **Other Concerns**

## 📊 Ticket Status

| Status | Color | Meaning |
|--------|-------|---------|
| **New** | 🔵 Blue | Just submitted |
| **In Progress** | 🟡 Yellow | Being worked on |
| **Resolved** | 🟢 Green | Issue solved |

## 💡 How It Works

### For Customers
1. Fill the simple form
2. Upload screenshots
3. Get your Ticket ID
4. Wait for email updates

### For Support Team
1. Check new tickets
2. Update status as you work
3. Add internal notes
4. Mark as resolved

## 🛡️ Security

- ✅ Input validation
- ✅ Protected admin routes
- ✅ Secure file uploads
- ✅ Environment variables

## 📦 Installation Details

### Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and update values
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Environment Setup

Create `.env` in backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wishlistz
JWT_SECRET=your-secret-key
```

## 🎨 Styling

The app uses **Tailwind CSS** for styling:
- Clean, modern design
- Fully responsive
- Dark mode ready
- Custom components

## 📝 Development

### Code Structure
- **Components** - Reusable UI pieces
- **Types** - TypeScript definitions
- **Hooks** - Custom React hooks
- **Utils** - Helper functions

### Best Practices
- TypeScript for type safety
- Component reusability
- Clean code structure
- Proper error handling

## 🤝 Contributing

Want to contribute? Great!

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 📞 Support

Need help? Email: support@wishlistz.com

---

<div align="center">

### Made with ❤️ for Wishlistz

⭐ Star this repo if you found it useful!

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>
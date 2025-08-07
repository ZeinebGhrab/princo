# 🧾 Princo — Automated Receipt Printing System

**Princo** is a smart, full-stack solution designed to automate receipt printing from e-commerce platforms. Built to optimize post-sale operations, it combines a responsive web platform for order management with a desktop application that seamlessly connects to physical printers.
> 🎓 This project was developed as part of my **End of Study Bachelor's Degree Internship** in Computer Science, with a specialization in Big Data and Data Analysis.
---

## 🚀 Features

- 🔗 **Real-time Order Sync** between the web platform and printers
- 🖨️ **Automated Receipt Generation & Printing**
- 🌐 **Web Dashboard** for configuration, management, and monitoring
- 🖥️ **Cross-platform Desktop App** with direct printer integration
- 🧰 **CI/CD pipelines** for smooth delivery and maintenance

---

## 🔗 Project Repositories

- 🌐 🖥️ **Web Platform & Desktop App (Frontend):** [View Repository](https://github.com/ZeinebGhrab/web-desktop)
- ⚙️ **Backend API (NestJS):** [View Repository](https://github.com/ZeinebGhrab/back-princo)

---

## 🛠️ Tech Stack

| Component | Technology |
|----------|-------------|
| Frontend | React.js, Bootstrap |
| Backend | NestJS, REST APIs, WebSocket |
| Desktop App | Electron.js |
| Database | MongoDB |
| DevOps | GitLab CI/CD, Git |
| Methodology | Agile - Scrum |

---

## 📦 System Architecture

1. **Web Platform**
   - Developed with React.js (UI) and NestJS (API)
   - Features real-time synchronization with order databases

2. **Desktop Application**
   - Built using Electron.js
   - Connects to physical printers
   - Receives data via REST & WebSocket

3. **Database**
   - MongoDB with optimized schema to store:
     - Orders
     - Receipts
     - Printer configurations

---

## 📈 Achievements

- 🚚 Reduced manual work by **90%** in post-sale receipt handling
- 💡 Enabled **real-time updates** and seamless printer communication
- 🧪 Delivered robust **CI/CD pipelines** for both web and desktop apps
- 👥 Ensured team productivity with daily standups and sprint planning

---

## 🧪 How to Run

> Prerequisites: Node.js, MongoDB, Git

### Clone & Install

```bash
git clone  https://github.com/ZeinebGhrab/princo.git
cd princo
npm install
```
### Run Web Platform

```bash
cd web-desktop/web 
npm run start
```

### Run Desktop App

```bash
cd web-desktop/desktop
npm run start
```
### Run the Server in Development Mode

```bash
cd back-princo
npm run start:dev
```

Configure .env files as needed in each folder.

---
##  📃 License
MIT License © [Zeineb Ghrab]

---
## 🤝 Contributions
Pull requests are welcome! For major changes, please open an issue first.

---
## 🙋 About the Developer
Built with dedication by Zeineb Ghrab <br/>
🎓 Computer Science Engineer | 🧠 Passionate about automation, AI, and full-stack development

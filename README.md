# 🚀 Saravanan DevOps Journey 365

A personal 365-day DevOps learning tracker built with React.

## Features
- 🔐 Secure login (Username: Saravanan, Password: Saravanan@365)
- 📊 Dashboard with stats, streaks, XP, Developer Score
- 🗺️ Full 365-day roadmap extracted from DevOps PDF
- 📅 Calendar view (green/yellow/red day status)
- 📈 Statistics & phase-wise progress
- 🤖 AI Study Assistant (powered by Claude API)
- 🌙 Dark/Light mode
- 💾 Progress saved in localStorage (persists across sessions)

## Phases Covered
1. Linux Fundamentals (21 days)
2. Networking Concepts (14 days)
3. Version Control - Git (14 days)
4. Python Programming (35 days)
5. Cloud Providers - AWS (35 days)
6. Containerization - Docker (28 days)
7. CI/CD - Jenkins (28 days)
8. Container Orchestration - Kubernetes (42 days)
9. Networking & Infrastructure Services (28 days)
10. Configuration Management - Ansible (28 days)
11. Infrastructure as Code - Terraform (28 days)
12. Monitoring & Logging - Prometheus/Grafana (28 days)

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Running Locally
```
npm start
```
App opens at http://localhost:3000

### Login Credentials
- **Username:** Saravanan
- **Password:** Saravanan@365

## AI Assistant Setup
The AI Assistant uses the Anthropic Claude API.
The API key is handled automatically when deployed on Claude.ai artifacts.
For local use, you can modify `src/App.jsx` to add your own Anthropic API key:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY_HERE",
  "anthropic-version": "2023-06-01"
}
```

## Project Structure
```
DevopsJourney365/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx       ← Main application (all logic + UI)
│   └── index.js      ← React entry point
├── package.json
└── README.md
```

## Tech Stack
- React 18
- Vanilla CSS-in-JS (no extra UI libraries needed)
- Anthropic Claude API (AI Assistant)
- localStorage for persistence

## Tips
- Click any day card to open detailed view with notes
- Use the AI Assistant to get study plans for any topic
- Complete days in order to build your streak
- Check the Calendar view to see your overall progress at a glance

---
Made with ❤️ for Saravanan's DevOps Journey

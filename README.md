# Student Tracker App

## Author
**Gideon Kimaiyo**

## Overview
The Student Tracker App is a responsive, single-page web application designed to help teachers monitor the whereabouts and activities of students within and outside school premises. It uses a deployed backend hosted on Render and a dynamic frontend built with vanilla JavaScript.

---

## File Structure

```
Student-Tracker/
├── index.html
├── css/
│   └── styles.css
├── src/
│   └── index.js
├── images/
├── db.json
└── README.md
```

## Features

### Core Functionalities
- Single Page Application (SPA): No reloads or redirects, seamless user experience.
- JSON Server Integration: RESTful API with GET, POST, PATCH, and DELETE support.
- Teacher Logging: Check out students with location, activity, and time.
- Auto Activity Assignment: Based on a local editable timetable.
- Search and Filter: By name or ID; filter by subject or status.
- Validations: 4-digit numeric ID check, character restrictions, and unique fields.
- Expandable Student Cards: Toggle visibility of detailed student information.
- Subject Selection Rules: Enforces required subject combinations.
- Responsive UI: Designed for usability on all screen sizes.

### Advanced Features
- Confirmation Prompts: For actions like deletion or checkout.
- Clean Code Structure: Modular and organized.
- Mouse Events: Enhanced UX through interactivity.

---

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- JSON Server (Render Deployment)

---

## Setup Instructions (Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/Gideon-Kipserem/student-tracker-app.git
   ```

2. Navigate into the project folder:
   ```bash
   cd student-tracker-app
   ```

3. Install JSON Server globally if not already installed:
   ```bash
   npm install -g json-server
   ```

4. Run the local server:
   ```bash
   json-server --watch db.json
   ```

5. Open `index.html` in your browser.

---

## Deployment

- **Backend API Only**: [https://json-server-chr3.onrender.com](https://json-server-chr3.onrender.com)

Ensure `index.js` points to this backend API for live use.

---

## License
MIT License. See `LICENSE` file for details.

## Contact
For issues or contributions, contact via GitHub.
  
  ## email
  gideonkimaiyo254@gmail.com

  ## github
Gideon-Kipserem
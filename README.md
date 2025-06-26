
# Student Tracker App

## Author
**[Gideon Kimaiyo]**

## Overview
The Student Tracker App is a responsive, single-page web application designed to help teachers monitor the whereabouts and activities of students within and outside school premises. It leverages a local RESTful API to manage student data, integrates asynchronous JavaScript functionality, and offers real-time interactions, all built using vanilla HTML, CSS, and JavaScript.

---

## Features

### Core Functionalities
- Single Page Application (SPA): No page reloads or redirects; seamless navigation.
- JSON Server Integration: RESTful API with GET, POST, PATCH, and DELETE support.
- Teacher Logging: Teachers can check out students with specific activities, time, and location.
- Auto Activity Assignment: Automatically assigns an activity based on a local editable timetable.
- Search and Filter: Search by student name or ID and filter by subject or activity status.
- Subject and ID Validation: Only valid 4-digit numeric IDs and allowed characters are accepted.
- Click to Expand Student Details: Toggle detailed views of students by clicking their cards.
- Mouse Interactions: Enhanced UX with mouseover and mouseout animations.
- Subject Selection: Enforces correct subject combinations when adding students.

### Advanced Features
- Confirmation Prompts: Ensure actions like deletion or checkout are confirmed.
- Input Validations: Ensures that data integrity is maintained with clean and expected formats.
- Code Structure: Organized into modules for scalability and easier maintenance.
- Responsive Design: Works across devices with clean layout and clear labels.

---

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- JSON Server (for simulating RESTful API)

---

## Setup Instructions

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Gideon-Kipserem/student-tracker-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd student-tracker-app
   ```

3. Install JSON Server globally if not already installed:

   ```bash
   npm install -g json-server
   ```

4. Start the JSON Server:

   ```bash
   json-server --watch db.json
   ```

5. Open `index.html` in your browser.

---

## Deployment
This app is deployed and publicly accessible at:  
[Live Site on Render](https://your-render-url.com)

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or contributions, contact the author via GitHub or email.

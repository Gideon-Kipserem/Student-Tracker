document.addEventListener("DOMContentLoaded", () => {
  // ====== ✅ ENVIRONMENT TOGGLE (Fix 2) ======
  const isProd = window.location.hostname.includes("render");
  const BASE_API = isProd
    ? "https://your-render-app.onrender.com"
    : "http://localhost:3000";
  const BASE_URL = `${BASE_API}/students`;

  const presentList = document.getElementById("present-list");
  const absentList = document.getElementById("absent-list");
  const addForm = document.getElementById("add-student-form");
  const nameInput = document.getElementById("new-student-name");
  const idInput = document.getElementById("student-id");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutForm = document.getElementById("checkout-form");
  const locationInput = document.getElementById("checkout-location");
  const activityInput = document.getElementById("checkout-activity");

  let selectedStudentId = null;

  function loadStudents(query = "") {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(students => {
        presentList.innerHTML = "";
        absentList.innerHTML = "";

        const filtered = students.filter(student =>
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.studentId.includes(query)
        );

        if (filtered.length === 0) {
          presentList.innerHTML = "<li>No students found.</li>";
          absentList.innerHTML = "<li>No students found.</li>";
          return;
        }

        filtered.forEach(student => {
          const li = createStudentItem(student);
          if (student.status === "present") {
            presentList.appendChild(li);
          } else {
            absentList.appendChild(li);
          }
        });

        console.log("Rendering", filtered.length, "students");
      });
  }

  function createStudentItem(student) {
    const li = document.createElement("li");
    li.className = "student-item";

    const header = document.createElement("div");
    header.className = "student-header";

    const name = document.createElement("strong");
    name.textContent = `${student.name} (ID: ${student.studentId})`;

    const status = document.createElement("span");
    status.className = student.status;
    status.textContent = student.status === "present" ? "🟢 Present" : "🔴 Absent";

    header.appendChild(name);
    header.appendChild(status);
    li.appendChild(header);

    const details = document.createElement("div");
    details.className = "student-details hidden";

    if (student.status === "absent") {
      details.innerHTML = `
        <p><strong>Whereabouts:</strong></p>
        <ul>
          <li><strong>Location:</strong> ${student.location}</li>
          <li><strong>Activity:</strong> ${student.activity}</li>
          <li><strong>Time:</strong> ${student.time}</li>
        </ul>
      `;
    } else {
      details.innerHTML = `<p>${student.name} is in class.</p>`;
    }

    header.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    li.appendChild(details);

    const buttons = document.createElement("div");
    buttons.className = "student-buttons";

    if (student.status === "present") {
      const checkoutBtn = document.createElement("button");
      checkoutBtn.textContent = "Check Out";
      checkoutBtn.addEventListener("click", () => {
        selectedStudentId = student.id;
        openModal();
      });
      buttons.appendChild(checkoutBtn);
    } else {
      const checkinBtn = document.createElement("button");
      checkinBtn.textContent = "Check In";
      checkinBtn.addEventListener("click", () => {
        fetch(`${BASE_URL}/${student.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "present",
            location: "",
            activity: "",
            time: ""
          })
        }).then(() => loadStudents(searchInput.value.trim()));
      });
      buttons.appendChild(checkinBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.addEventListener("click", () => {
      if (student.id && confirm(`Remove ${student.name}?`)) {
        console.log("Attempting to delete student with ID:", student.id);
        fetch(`${BASE_URL}/${student.id}`, {
          method: "DELETE"
        }).then(() => {
          console.log("Deleted successfully. Reloading student list...");
          searchInput.value = ""; // Clear search input
          loadStudents();
        });
      }
    });
    buttons.appendChild(deleteBtn);

    li.appendChild(buttons);
    return li;
  }

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const studentId = idInput.value.trim();

    if (!/^\d{4}$/.test(studentId)) {
      alert("Student ID must be exactly 4 digits.");
      return;
    }

    fetch(BASE_URL)
      .then(res => res.json())
      .then(students => {
        const nameExists = students.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (nameExists) {
          alert("Student with this name already exists.");
          return;
        }

        const idExists = students.find(s => s.studentId === studentId);
        if (idExists) {
          alert("Student ID already exists. Please use a unique 4-digit ID.");
          return;
        }

        const newStudent = {
          name,
          studentId,
          status: "present",
          location: "",
          activity: "",
          time: ""
        };

        fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStudent)
        }).then(() => {
          loadStudents();
          addForm.reset();
        });
      });
  });

  searchButton.addEventListener("click", () => {
    loadStudents(searchInput.value.trim());
  });

  searchInput.addEventListener("input", () => {
    loadStudents(searchInput.value.trim());
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = locationInput.value.trim();
    const activity = activityInput.value.trim();
    const time = new Date().toLocaleString();

    fetch(`${BASE_URL}/${selectedStudentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "absent",
        location,
        activity,
        time
      })
    }).then(() => {
      closeModal();
      loadStudents(searchInput.value.trim());
    });
  });

  function openModal() {
    checkoutModal.style.display = "flex";
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    checkoutModal.style.display = "none";
    document.body.classList.remove("modal-open");
    checkoutForm.reset();
  }

  window.closeModal = closeModal;

  loadStudents();
});
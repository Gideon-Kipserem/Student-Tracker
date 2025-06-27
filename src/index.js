document.addEventListener("DOMContentLoaded", () => {
  // ====== BASE URL & DOM REFERENCES ======
  const BASE_API = "https://json-server-chr3.onrender.com";
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

  // ====== LOAD STUDENTS FUNCTION ======
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
      });
  }

  // ====== CREATE STUDENT LIST ITEM ======
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
      if (confirm("Are you sure you want to remove this student?")) {
        fetch(`${BASE_URL}/${student.id}`, {
          method: "DELETE"
        }).then(() => loadStudents(searchInput.value.trim()));
      }
    });
    buttons.appendChild(deleteBtn);

    li.appendChild(buttons);

    return li;
  }

  // ====== FORM SUBMIT: ADD NEW STUDENT ======
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const studentId = idInput.value.trim();

    // === VALIDATE STUDENT ID FORMAT ===
    if (!/^\d{4}$/.test(studentId)) {
      alert("Student ID must be exactly 4 digits.");
      return;
    }

    // === FETCH EXISTING STUDENTS TO VALIDATE UNIQUENESS ===
    fetch(BASE_URL)
      .then(res => res.json())
      .then(students => {
        //  CHECK FOR DUPLICATE NAME
        const nameExists = students.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (nameExists) {
          alert("Student with this name already exists.");
          return;
        }

        //  CHECK FOR DUPLICATE STUDENT ID — [ADDED FEATURE]
        const idExists = students.find(s => s.studentId === studentId);
        if (idExists) {
          alert("Student ID already exists. Please use a unique 4-digit ID.");
          return;
        }

        //  CREATE NEW STUDENT
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

  // ====== SEARCH FUNCTIONALITY ======
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    loadStudents(query);
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    loadStudents(query);
  });

  // ====== CHECKOUT FORM SUBMIT ======
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

  // ====== MODAL FUNCTIONS ======
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

  // ====== INITIAL DATA LOAD ======
  loadStudents();
});

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];

function renderStudents() {
  studentTable.innerHTML = "";

  if (students.length === 0) {
    studentTable.innerHTML =
      '<tr class="empty-row"><td colspan="4">No students added yet.</td></tr>';
    return;
  }

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    [student.name, student.roll, student.department].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => {
      students.splice(index, 1);
      renderStudents();
      message.textContent = "Student deleted.";
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    studentTable.appendChild(row);
  });
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const department = document.getElementById("department").value.trim();

  if (!name || !roll || !department) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (students.some((student) => student.roll.toLowerCase() === roll.toLowerCase())) {
    message.textContent = "A student with this roll number already exists.";
    return;
  }

  students.push({ name, roll, department });
  renderStudents();
  studentForm.reset();
  message.textContent = "Student added successfully.";
});

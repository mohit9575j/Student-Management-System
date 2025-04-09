 

const API_URL = "https://crudcrud.com/api/922c5cf2991142d090bd485bdda41b51/student";

let editId = null;  

//Form Submit Handler
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const address = document.getElementById("address").value;

  const student = { name, number, address };

   if (editId) {
    updateStudent(editId, student);
  } else {
    createStudent(student);
  }
});

// Create Student
function createStudent(student) {
  axios.post(API_URL, student)
    .then(() => {
      console.log("Student Saved");
      document.getElementById("studentForm").reset();
      getStudents();
    })
    .catch((error) => {
      console.error("POST Error:", error);
    });
}

//Update Student
function updateStudent(id, student) {
  axios.put(`${API_URL}/${id}`, student)
    .then(() => {
      console.log("Student Updated");
      document.getElementById("studentForm").reset();
      editId = null;
      getStudents();
    })
    .catch((error) => {
      console.error("PUT Error:", error);
    });
}

//Get All Students
function getStudents() {
  axios.get(API_URL)
    .then((response) => {
      const students = response.data;
      const tableBody = document.getElementById("studentTableBody");
      tableBody.innerHTML = "";

      //Total count update
      document.getElementById("studentCount").textContent = `Total Students: ${students.length}`;

      students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.number}</td>
          <td>${student.address}</td>
          <td>
            <button onclick="editStudent('${student._id}', '${student.name}', '${student.number}', '${student.address}')">Edit</button>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("GET Error:", error);
    });
}

//Delete Student
function deleteStudent(id) {
  axios.delete(`${API_URL}/${id}`)
    .then(() => {
      console.log("Student Deleted");
      getStudents();
    })
    .catch((error) => {
      console.error("DELETE Error:", error);
    });
}

//Edit Student
function editStudent(id, name, number, address) {
  document.getElementById("name").value = name;
  document.getElementById("number").value = number;
  document.getElementById("address").value = address;
  editId = id; 
}


getStudents();

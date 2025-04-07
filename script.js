// const API_URL = "https://crudcrud.com/api/922c5cf2991142d090bd485bdda41b51/student";

// // Form submit
// document.getElementById("studentForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value;
//   const number = document.getElementById("number").value;
//   const address = document.getElementById("address").value;

//   const student = { name, number, address };

//   // Axios POST request
//   axios.post(API_URL, student)
//     .then((response) => {
//       console.log("Student Saved:", response.data);
//       document.getElementById("studentForm").reset();
//       getStudents();
//     })
//     .catch((error) => {
//       console.error("POST Error:", error);
//     });
// });

// // Get all students
// function getStudents() {
//   axios.get(API_URL)
//     .then((response) => {
//       const students = response.data;
//       const tableBody = document.getElementById("studentTableBody");
//       tableBody.innerHTML = "";

//       students.forEach((student) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//           <td>${student.name}</td>
//           <td>${student.number}</td>
//           <td>${student.address}</td>
//           <td><button onclick="deleteStudent('${student._id}')">Delete</button></td>
//         `;
//         tableBody.appendChild(row);
//       });
//     })
//     .catch((error) => {
//       console.error("GET Error:", error);
//     });
// }

// // Delete student
// function deleteStudent(id) {
//   axios.delete(`${API_URL}/${id}`)
//     .then(() => {
//       console.log("Student Deleted");
//       getStudents();
//     })
//     .catch((error) => {
//       console.error("DELETE Error:", error);
//     });
// }

// // Initial fetch
// getStudents();




























const API_URL = "https://crudcrud.com/api/922c5cf2991142d090bd485bdda41b51/student";

let editId = null; // Jab hum edit button dabaye, to yeh id store hogi

// Form submit
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const address = document.getElementById("address").value;

  const student = { name, number, address };

  if (editId) {
    // Agar editId hai, toh PUT request
    axios.put(`${API_URL}/${editId}`, student)
      .then(() => {
        console.log("Student Updated");
        document.getElementById("studentForm").reset();
        editId = null;
        getStudents();
      })
      .catch((error) => {
        console.error("UPDATE Error:", error);
      });
  } else {
    // Naya student POST request
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
});

// Get all students
function getStudents() {
  axios.get(API_URL)
    .then((response) => {
      const students = response.data;
      const tableBody = document.getElementById("studentTableBody");
      tableBody.innerHTML = "";

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

// Delete student
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

// Edit student (form me value bhar ke dikhao)
function editStudent(id, name, number, address) {
  document.getElementById("name").value = name;
  document.getElementById("number").value = number;
  document.getElementById("address").value = address;
  editId = id; // Jab form submit hoga, to ye id se PUT request hoga
}

// Initial fetch
getStudents();

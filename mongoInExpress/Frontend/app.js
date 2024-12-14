const baseUrl = 'http://localhost:8000/items';
const studentForm = document.getElementById('studentForm');
const studentsDiv = document.getElementById('students');

// Fetch all students
async function fetchStudents() {
  try {
    const response = await axios.get(baseUrl);
    const students = response.data;
    renderStudents(students);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

// Render students on the page
function renderStudents(students) {
  studentsDiv.innerHTML = students.map(student => `
    <div class="student">
      <p><strong>ID:</strong> ${student.id}</p>
      <p><strong>Name:</strong> ${student.studentName}</p>
      <p><strong>Age:</strong> ${student.age}</p>
      <button onclick="deleteStudent('${student._id}')">Delete</button>
      <button onclick="updateStudent('${student._id}')">Update</button>
    </div>
  `).join('');
}

// Add a new student
studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newStudent = {
    id: document.getElementById('id').value,
    studentName: document.getElementById('studentName').value,
    age: document.getElementById('age').value,
  };
  try {
    await axios.post(baseUrl, newStudent);
    fetchStudents(); // Refresh students
    studentForm.reset(); // Clear the form
  } catch (error) {
    console.error('Error adding student:', error);
  }
});

// Delete a student
async function deleteStudent(id) {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    fetchStudents(); // Refresh students
  } catch (error) {
    console.error('Error deleting student:', error);
  }
}

// Update a student
async function updateStudent(id) {
  const updatedStudent = {
    studentName: prompt('Enter new name:'),
    age: prompt('Enter new age:'),
  };
  try {
    await axios.put(`${baseUrl}/${id}`, updatedStudent);
    fetchStudents(); // Refresh students
  } catch (error) {
    console.error('Error updating student:', error);
  }
}

// Initialize app
fetchStudents();

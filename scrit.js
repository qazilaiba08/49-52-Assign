// 1. Create a signup form and display form data in your web
// page on submission.

// function displayFormData(event) {
//     event.preventDefault(); 

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
//     document.getElementById('resultName').innerText = name;
//     document.getElementById('resultEmail').innerText = email;
//     document.getElementById('resultPassword').innerText = password;
    
//     document.getElementById('resultContainer').style.display = 'block';
// };

// 2. Suppose in your webpage there is content area in which
// you have entered your item details, but user can only see
// some details on first look. When user clicks on “Read
// more” button, full detail of that particular item will be
// displayed.

function toggleReadMore(contentid){
    const element = document.getElementById(contentid);
    const fullcontent = element.querySelector('.content-full');
    const readMoreButton = element.nextElementSibling;

    if(fullcontent.style.display === 'none' || fullcontent.style.display === ""){
        fullcontent.style.display = 'block';
        element.style.height = 'auto';
        readMoreButton.innerText = 'Read less';
    }else{
        fullcontent.style.display = 'none';
        element.style.height = '50px';
        readMoreButton.innerText = 'Read more';
    }
};

// 3. In previous assignment you have created a tabular data
// using javascript. Let’s modify that. Create a form which
// takes student’s details and show each student detail in
// table. Each row of table must contain a delete button and
// an edit button. On click on delete button entire row should
// be deleted. On click on edit button, a hidden form will
// appear with the values of that row.

let students = [];
let editIndex = null;

function addStudent(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    
    students.push({ name, age, email });
    renderTable();
    
    document.getElementById('studentForm').reset();
}

function renderTable() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>
                <button class="action-button edit-button" onclick="editStudent(${index})">Edit</button>
                <button class="action-button" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
}

function editStudent(index) {
    editIndex = index;
    const student = students[index];
    
    document.getElementById('editName').value = student.name;
    document.getElementById('editAge').value = student.age;
    document.getElementById('editEmail').value = student.email;
    
    document.getElementById('editFormContainer').style.display = 'block';
}

function updateStudent(event) {
    event.preventDefault();
    
    const name = document.getElementById('editName').value;
    const age = document.getElementById('editAge').value;
    const email = document.getElementById('editEmail').value;
    
    students[editIndex] = { name, age, email };
    renderTable();
    
    document.getElementById('editFormContainer').style.display = 'none';
    editIndex = null;
}
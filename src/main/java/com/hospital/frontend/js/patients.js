const API_URL = "http://localhost:8080/api/patients";

let patientList = [];

window.onload = () => {
    loadPatients();
};

// =========================
// Load Patients
// =========================

async function loadPatients() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL, {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        if (!response.ok) {

            alert("Unable to load patients.");

            return;

        }

        patientList = await response.json();

        displayPatients(patientList);

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// =========================
// Display Patients
// =========================

function displayPatients(list) {

    const table = document.getElementById("patientTable");

    table.innerHTML = "";

    list.forEach(patient => {

        table.innerHTML += `

        <tr>

            <td>${patient.patientId}</td>

            <td>${patient.patientName}</td>

            <td>${patient.age}</td>

            <td>${patient.gender}</td>

            <td>${patient.phone}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm edit-btn"
                    onclick="editPatient(${patient.patientId})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm delete-btn"
                    onclick="deletePatient(${patient.patientId})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// =========================
// Search
// =========================

function searchPatient() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = patientList.filter(patient =>

        patient.patientName.toLowerCase().includes(keyword) ||

        patient.phone.includes(keyword)

    );

    displayPatients(filtered);

}

// =========================
// New Patient
// =========================

function newPatient() {

    document.getElementById("patientId").value = "";

    document.getElementById("patientName").value = "";

    document.getElementById("age").value = "";

    document.getElementById("gender").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("saveButton").innerHTML =

        '<i class="fa-solid fa-floppy-disk"></i> Save Patient';

}

// =========================
// Save Patient
// =========================

async function savePatient() {

    const token = localStorage.getItem("token");

    const id = document.getElementById("patientId").value;

    const patient = {

        patientName: document.getElementById("patientName").value,

        age: parseInt(document.getElementById("age").value),

        gender: document.getElementById("gender").value,

        phone: document.getElementById("phone").value

    };

    let url = API_URL;

    let method = "POST";

    if (id) {

        url = API_URL + "/" + id;

        method = "PUT";

    }

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(patient)

        });

        if (!response.ok) {

            alert("Unable to save patient.");

            return;

        }

        bootstrap.Modal
            .getInstance(document.getElementById("patientModal"))
            .hide();

        loadPatients();

    }

    catch (error) {

        console.log(error);

    }

}

// =========================
// Edit Patient
// =========================

async function editPatient(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL + "/" + id, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const patient = await response.json();

        document.getElementById("patientId").value = patient.patientId;

        document.getElementById("patientName").value = patient.patientName;

        document.getElementById("age").value = patient.age;

        document.getElementById("gender").value = patient.gender;

        document.getElementById("phone").value = patient.phone;

        document.getElementById("saveButton").innerHTML =

            '<i class="fa-solid fa-pen"></i> Update Patient';

        new bootstrap.Modal(document.getElementById("patientModal")).show();

    }

    catch (error) {

        console.log(error);

    }

}

// =========================
// Delete Patient
// =========================

async function deletePatient(id) {

    if (!confirm("Delete this patient?")) return;

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            alert("Unable to delete.");

            return;

        }

        loadPatients();

    }

    catch (error) {

        console.log(error);

    }

}
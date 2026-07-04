const API_URL = "http://localhost:8080/api/doctors";

let doctorList = [];

window.onload = () => {
    loadDoctors();
};

// =========================
// Load Doctors
// =========================

async function loadDoctors() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL, {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        if (!response.ok) {

            alert("Unable to load doctors.");

            return;

        }

        doctorList = await response.json();

        displayDoctors(doctorList);

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// =========================
// Display Doctors
// =========================

function displayDoctors(list) {

    const table = document.getElementById("doctorTable");

    table.innerHTML = "";

    list.forEach(doctor => {

        table.innerHTML += `

        <tr>

            <td>${doctor.doctorId}</td>

            <td>${doctor.doctorName}</td>

            <td>${doctor.specialization}</td>

            <td>${doctor.department}</td>

            <td>${doctor.experience}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm edit-btn"
                    onclick="editDoctor(${doctor.doctorId})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm delete-btn"
                    onclick="deleteDoctor(${doctor.doctorId})">

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

function searchDoctor() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = doctorList.filter(doctor =>

        doctor.doctorName.toLowerCase().includes(keyword) ||

        doctor.specialization.toLowerCase().includes(keyword) ||

        doctor.department.toLowerCase().includes(keyword)

    );

    displayDoctors(filtered);

}

// =========================
// New Doctor
// =========================

function newDoctor() {

    document.getElementById("doctorId").value = "";

    document.getElementById("doctorName").value = "";

    document.getElementById("specialization").value = "";

    document.getElementById("department").value = "";

    document.getElementById("experience").value = "";

    document.getElementById("saveButton").innerHTML =
        '<i class="fa-solid fa-floppy-disk"></i> Save Doctor';

}

// =========================
// Save Doctor
// =========================

async function saveDoctor() {

    const token = localStorage.getItem("token");

    const id = document.getElementById("doctorId").value;

    const doctor = {

        doctorName: document.getElementById("doctorName").value,

        specialization: document.getElementById("specialization").value,

        department: document.getElementById("department").value,

        experience: parseInt(document.getElementById("experience").value)

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

            body: JSON.stringify(doctor)

        });

        if (!response.ok) {

            alert("Unable to save doctor.");

            return;

        }

        bootstrap.Modal
            .getInstance(document.getElementById("doctorModal"))
            .hide();

        loadDoctors();

    }

    catch (error) {

        console.log(error);

    }

}

// =========================
// Edit Doctor
// =========================

async function editDoctor(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL + "/" + id, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const doctor = await response.json();

        document.getElementById("doctorId").value = doctor.doctorId;

        document.getElementById("doctorName").value = doctor.doctorName;

        document.getElementById("specialization").value = doctor.specialization;

        document.getElementById("department").value = doctor.department;

        document.getElementById("experience").value = doctor.experience;

        document.getElementById("saveButton").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Doctor';

        new bootstrap.Modal(document.getElementById("doctorModal")).show();

    }

    catch (error) {

        console.log(error);

    }

}

// =========================
// Delete Doctor
// =========================

async function deleteDoctor(id) {

    if (!confirm("Delete this doctor?")) return;

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            alert("Unable to delete doctor.");

            return;

        }

        loadDoctors();

    }

    catch (error) {

        console.log(error);

    }

}
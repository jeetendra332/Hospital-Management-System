const API_URL = "http://localhost:8080/api/appointments";
const DOCTOR_API = "http://localhost:8080/api/doctors";
const PATIENT_API = "http://localhost:8080/api/patients";

let appointmentList = [];

window.onload = () => {

    loadDoctors();
    loadPatients();
    loadAppointments();

};

// ==========================
// Load Appointments
// ==========================

async function loadAppointments() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            alert("Unable to load appointments.");

            return;

        }

        appointmentList = await response.json();

        displayAppointments(appointmentList);

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================
// Display Appointments
// ==========================

function displayAppointments(list) {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    list.forEach(a => {

        let badge = "";

        if (a.status === "Scheduled") {

            badge = '<span class="status scheduled">Scheduled</span>';

        } else if (a.status === "Completed") {

            badge = '<span class="status completed">Completed</span>';

        } else {

            badge = '<span class="status cancelled">Cancelled</span>';

        }

        table.innerHTML += `

        <tr>

            <td>${a.appointmentId}</td>

            <td>${a.doctor.doctorName}</td>

            <td>${a.patient.patientName}</td>

            <td>${a.appointmentDate}</td>

            <td>${badge}</td>

            <td>

                <button class="btn btn-warning btn-sm edit-btn"
                        onclick="editAppointment(${a.appointmentId})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="btn btn-danger btn-sm delete-btn"
                        onclick="deleteAppointment(${a.appointmentId})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================
// Search
// ==========================

function searchAppointment() {

    const key = document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = appointmentList.filter(a =>

        a.patient.patientName.toLowerCase().includes(key) ||

        a.doctor.doctorName.toLowerCase().includes(key) ||

        a.status.toLowerCase().includes(key)

    );

    displayAppointments(filtered);

}

// ==========================
// Load Doctors
// ==========================

async function loadDoctors() {

    const token = localStorage.getItem("token");

    const response = await fetch(DOCTOR_API, {

        headers: {

            "Authorization": "Bearer " + token

        }

    });

    const doctors = await response.json();

    const select = document.getElementById("doctor");

    select.innerHTML = "";

    doctors.forEach(d => {

        select.innerHTML += `

            <option value="${d.doctorId}">

                ${d.doctorName}

            </option>

        `;

    });

}

// ==========================
// Load Patients
// ==========================

async function loadPatients() {

    const token = localStorage.getItem("token");

    const response = await fetch(PATIENT_API, {

        headers: {

            "Authorization": "Bearer " + token

        }

    });

    const patients = await response.json();

    const select = document.getElementById("patient");

    select.innerHTML = "";

    patients.forEach(p => {

        select.innerHTML += `

            <option value="${p.patientId}">

                ${p.patientName}

            </option>

        `;

    });

}

// ==========================
// New Appointment
// ==========================

function newAppointment() {

    document.getElementById("appointmentId").value = "";

    document.getElementById("appointmentDate").value = "";

    document.getElementById("status").value = "Scheduled";

    document.getElementById("saveButton").innerHTML =
        '<i class="fa-solid fa-floppy-disk"></i> Save Appointment';

}

// ==========================
// Save Appointment
// ==========================

async function saveAppointment() {

    const token = localStorage.getItem("token");

    const id = document.getElementById("appointmentId").value;

    const appointment = {

        doctorId: parseInt(document.getElementById("doctor").value),

        patientId: parseInt(document.getElementById("patient").value),

        appointmentDate: document.getElementById("appointmentDate").value,

        status: document.getElementById("status").value

    };

    let url = API_URL;

    let method = "POST";

    if (id) {

        url = API_URL + "/" + id;

        method = "PUT";

    }

    const response = await fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(appointment)

    });

    if (!response.ok) {

        alert("Unable to save appointment.");

        return;

    }

    bootstrap.Modal.getInstance(document.getElementById("appointmentModal")).hide();

    loadAppointments();

}

// ==========================
// Edit Appointment
// ==========================

async function editAppointment(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + "/" + id, {

        headers: {

            "Authorization": "Bearer " + token

        }

    });

    const a = await response.json();

    document.getElementById("appointmentId").value = a.appointmentId;

    document.getElementById("doctor").value = a.doctor.doctorId;

    document.getElementById("patient").value = a.patient.patientId;

    document.getElementById("appointmentDate").value = a.appointmentDate.substring(0,16);

    document.getElementById("status").value = a.status;

    document.getElementById("saveButton").innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Appointment';

    new bootstrap.Modal(document.getElementById("appointmentModal")).show();

}

// ==========================
// Delete Appointment
// ==========================

async function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) return;

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + "/" + id, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + token

        }

    });

    if (!response.ok) {

        alert("Unable to delete appointment.");

        return;

    }

    loadAppointments();

}
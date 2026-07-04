const API_URL = "http://localhost:8080/api/prescriptions";
const DOCTOR_API = "http://localhost:8080/api/doctors";
const PATIENT_API = "http://localhost:8080/api/patients";

let prescriptionList = [];

window.onload = () => {

    loadDoctors();

    loadPatients();

    loadPrescriptions();

};

// =========================
// Load Prescriptions
// =========================

async function loadPrescriptions() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            alert("Unable to load prescriptions.");

            return;

        }

        prescriptionList = await response.json();

        displayPrescriptions(prescriptionList);

    }

    catch (error) {

        console.log(error);

    }

}

// =========================
// Display Prescriptions
// =========================

function displayPrescriptions(list) {

    const table = document.getElementById("prescriptionTable");

    table.innerHTML = "";

    list.forEach(p => {

        table.innerHTML += `

        <tr>

            <td>${p.prescriptionId}</td>

            <td>${p.doctor.doctorName}</td>

            <td>${p.patient.patientName}</td>

            <td>${p.medicines}</td>

            <td>${p.notes}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm edit-btn"
                    onclick="editPrescription(${p.prescriptionId})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm delete-btn"
                    onclick="deletePrescription(${p.prescriptionId})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// =========================
// Load Doctors
// =========================

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

// =========================
// Load Patients
// =========================

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

// =========================
// New Prescription
// =========================

function newPrescription() {

    document.getElementById("prescriptionId").value = "";

    document.getElementById("medicines").value = "";

    document.getElementById("notes").value = "";

    document.getElementById("saveButton").innerHTML =
        '<i class="fa-solid fa-floppy-disk"></i> Save Prescription';

}

// =========================
// Save Prescription
// =========================

async function savePrescription() {

    const token = localStorage.getItem("token");

    const id = document.getElementById("prescriptionId").value;

    const prescription = {

        doctorId: parseInt(document.getElementById("doctor").value),

        patientId: parseInt(document.getElementById("patient").value),

        medicines: document.getElementById("medicines").value,

        notes: document.getElementById("notes").value

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

        body: JSON.stringify(prescription)

    });

    if (!response.ok) {

        alert("Unable to save prescription.");

        return;

    }

    bootstrap.Modal
        .getInstance(document.getElementById("prescriptionModal"))
        .hide();

    loadPrescriptions();

}

// =========================
// Edit Prescription
// =========================

async function editPrescription(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + "/" + id, {

        headers: {

            "Authorization": "Bearer " + token

        }

    });

    const p = await response.json();

    document.getElementById("prescriptionId").value = p.prescriptionId;

    document.getElementById("doctor").value = p.doctor.doctorId;

    document.getElementById("patient").value = p.patient.patientId;

    document.getElementById("medicines").value = p.medicines;

    document.getElementById("notes").value = p.notes;

    document.getElementById("saveButton").innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Prescription';

    new bootstrap.Modal(
        document.getElementById("prescriptionModal")
    ).show();

}

// =========================
// Delete Prescription
// =========================

async function deletePrescription(id) {

    if (!confirm("Delete this prescription?")) return;

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + "/" + id, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + token

        }

    });

    if (!response.ok) {

        alert("Unable to delete prescription.");

        return;

    }

    loadPrescriptions();

}
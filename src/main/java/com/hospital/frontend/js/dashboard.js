const API_BASE = "http://localhost:8080/api";

window.onload = function () {

    loadCurrentDate();

    loadDashboard();

    loadPatients();

    loadAppointments();

    document.getElementById("logoutBtn").addEventListener("click", logout);

};

// =============================
// Current Date
// =============================

function loadCurrentDate() {

    const today = new Date();

    document.getElementById("currentDate").innerText =
        today.toLocaleDateString("en-IN", {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        });

}

// =============================
// Dashboard Counts
// =============================

async function loadDashboard() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(`${API_BASE}/dashboard`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load dashboard.");

        }

        const data = await response.json();

        document.getElementById("doctorCount").innerText =
            data.totalDoctors;

        document.getElementById("patientCount").innerText =
            data.totalPatients;

        document.getElementById("appointmentCount").innerText =
            data.totalAppointments;



    }

    catch (error) {

        console.error(error);

    }

}

// =============================
// Recent Patients
// =============================

async function loadPatients() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(`${API_BASE}/patients`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load patients.");

        }

        const patients = await response.json();

        const tbody = document.getElementById("patientTableBody");

        tbody.innerHTML = "";

        patients
            .slice(-5)
            .reverse()
            .forEach(patient => {

                tbody.innerHTML += `

                <tr>

                    <td>${patient.patientId}</td>

                    <td>${patient.patientName}</td>

                    <td>${patient.gender}</td>

                    <td>${patient.age}</td>

                </tr>

                `;

            });

    }

    catch (error) {

        console.error(error);

    }

}

// =============================
// Recent Appointments
// =============================

async function loadAppointments() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(`${API_BASE}/appointments`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load appointments.");

        }

        const appointments = await response.json();

        const tbody = document.getElementById("appointmentTableBody");

        tbody.innerHTML = "";

        appointments
            .slice(-5)
            .reverse()
            .forEach(app => {

                tbody.innerHTML += `

                <tr>

                    <td>${app.appointmentId}</td>

                    <td>${app.patient?.patientName ?? "-"}</td>

                    <td>${app.doctor?.doctorName ?? "-"}</td>

                    <td>${app.appointmentDate ?? "-"}</td>

                </tr>

                `;

            });

    }

    catch (error) {

        console.error(error);

    }

}

// =============================
// Logout
// =============================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}
document.addEventListener("DOMContentLoaded", function () {
    const userData = {
        totalUsers: 2500,
    };

    const jobData = {
        totalJobs: 50000,
    };

    const candidateData = {
        totalCandidates: 500,
    };

    const employerData = {
        totalEmployers: 100,
    };

    document.getElementById("totalUsers").innerText = userData.totalUsers;
    document.getElementById("totalJobs").innerText = jobData.totalJobs;
    document.getElementById("totalCandidates").innerText = candidateData.totalCandidates;
    document.getElementById("totalEmployers").innerText = employerData.totalEmployers;

    const pieChartData = {
        labels: ["Usuarios Registrados", "Ofertas de Trabajo", "Candidatos", "Empleadores"],
        datasets: [{
            data: [userData.totalUsers, jobData.totalJobs, candidateData.totalCandidates, employerData.totalEmployers],
            backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#f39c12"],
        }],
    };

    const pieChartContext = document.getElementById("pieChart").getContext("2d");

    const pieChart = new Chart(pieChartContext, {
        type: "pie",
        data: pieChartData,
    });
});

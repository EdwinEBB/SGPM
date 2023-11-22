document.addEventListener("DOMContentLoaded", function () {
    // Simulación de datos (puedes obtener estos datos de tu servidor)
    const userData = {
        totalUsers: 2500,
        // Agrega más datos según sea necesario
    };

    const jobData = {
        totalJobs: 50000,
        // Agrega más datos según sea necesario
    };

    const candidateData = {
        totalCandidates: 500,
        // Agrega más datos según sea necesario
    };

    const employerData = {
        totalEmployers: 100,
        // Agrega más datos según sea necesario
    };

    // Actualiza las estadísticas en el informe
    document.getElementById("totalUsers").innerText = userData.totalUsers;
    document.getElementById("totalJobs").innerText = jobData.totalJobs;
    document.getElementById("totalCandidates").innerText = candidateData.totalCandidates;
    document.getElementById("totalEmployers").innerText = employerData.totalEmployers;
    // Actualiza más elementos según sea necesario
});

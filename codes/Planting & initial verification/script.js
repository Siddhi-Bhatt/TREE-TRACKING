// Guidelines for the planting process are pre-defined in HTML as a list

function reportPlanting() {
    const reportStatus = document.getElementById("reportStatus");
    const plantingImage = document.getElementById("plantingImage").files[0];

    if (plantingImage) {
        const imageURL = URL.createObjectURL(plantingImage);
        
        // Display the uploaded image as confirmation
        reportStatus.innerHTML = `
            <p style="color: blue;">Planting report submitted successfully by the landowner!</p>
            <p>Uploaded Image:</p>
            <img src="${imageURL}" alt="Planting Image" style="width: 300px; height: auto; margin-top: 10px;">
        `;
    } else {
        reportStatus.textContent = "Please upload an image of the planted saplings.";
        reportStatus.style.color = "red";
    }
}

function verifyPlanting() {
    const verificationStatus = document.getElementById("verificationStatus");

    // Simulating verification process via satellite
    setTimeout(() => {
        verificationStatus.textContent = "Planting verified successfully via satellite imagery!";
        verificationStatus.style.color = "green";
    }, 2000); // Simulate delay for verification process
}

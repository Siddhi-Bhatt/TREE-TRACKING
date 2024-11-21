const fileInput = document.getElementById("file-upload");
const previewImage = document.getElementById("preview-image");
const imagePreview = document.getElementById("image-preview");
const confirmationCheckbox = document.getElementById("confirmation");
const locationSection = document.getElementById("location-section");
const otpSection = document.getElementById("otp-section");
const otpInput = document.getElementById("otp-input");
const verifyOtpButton = document.getElementById("verify-otp");
const successMessage = document.getElementById("success-message");

let generatedOtp = null;
let userLocation = null;

// Handle file upload
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    previewImage.src = previewUrl;
    imagePreview.style.display = "block";
  }
});

// Handle confirmation checkbox
confirmationCheckbox.addEventListener("change", () => {
  if (confirmationCheckbox.checked) {
    generateOtp();
    getLocation();
    otpSection.style.display = "block";
  } else {
    otpSection.style.display = "none";
    locationSection.innerHTML = "";
  }
});

// Generate OTP
function generateOtp() {
  generatedOtp = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit OTP
  alert(`Your OTP is: ${generatedOtp}`); // Simulate sending OTP
}

// Get user location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        locationSection.innerHTML = `Location: Latitude ${userLocation.latitude}, Longitude ${userLocation.longitude}`;
        locationSection.style.display = "block";
      },
      () => {
        locationSection.innerHTML =
          "Unable to fetch location. Please enable location services.";
        locationSection.style.color = "red";
        locationSection.style.display = "block";
      }
    );
  } else {
    locationSection.innerHTML = "Geolocation is not supported by this browser.";
    locationSection.style.color = "red";
    locationSection.style.display = "block";
  }
}

// Verify OTP
verifyOtpButton.addEventListener("click", () => {
  if (parseInt(otpInput.value, 10) === generatedOtp) {
    alert("OTP verified successfully!");
    successMessage.style.display = "block";
  } else {
    alert("Incorrect OTP. Please try again.");
  }
});

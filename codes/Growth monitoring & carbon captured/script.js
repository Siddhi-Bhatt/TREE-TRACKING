// Handle growth updates submission
document.getElementById('growth-update-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const photoUpload = document.getElementById('photo-upload').files;
  
  if (photoUpload.length > 0) {
    alert('Growth updates submitted successfully!');
    document.getElementById('growth-update-form').reset();
  } else {
    alert('Please upload at least one photo.');
  }
});

// Start monitoring
function startMonitoring() {
  const monitoringStatus = document.getElementById('monitoring-status');
  monitoringStatus.style.display = 'block';
  monitoringStatus.textContent = 'Monitoring in progress... Using AI and satellite data.';
  
  setTimeout(() => {
    monitoringStatus.textContent = 'Monitoring complete. Growth verified and carbon credits estimated.';
  }, 3000); // Simulate monitoring process
}

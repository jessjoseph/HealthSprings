let vaccinationsData = [];
let appointmentsData = [];

// Automatically load 'thedataset.csv' when the page loads
window.addEventListener('load', function () {
  fetch('thedataset.csv')  // Load the CSV file from the server or local directory
    .then(response => response.text())  // Convert the file contents to text
    .then(csvData => {
      // Parse the CSV data
      Papa.parse(csvData, {
        complete: function(results) {
          // Parse the CSV and store it into appropriate arrays
          parseCSVData(results.data);
        },
        header: true, // Assumes the CSV has headers
        skipEmptyLines: true,
      });
    })
    .catch(error => {
      console.error('Error loading CSV file:', error);
      alert("There was an error loading the dataset.");
    });
});

// Parse CSV data into arrays
function parseCSVData(data) {
  data.forEach(row => {
    // Vaccinations: Ensure all necessary fields are present
    if (row.disease && row.vaccine && row.age_group) {
      vaccinationsData.push({
        disease: row.disease,
        vaccine: row.vaccine,
        age_group: row.age_group
      });
    }
    // Appointments: Ensure age_group and appointment are present
    if (row.age_group && row.appointment) {
      appointmentsData.push({
        age_group: row.age_group,
        appointment: row.appointment
      });
    }
  });

  console.log('Vaccinations Data:', vaccinationsData);
  console.log('Appointments Data:', appointmentsData);
}

// Handle form submission and provide AI predictions based on uploaded data
document.getElementById('reminder-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const childName = document.getElementById('child-name').value;
  const childAge = parseInt(document.getElementById('child-age').value);

  // Validate age input
  if (isNaN(childAge) || childAge <= 0) {
    alert("Please enter a valid age.");
    return;
  }

  // Get AI Predictions (vaccinations and appointments) based on age
  const predictions = getAIPredictions(childAge);

  // Display the AI predictions
  document.getElementById('predicted-details').textContent = `Suggested for ${childName} (Age: ${childAge}): ${predictions.vaccines.join(', ')}, Appointments: ${predictions.appointments.join(', ')}`;

  // Add the reminder to the upcoming reminders list
  const reminderList = document.getElementById('reminder-items');
  const listItem = document.createElement('li');
  listItem.textContent = `Child: ${childName}, Age: ${childAge}, Vaccines: ${predictions.vaccines.join(', ')}, Appointments: ${predictions.appointments.join(', ')}`;
  reminderList.appendChild(listItem);

  // Optionally, reset the form after submission
  document.getElementById('reminder-form').reset();
});

// AI-based prediction for vaccination and appointment based on the child's age
function getAIPredictions(age) {
  let vaccineList = [];
  let appointmentList = [];

  // Find matching vaccines based on age from parsed CSV data
  vaccinationsData.forEach(vaccine => {
    const ageRange = vaccine.age_group.split('-');

    // Check if the age group contains a plus sign (e.g., 5+ years)
    if (ageRange[1] && ageRange[1].includes('+')) {
      const minAge = parseInt(ageRange[0]);
      if (age >= minAge) {
        vaccineList.push(vaccine.vaccine);
      }
    } else {
      const [minAge, maxAge] = ageRange.map(Number);
      if (age >= minAge && age <= maxAge) {
        vaccineList.push(vaccine.vaccine);
      }
    }
  });

  // Find matching appointments based on age from parsed CSV data
  appointmentsData.forEach(appointment => {
    const ageRange = appointment.age_group.split('-');

    // Check if the age group contains a plus sign (e.g., 5+ years)
    if (ageRange[1] && ageRange[1].includes('+')) {
      const minAge = parseInt(ageRange[0]);
      if (age >= minAge) {
        appointmentList.push(appointment.appointment);
      }
    } else {
      const [minAge, maxAge] = ageRange.map(Number);
      if (age >= minAge && age <= maxAge) {
        appointmentList.push(appointment.appointment);
      }
    }
  });

  return {
    vaccines: vaccineList,
    appointments: appointmentList
  };
}

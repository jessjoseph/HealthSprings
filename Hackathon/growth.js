// Store growth data
const growthData = {
    measurements: [],
    milestones: [],
    vaccinations: []
};

// Elements
const growthForm = document.getElementById('growth-form');
const milestoneForm = document.getElementById('milestone-form');
const vaccinationForm = document.getElementById('vaccination-form');
const growthDataContainer = document.getElementById('growth-data-container');

// Event Listeners
growthForm.addEventListener('submit', handleGrowthSubmit);
milestoneForm.addEventListener('submit', handleMilestoneSubmit);
vaccinationForm.addEventListener('submit', handleVaccinationSubmit);

// Handle form submission for measurements (height, weight, etc.)
function handleGrowthSubmit(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const headCircumference = parseFloat(document.getElementById('head-circumference').value) || null;

    if (date && height && weight) {
        const bmi = calculateBMI(weight, height);
        growthData.measurements.push({ date, height, weight, headCircumference, bmi });
        displayGrowthData();
    }

    growthForm.reset();
}

// Handle form submission for developmental milestones
function handleMilestoneSubmit(event) {
    event.preventDefault();
    const date = document.getElementById('milestone-date').value;
    const description = document.getElementById('milestone-desc').value;

    if (date && description) {
        growthData.milestones.push({ date, description });
        displayGrowthData();
    }

    milestoneForm.reset();
}

// Handle form submission for vaccinations
function handleVaccinationSubmit(event) {
    event.preventDefault();
    const vaccineName = document.getElementById('vaccine-name').value;
    const date = document.getElementById('vaccination-date').value;

    if (vaccineName && date) {
        growthData.vaccinations.push({ vaccineName, date });
        displayGrowthData();
    }

    vaccinationForm.reset();
}

// Calculate BMI (Body Mass Index)
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;  // Convert height from cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Display all tracked data (growth measurements, milestones, and vaccinations)
function displayGrowthData() {
    growthDataContainer.innerHTML = `
        <h3>Growth Measurements</h3>
        ${growthData.measurements.length === 0 ? '<p>No measurements yet.</p>' : 
            `<ul>${growthData.measurements.map(measurement => `
                <li>
                    <span>Date:</span> ${measurement.date}<br>
                    <span>Height:</span> ${measurement.height} cm<br>
                    <span>Weight:</span> ${measurement.weight} kg<br>
                    <span>BMI:</span> ${measurement.bmi}<br>
                    <span>Head Circumference:</span> ${measurement.headCircumference ? measurement.headCircumference + ' cm' : 'N/A'}
                </li>`).join('')}</ul>`
        }

        <h3>Developmental Milestones</h3>
        ${growthData.milestones.length === 0 ? '<p>No milestones yet.</p>' : 
            `<ul>${growthData.milestones.map(milestone => `
                <li>
                    <span>Date:</span> ${milestone.date}<br>
                    <span>Milestone:</span> ${milestone.description}
                </li>`).join('')}</ul>`
        }

        <h3>Vaccinations</h3>
        ${growthData.vaccinations.length === 0 ? '<p>No vaccinations yet.</p>' : 
            `<ul>${growthData.vaccinations.map(vaccine => `
                <li>
                    <span>Vaccine:</span> ${vaccine.vaccineName}<br>
                    <span>Date Administered:</span> ${vaccine.date}
                </li>`).join('')}</ul>`
        }
    `;
}

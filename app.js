document.getElementById('symptomCheckerForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting and refreshing the page

    // Get form values
    const age = document.getElementById('age').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;

    // Save data to localStorage
    localStorage.setItem('age', age);
    localStorage.setItem('symptoms', symptoms);
    localStorage.setItem('duration', duration);
    localStorage.setItem('severity', severity);

    // Redirect to result page
    window.location.href = 'result.html';
});

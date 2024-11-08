window.onload = function() {
    // Retrieve data from localStorage
    const age = localStorage.getItem('age');
    const symptoms = localStorage.getItem('symptoms');
    const duration = localStorage.getItem('duration');
    const severity = localStorage.getItem('severity');

    // Display the data on the result page
    document.getElementById('resultAge').textContent = age || 'N/A';
    document.getElementById('resultSymptoms').textContent = symptoms || 'N/A';
    document.getElementById('resultDuration').textContent = duration || 'N/A';
    document.getElementById('resultSeverity').textContent = severity || 'N/A';

    // Generate recommendations based on the symptoms
    let recommendations = '';

    if (symptoms === 'fever') {
        recommendations = 'Ensure your child stays hydrated and gets enough rest. If the fever persists for more than 3 days or is accompanied by severe symptoms, seek medical attention.';
    } else if (symptoms === 'rash') {
        recommendations = 'Monitor the rash closely. If it spreads, becomes painful, or is accompanied by other symptoms like fever, consult a healthcare provider.';
    } else if (symptoms === 'cough') {
        recommendations = 'Ensure your child stays hydrated and gets rest. If the cough worsens or is accompanied by wheezing, seek medical attention.';
    } else if (symptoms === 'vomiting') {
        recommendations = 'Make sure your child stays hydrated. If vomiting persists or is accompanied by severe stomach pain, contact a doctor.';
    } else if (symptoms === 'diarrhea') {
        recommendations = 'Keep your child hydrated and offer small, frequent meals. If diarrhea lasts for more than 2 days, consult a healthcare provider.';
    } else if (symptoms === 'difficulty_breathing') {
        recommendations = 'Seek immediate medical attention as difficulty breathing can indicate a serious respiratory condition.';
    } else if (symptoms === 'crying') {
        recommendations = 'Excessive crying may be due to hunger, discomfort, or illness. If the crying persists and your baby shows signs of distress, consult a pediatrician.';
    } else if (symptoms === 'lethargy') {
        recommendations = 'Lethargy may indicate dehydration or an underlying condition. If your child is unusually tired or unresponsive, seek medical advice.';
    } else if (symptoms === 'no_appetite') {
        recommendations = 'Loss of appetite can be normal with minor illnesses, but if it persists for more than 2 days, consult a pediatrician.';
    } else if (symptoms === 'baby_symptoms') {
        recommendations = 'For babies, it is often difficult to predict the cause of symptoms. If your baby exhibits persistent discomfort or other concerning signs, seek medical attention.';
    }

    // Display the recommendations
    document.getElementById('recommendation').textContent = recommendations;
};

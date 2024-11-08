// Function to handle the form submission
document.getElementById("reminder-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent form submission
    
    // Get user input values
    const childName = document.getElementById("child-name").value;
    const reminderType = document.getElementById("reminder-type").value;
    const reminderDate = document.getElementById("date").value;
    const details = document.getElementById("details").value;
    
    // Create a reminder object
    const reminder = {
      childName: childName,
      reminderType: reminderType,
      reminderDate: reminderDate,
      details: details
    };
    
    // Save the reminder in local storage (this can be replaced by a backend database in a real-world scenario)
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    
    // Show success message
    document.getElementById("success-message").style.display = "block";
  
    // Reset the form
    document.getElementById("reminder-form").reset();
  
    // Update the displayed reminder list
    displayReminders();
  });
  
  // Function to display reminders
  function displayReminders() {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const reminderList = document.getElementById("reminder-items");
    reminderList.innerHTML = "";  // Clear current list
    
    // Add each reminder to the list
    reminders.forEach(function(reminder) {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${reminder.childName}</strong> - ${reminder.reminderType}<br>
        <span class="reminder-date">${new Date(reminder.reminderDate).toLocaleDateString()}</span><br>
        <span class="reminder-details">${reminder.details}</span>
      `;
      reminderList.appendChild(li);
    });
  }
  
  // Initial display of reminders when the page loads
  displayReminders();
  
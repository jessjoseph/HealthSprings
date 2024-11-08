document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmpassword").value;

    // Validate password and confirm password
    if (password !== confirmpassword) {
        // Show error message if passwords don't match
        document.getElementById("error-message").style.display = "block";
        document.getElementById("success-message").style.display = "none"; // Hide success message
    } else {
        // Show success message if passwords match
        document.getElementById("success-message").style.display = "block";
        document.getElementById("error-message").style.display = "none"; // Hide error message

        // Optionally, you can handle backend integration here to save the user data
        // For example, you can send the data to an API for user creation
        console.log({
            fullname: fullname,
            username: username,
            email: email,
            password: password
        });

        // Clear the form fields
        document.getElementById("signupForm").reset();
    }
});

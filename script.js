// Function to generate a random 16-byte token
function generateAccessToken() {
    const tokenLength = 16;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
  
  // Function to display a message on the Signup page
  function showMessage(message, isSuccess) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.color = isSuccess ? "green" : "red";
  }
  
  // Function to handle Signup form submission
  function handleSignup(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    if (password !== confirmPassword) {
      showMessage("Password and Confirm Password do not match.", false);
      return;
    }
  
    // Generate and store the access token
    const accessToken = generateAccessToken();
    const user = {
      name,
      email,
      accessToken,
      password,
    };
    localStorage.setItem("user", JSON.stringify(user));
  
    // Show success message and redirect to Profile page
    showMessage("Signup successful!", true);
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1000);
  }
  
  // Function to check if the user is logged in (access token is present)
  function isLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.accessToken;
  }
  
  // Function to display user details on the Profile page
  function showProfileDetails() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const profileDetails = document.getElementById("profileDetails");
      profileDetails.innerHTML = `
      <p><strong>Full Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Token:</strong> ${user.accessToken}</p>
      <p><strong>Password:</strong> ${user.password}</p>
    `;
    }
  }
  
  // Function to handle Logout button click
  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
  
  // Check if the user is logged in before accessing the Profile page
  if (!isLoggedIn()) {
    window.location.href = "index.html";
  }
  
  // Add event listeners
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
  
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
  
  // Check if the user is logged in on the Profile page and display user details
  if (window.location.href.endsWith("profile.html")) {
    if (!isLoggedIn()) {
      window.location.href = "index.html";
    } else {
      showProfileDetails();
    }
  }
  

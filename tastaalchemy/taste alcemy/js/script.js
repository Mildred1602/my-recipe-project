// script.js — Handles Register & Login Logic for Taste Alchemy

document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // REGISTER FORM HANDLER
  // =============================
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !email || password.length < 6) {
        alert("Please fill all fields correctly.");
        return;
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((u) => u.email === email);
      if (userExists) {
        alert("An account with this email already exists. Please login.");
        window.location.href = "login.html";
        return;
      }

      // Save new user
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));

      alert("Registration successful!");
      window.location.href = "home.html";
    });
  }

  // =============================
  // LOGIN FORM HANDLER
  // =============================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password. Try again.");
        return;
      }

      // Save logged-in user session
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ name: user.name, email: user.email })
      );

      alert(`Welcome back, ${user.name}!`);
      window.location.href = "home.html";
    });
  }
});



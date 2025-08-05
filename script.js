// Check if user is logged in
if (window.location.pathname.includes("index.html") && !localStorage.getItem("loggedUser")) {
  window.location.href = "login.html"; // Redirect to login
}

// Signup function
function signup() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    document.getElementById("message").innerText = "Username already exists!";
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("message").innerText = "Signup successful! Please login.";
  }
}

// Login function
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username] === password) {
    localStorage.setItem("loggedUser", username);
    window.location.href = "index.html";
  } else {
    document.getElementById("message").innerText = "Invalid username or password!";
  }
}

// Add post function
function addPost() {
  let postInput = document.getElementById("postInput").value;
  if (!postInput) return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift({ user: localStorage.getItem("loggedUser"), text: postInput });
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("postInput").value = "";
  displayPosts();
}

// Display posts
function displayPosts() {
  if (!document.getElementById("postsList")) return;
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let postsList = document.getElementById("postsList");
  postsList.innerHTML = "";

  posts.forEach(post => {
    let li = document.createElement("li");
    li.innerText = post.user + ": " + post.text;
    postsList.appendChild(li);
  });
}

// Load posts on homepage
if (document.getElementById("postsList")) {
  displayPosts();
}
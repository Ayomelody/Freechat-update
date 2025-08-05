// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Sign up
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => document.getElementById("message").innerText = "Signup successful! Please login.")
    .catch(err => document.getElementById("message").innerText = err.message);
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "index.html")
    .catch(err => document.getElementById("message").innerText = err.message);
}

// Logout
function logout() {
  auth.signOut().then(() => window.location.href = "login.html");
}

// Send a message
function sendMessage() {
  const user = auth.currentUser;
  if (!user) return;
  const message = document.getElementById("messageInput").value;
  if (!message) return;

  db.ref("messages").push({
    user: user.email,
    text: message
  });

  document.getElementById("messageInput").value = "";
}

// Display live messages
if (document.getElementById("messagesList")) {
  db.ref("messages").on("child_added", snapshot => {
    const msg = snapshot.val();
    const li = document.createElement("li");
    li.innerText = `${msg.user}: ${msg.text}`;
    document.getElementById("messagesList").appendChild(li);
  });
}
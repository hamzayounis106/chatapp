  const main_container = document.getElementById("main_container");
  const chat_container = document.getElementById("chat-container");

  const message_input = document.getElementById("message-input");
  const room_input = document.getElementById("room-input");
  const join_button = document.getElementById("join-button");
  const send_button = document.getElementById("send-button");
  const form = document.querySelector("form");
  const name_input_container = document.getElementById("name_input_container");
  const name_input = document.getElementById("name-input");
  const name_input_button = document.getElementById("name-button");
  var username = null;
  main_container.style.display = "none";
  name_input_button.addEventListener("click", () => {
    if (name_input.value) {
      username = name_input.value;
      console.log("Username: " + username);
      main_container.style.display = "block";
      name_input_container.style.display = "none";
    }
  });
  let serverUrl = "http://localhost:8080"; // Default to localhost for development

  // Check if the current environment is production (deployed on Vercel)
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      serverUrl = "https://chaty-fccdnuu4p-hamzayounis106s-projects.vercel.app";
  }
  
  const server = io(serverUrl);
  

  server.on("connect", () => {
    displayMessage("Connected to server with id " + server.id);
  });
  let newMessageReceived = false;

  server.on("receive_message", (message) => {
    displaynewmessage(message);
    if (document.visibilityState === "hidden") {
      document.title = "New message received!";
      newMessageReceived = true;
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && newMessageReceived) {
      document.title = "Chat App";
      newMessageReceived = false;
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = message_input.value;
    if (!message) return;
    message = `${username} : ` + message;
    const roomID = room_input.value;
    displayMessage(message);
    server.emit("send_message", message, roomID);
    message_input.value = "";
  });

  function displayMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.textContent = message;
    chat_container.appendChild(div);
  }
  function displaynewmessage(message) {
    const div = document.createElement("div");
    div.classList.add("message-new");
    div.textContent = message;
    chat_container.appendChild(div);
  }

  join_button.addEventListener("click", () => {
    const roomID = room_input.value;
    console.log("Joining room: " + roomID);
    message_input.value = "";
    chat_container.innerHTML = "";
    server.emit("join_room", roomID, (message) => {
      displayMessage(message);
    });
  });

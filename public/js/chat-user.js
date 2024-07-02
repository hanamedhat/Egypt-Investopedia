const socket = io();
let room_id;

socket.on('connect', () => {
  console.log('Connected to server');
});


function createChatBox() {
    const chatBox = document.createElement('div');
    chatBox.classList.add('chatPopup')
    chatBox.setAttribute('id','chatPopup');
    chatBox.style.display = 'flex';
    chatBox.innerHTML =`
    <div class="chat-header">
        <span>Chat</span>
        <span class="close-icon" onclick="endChat()" id="closeIcon">&times;</span>
    </div>
    <div class="chat-body" id="chatMessages"></div>
    <div class="chat-footer">
        <input type="text" class="chatInput" id="messageInput" placeholder="Type your message here...">
        <button  onclick="sendMessage()" id="sendButton" disabled>Send</button>
    </div>
    `
    console.log(`Chat box created for room`);
    const mainElement = document.querySelector('body');
    if (mainElement) {
        mainElement.appendChild(chatBox);
    } else {
        console.error('Main element not found.');
    }}

function startChat(userid){
    console.log(`!!!!!! ${userid}`);
    const sender = ''
    const receiver = 'Financial Advisor';
    const message =''
    // console.log(message)
    const role = "user";
    console.log("print start chat")
  
    socket.emit('joinRoom', { sender, receiver, role, message, userid });
    createChatBox();
    const chatIcon = document.getElementById('chatIcon')
    chatIcon.style.display = 'none'
    displayMessage("Advisor", "Waiting for advisor to join")

  }
  


socket.on('roomJoined', (data) => {
  room_id = data.room_id;
  console.log(`Joined room: ${room_id}`);
});

socket.on('advisorJoined', (data) => {
    displayMessage("Advisor", "Joined the room")
    room_id = data.room_id;
    console.log(`Advisor Joined room: ${room_id}`);
    const btn = document.getElementById("sendButton");
    btn.disabled = false;
  });


socket.on('newMessage', (data) => {
  console.log("New message received:", data);
  displayMessage(data.sender, data.message);
});

socket.on('roomClosed', (data) => {
  console.log(`Room closed: ${data.room_id}`);
  document.getElementById(`chatPopup`).remove();
  const chatIcon = document.getElementById('chatIcon')
  chatIcon.style.display = 'flex'
});

function sendMessage() {
  const sender = "user";
  const receiver = 'Financial Advisor';
  const message = document.getElementById('messageInput').value.trim();

  if (message === '') {
    alert('Please write your message.');
    return;
  }
    socket.emit('newMessage', { sender, receiver, message, room_id });
    document.getElementById('messageInput').value = '';
    console.log("the message sents succusfully")
}

function endChat(){
  socket.emit("endChat", {  room_id });
}

function displayMessage(sender, message) {
  const chat = document.getElementById('chatMessages');
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chat.appendChild(messageElement);
}
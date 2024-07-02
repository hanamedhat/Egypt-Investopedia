
const socket = io();
let room_id;

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("advisorJoined", (data) => {
    room_id = data.room_id;
    console.log(`Advisor joined room: ${data.room_id}`);
});

function createChatBox(room_id, user_id) {
    const chats = document.getElementById('containter-chatBox');
    const chatBox = document.createElement('div');
    chatBox.classList.add('chatPopup')
    chatBox.style.display = 'flex';
    chatBox.style.position = 'static';
    chatBox.setAttribute('id', `chat_${room_id}`);
    chatBox.setAttribute('user', user_id);
    // chatBox.innerHTML = `
    // <h3>Room ${room_id}</h3>
    // <div class="chatMessages" id="chatMessages_${room_id}"></div>
    // <input type="text" id="messageInput_${room_id}" placeholder="Type a message..." />
    // <button onclick="sendMessage(${room_id})">Send</button>
    // <button onclick="endChat(${room_id})">End</button>
    // `;
    chatBox.innerHTML =`
    <div class="chat-header">
        <span>Chat Room ${room_id}</span>
        <span class="close-icon" onclick="endChat(${room_id})" id="closeIcon">&times;</span>
    </div>
    <div class="chat-body" id="chatMessages_${room_id}"></div>
    <div class="chat-footer">
        <input type="text" class="chatInput" id="messageInput_${room_id}" placeholder="Type your message here...">
        <button  onclick="sendMessage(${room_id})" id="sendButton">Send</button>
    </div>
    `
    chats.appendChild(chatBox);
    console.log(`Chat box created for room: ${room_id}`);
}

socket.on("newMessage", (data) => {
    displayMessage(data.room_id, data.sender, data.message);
    console.log("Advisor received new message:", data);
});


function sendMessage(room_id) {
    const sender = "Advisor"; // Modify as needed
    const receiver = "User"; // Modify as needed
    const message = document.getElementById(`messageInput_${room_id}`).value.trim();

    if (message === "") {
    alert("Please enter a message.");
    return;
    }

    console.log(`Sending message in room ${room_id}: ${message}`);
    socket.emit("newMessage", { sender, receiver, message, room_id });
    document.getElementById(`messageInput_${room_id}`).value = "";
}


function displayMessage(room_id, sender, message) {
    const chatMessages = document.getElementById(`chatMessages_${room_id}`);
    if (chatMessages) {
    console.log(`Displaying message in room ${room_id}`);
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    console.log(`Message displayed in room ${room_id}: ${message}`);
    } else {
    console.error(`Chat box for room ${room_id} not found`);
    }
}

function addRoomToList(room) {
    const chatRequestDiv = document.getElementById('chat-requests');
    const request = document.createElement('div');
    request.classList.add('request')
    request.setAttribute('id', `room-${room.roomid}`);
    request.setAttribute('user', room.userid)
    // request.innerHTML = `
        
    // <strong>Room ID:</strong> <span class="roomID">${room.roomid}</span>
    // <button class="acceptBtn" data-room-id="${room.roomid}">Accept</button>
    // `;
    request.innerHTML= `
        <strong>Room ID:</strong> <span class="roomID">${room.roomid}</span>
        <div class="name"> Name: John Doe </div>
        <button class="btn1" data-room-id="${room.roomid}">Accept</button>
    `
    chatRequestDiv.appendChild(request);

    request.querySelector('.btn1').addEventListener('click', () => {
    console.log(`Accept button clicked for room: ${room.roomid}`);
    const sender = "Advisor";
    const receiver = "";
    const role = "Advisor";
    const message = '';
    socket.emit("joinRoom", { sender, receiver, role, message, room_id: room.roomid ,receiver});
    createChatBox(room.roomid, room.userid);
    socket.emit('roomAccepted', { room_id: room.roomid });
    fetchHighlights(room.userid)
    });
}


function endChat(room_id){
    socket.emit("endChat", {  room_id });
}


socket.on('roomClosed', (data) => {
    console.log(`Room closed: ${data.room_id}`);
    const chatBox = document.getElementById(`chat_${data.room_id}`);
    const user_id = chatBox.getAttribute('user')
    if (chatBox) {
    chatBox.remove();
    }
    const textArea = document.createElement('textarea');
    const sendHighlight = document.createElement('button');
    const highlights = document.getElementById('highlights')
    textArea.setAttribute('id', `textarea_${data.room_id}`);
    sendHighlight.setAttribute('id', `send-highlight_${data.room_id}`);
    sendHighlight.setAttribute('type', `button`);
    sendHighlight.onclick= () =>{
    send_highlight(data.room_id, user_id);
    };
    highlights.appendChild(sendHighlight);
    highlights.appendChild(textArea);
    sendHighlight.innerHTML = 'send highlight'
});

// document.querySelectorAll('.acceptBtn').forEach(button => {
//   button.addEventListener('click', () => {
//     const room_id = button.getAttribute('data-room-id');
//     const user_id = button.getAttribute('user');
//     console.log(`user id..........: ${user_id}`)

//     console.log(`Accept button clicked for room: ${room_id}`);
//     const sender = "Advisor";
//     const receiver = "";
//     const role = "Advisor";
//     const message = "";
//     socket.emit("joinRoom", { sender, receiver, role, message, room_id });
//     // HEREEEEEEEEEE
//     createChatBox(room_id, user_id);
//   });
// });

async function send_highlight(room_id, user_id){
    try {
    const textareaElement = document.getElementById(`textarea_${room_id}`);
const buttonElement = document.getElementById(`send-highlight_${room_id}`);
const textareaHighlight = textareaElement ? textareaElement.value : '';

if (!textareaHighlight) {
    alert('Please enter a highlight before sending.');
    return;
}
console.log('Sending data:', { room_id, textareaHighlight });
const response = await fetch('/send_highlight', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ room_id, user_id, textareaHighlight })
});

const result = await response.json();

if (response.ok) {
    console.log(result.message);
    
    // Remove the textarea and button only if the highlight is successfully saved
    if (textareaElement) {
    textareaElement.remove();
    }
    if (buttonElement) {
    buttonElement.remove();
    }
} else {
    console.error(result.message);
    alert('Failed to save highlight. Please try again.');
}
} catch (error) {
console.error('Error:', error);
alert('An error occurred while saving the highlight. Please try again.');
}
}




function removeRoomFromList(room_id) {
    const li = document.getElementById(`room-${room_id}`);
    if (li) {
    li.remove();
    }
}


function fetchRooms() {
    fetch('/api/rooms')
    .then(response => response.json())
    .then(data => {
        const currentRooms = Array.from(document.querySelectorAll('#chat-requests div')).map(li => parseInt(li.id.replace('room-', '')));
        // console.log(`currentRooms ${currentRooms}`)
        const newRooms = data.filter(room => !currentRooms.includes(room.roomid));
        //console.log(newRooms)

        //document.getElementById("totalRequests").innerText = currentRooms.length;

        newRooms.forEach(room => addRoomToList(room));

        const updatedRooms = data.map(room => room.roomid);
        currentRooms.forEach(room_id => {
        if (!updatedRooms.includes(room_id)) {
            removeRoomFromList(room_id);
        }
        });
        document.getElementById("totalRequests").innerText = data.length
    })
    .catch(error => console.error('Error fetching rooms:', error));
}

setInterval(fetchRooms, 1000);


function fetchHighlights(userid) {
    fetch(`/api/highlight?userid=${userid}`)
        .then(response => response.json())
        .then(data => {
            console.log(`DATA: ${JSON.stringify(data, null, 2)}`);

            // Clear any existing content in the highlights container
            const highlightsContainer = document.getElementById("highlightsContainer");
            // highlightsContainer.innerHTML = "";

            // Loop through the data array and create elements for each highlight
            data.forEach(highlight => {
                const highlightElement = document.createElement("div");
                highlightElement.classList.add(`request_${userid}`);
                highlightElement.classList.add('request')
                const userIdText = document.createElement('div')
                userIdText.classList.add('name')
                userIdText.innerText=`User ID : ${userid}`
                const descriptionElement = document.createElement("p");
                descriptionElement.innerText = highlight.highlightDescription;
                highlightElement.appendChild(userIdText)
                highlightElement.appendChild(descriptionElement);

                highlightsContainer.appendChild(highlightElement);
            });

            document.getElementById("highLightUserId").innerText = userid;
        })
        .catch(error => console.error('Error fetching highlights:', error));
}

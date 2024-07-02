document.addEventListener('DOMContentLoaded', function() {
    var chatIcon = document.getElementById('chatIcon');
    var chatPopup = document.getElementById('chatPopup');
    var closeIcon = document.getElementById('closeIcon');
    var chatInput = document.getElementById('chatInput');
    var sendButton = document.getElementById('sendButton');
    var chatBody = document.getElementById('chatBody');

    chatIcon.addEventListener('click', function() {
        chatPopup.style.display = 'flex';
        chatIcon.style.display = 'none';
    });

    closeIcon.addEventListener('click', function() {
        chatPopup.style.display = 'none';
        chatIcon.style.display = 'flex';
    });

    sendButton.addEventListener('click', function() {
        var message = chatInput.value.trim();
        if (message) {
            var messageElement = document.createElement('p');
            messageElement.textContent = message;
            chatBody.appendChild(messageElement);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyARXzMp2bwIxoWV_U0acnWOFfpVFQGTKYA",
    authDomain: "login-beckand.firebaseapp.com",
    projectId: "login-beckand",
    storageBucket: "login-beckand.appspot.com",
    messagingSenderId: "757374340652",
    appId: "1:757374340652:web:b7e6d26bf9f26a8b374b89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Check if user is logged in and redirect to chatbox if true
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }
});

const modal = document.querySelector(".modal");
const fileInput = document.getElementById('fileInput');
const chatBox = document.getElementById('chatBox');
const attachButton = document.getElementById('attachButton');
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');

// Function to open the modal
const openModal = () => {
    modal.classList.add("active");
};

// Function to close the modal
const closeModal = () => {
    modal.classList.remove("active");
};

// Function to handle file input and display file name
const handleFileUpload = () => {
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const newUserMessage = document.createElement('div');
            newUserMessage.classList.add('message', 'user1');

            const user = document.createElement('div');
            user.classList.add('user');
            user.textContent = 'You:';

            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent = `Uploaded file: ${file.name}`;

            newUserMessage.appendChild(user);
            newUserMessage.appendChild(text);

            chatBox.appendChild(newUserMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });
};

// Function to send a message
const sendMessage = () => {
    if (messageInput.value.trim() !== '') {
        const newUserMessage = document.createElement('div');
        newUserMessage.classList.add('message', 'user1');

        const user = document.createElement('div');
        user.classList.add('user');
        user.textContent = 'You:';

        const text = document.createElement('div');
        text.classList.add('text');
        text.textContent = messageInput.value;

        newUserMessage.appendChild(user);
        newUserMessage.appendChild(text);

        chatBox.appendChild(newUserMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        messageInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(newUserMessage.querySelector('.text').textContent);

            const newBotMessage = document.createElement('div');
            newBotMessage.classList.add('message', 'user2');

            const botUser = document.createElement('div');
            botUser.classList.add('user');
            botUser.textContent = 'Bot:';

            const botText = document.createElement('div');
            botText.classList.add('text');
            botText.textContent = botResponse;

            newBotMessage.appendChild(botUser);
            newBotMessage.appendChild(botText);

            chatBox.appendChild(newBotMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
};

// Event listener for send button in chat
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key press
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Show file input when attach button is clicked
attachButton.addEventListener('click', () => {
    fileInput.click();
});

// Initialize file handling
handleFileUpload();

// Function to handle bot response based on user input
const getBotResponse = (userInput) => {
    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "hr": "For HR policies, you can refer to the HR section on our website.",
        "support": "For IT support, please contact the IT helpdesk.",
        "events": "Check our company events calendar for upcoming events.",
        "default": "I'm not sure how to respond to that. Can you please clarify?"
    };

    const lowerCaseInput = userInput.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerCaseInput.includes(keyword)) {
            return response;
        }
    }
    return responses["default"];
};

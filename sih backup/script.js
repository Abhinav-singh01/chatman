const modal = document.querySelector(".modal");
const outlay = document.querySelector(".outlay");
const loginContainer = document.querySelector("#loginContainer");
const fileInput = document.getElementById('fileInput');
const chatBox = document.getElementById('chatBox');
const attachButton = document.getElementById('attachButton');
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');

// Function to open the modal
const openModal = () => {
    modal.classList.add("active");
    outlay.classList.add("overlayactive");
};

// Function to close the modal
const closeModal = () => {
    modal.classList.remove("active");
    outlay.classList.remove("overlayactive");
};

// Function to open the login container
const openLogin = () => {
    loginContainer.classList.add("logactive"); // Show login container
};

// Function to close the login container
const closeLogin = () => {
    loginContainer.classList.remove("logactive"); // Hide login container
};

// Function to handle bot response based on user input
const getBotResponse = (userInput) => {
    // Define bot responses
    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "hr": "For HR policies, you can refer to the HR section on our website.",
        "support": "For IT support, please contact the IT helpdesk.",
        "events": "Check our company events calendar for upcoming events.",
        "default": "I'm not sure how to respond to that. Can you please clarify?"
    };
    
    // Convert user input to lowercase and find a response
    const lowerCaseInput = userInput.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerCaseInput.includes(keyword)) {
            return response;
        }
    }
    return responses["default"];
};

// Function to handle file input and display file name
const handleFileUpload = () => {
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Add user file name as message
            const newUserMessage = document.createElement('div');
            newUserMessage.classList.add('message', 'user1'); // User message

            const user = document.createElement('div');
            user.classList.add('user');
            user.textContent = 'You:';

            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent = `Uploaded file: ${file.name}`; // Display file name

            newUserMessage.appendChild(user);
            newUserMessage.appendChild(text);

            chatBox.appendChild(newUserMessage);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        }
    });
};

// Function to send a message
const sendMessage = () => {
    if (messageInput.value.trim() !== '') {
        // Add user message
        const newUserMessage = document.createElement('div');
        newUserMessage.classList.add('message', 'user1'); // User message

        const user = document.createElement('div');
        user.classList.add('user');
        user.textContent = 'You:';
        
        const text = document.createElement('div');
        text.classList.add('text');
        text.textContent = messageInput.value;
        
        newUserMessage.appendChild(user);
        newUserMessage.appendChild(text);
        
        chatBox.appendChild(newUserMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        
        messageInput.value = ''; // Clear the input field

        // Delay bot response by 1 second (1000 milliseconds)
        setTimeout(() => {
            const botResponse = getBotResponse(newUserMessage.querySelector('.text').textContent);
            
            const newBotMessage = document.createElement('div');
            newBotMessage.classList.add('message', 'user2'); // Bot message

            const botUser = document.createElement('div');
            botUser.classList.add('user');
            botUser.textContent = 'Bot:';
            
            const botText = document.createElement('div');
            botText.classList.add('text');
            botText.textContent = botResponse;
            
            newBotMessage.appendChild(botUser);
            newBotMessage.appendChild(botText);
            
            chatBox.appendChild(newBotMessage);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        }, 1000); // 1000 milliseconds = 1 second
    }
};

// Event listener for send button in chat
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key press
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default newline behavior
        sendMessage();
    }
});

// Open login container when login button is clicked
// document.getElementById('loginButton').addEventListener('click', openLogin);

// Close login container if clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === loginContainer) {
        closeLogin();
    }
});

// Show file input when attach button is clicked
attachButton.addEventListener('click', () => {
    fileInput.click(); // Trigger file input dialog
});

// Initialize file handling
handleFileUpload();

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signInForm');
const signUpForm=document.getElementById('signUpForm');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
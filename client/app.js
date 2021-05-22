const socket = io('http://localhost:3000/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const container = document.querySelector('.container');

const audio = new Audio('static/ring.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
    if(position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const mssg = messageInput.value
    append(`You: ${mssg}`,'right');
    socket.emit('send', mssg);
    messageInput.value = '';
})

const person = prompt('Enter the name to join');
socket.emit('new-user-joined', person);

socket.on('user-joined', name =>{
    console.log(name);
    append(`${name} joined the chat`,'right');
})

socket.on('chat', data => {
    console.log('From server: ', data);
    append(`${data.name}: ${data.message}`,'left');
})
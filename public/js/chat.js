const socket = io('/chatting');

const getElementById = (id) => document.getElementById(id) || null;

//get Dom element

const helloUserElement = getElementById('hello_chatting');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

const drawHelloStranger = (username) => {
    return (helloUserElement.innerText = `${username} 안녕하세요`);
};
const drawNewChat = (message) => {
    const wrapperChatBox = document.createElement('div');
    const chatBox = `<div>${message}</div>`;
    wrapperChatBox.innerHTML = chatBox;
    chattingBoxElement.append(wrapperChatBox);
};

const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements[0].value;
    if (inputValue !== '') {
        socket.emit('submit_chat', inputValue);
        drawNewChat(inputValue);
        e.target.elements[0].value = '';
    }
};

socket.on('user_connected', (username) => {
    console.log(username);
    drawNewChat(`${username} conneted`);
});
socket.on('new_chat', (data) => {
    const { chat, username } = data;
    drawNewChat(`${username}: ${chat}`);
});

const helloUser = () => {
    const username = prompt('What is your name?');
    socket.emit('new_user', username, (data) => {
        drawHelloStranger(data);
    });
};

function init() {
    helloUser();
    formElement.addEventListener('submit', handleSubmit);
}

init();

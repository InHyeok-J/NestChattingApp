const getElementById = (id) => document.getElementById(id) || null;

//get Dom element

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

const helloUser = () => {
    const username = prompt('What is your name?');
};

function init() {
    helloUser();
}

init();

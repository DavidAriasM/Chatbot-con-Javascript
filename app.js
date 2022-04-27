window.onload = function() {
    document.getElementById('inputChat').focus()
}

talk = () => {
    const MENSAJE_ERROR = 'Lo siento, no entiendo tu mensaje 😔';
    let inputChat = document.getElementById('inputChat').value;
    if (inputChat !== "") {
        fetch('chat.json')
            .then(response => response.json())
            .then(data => {
                const escribiendo = document.createElement('div');
                escribiendo.className = 'escribiendo';
                escribiendo.textContent = 'Escribiendo...';
                document.querySelector('svg').style.display = 'none';
                document.getElementById('chatLog').innerHTML += "<div class='div-preguntas'><p class='pregunta'>" + inputChat + "</p></div>";
                inputChat = inputChat.toLowerCase().trim();
                document.getElementById('chatLog').appendChild(escribiendo)
                scrollToBottom();
                if (inputChat in data) {
                    setTimeout(() => {
                        escribiendo.remove();
                        document.getElementById('chatLog').innerHTML += "<div class='div-respuestas'><p class='respuesta'>" + data[inputChat] + "</p></div>";
                        scrollToBottom();
                    }, 2000)
                } else {
                    setTimeout(() => {
                        escribiendo.remove();
                        document.getElementById('chatLog').innerHTML += "<div class='div-respuestas'><p class='error'>" + MENSAJE_ERROR + "</p></div>";
                        scrollToBottom();
                    }, 2000)
                }

                document.getElementById('inputChat').value = "";
                document.getElementById('inputChat').focus();
            })
    }
}

const scrollToBottom = () => {
    const element = document.getElementById('chatLog');
    element.scrollTop = element.scrollHeight;
}
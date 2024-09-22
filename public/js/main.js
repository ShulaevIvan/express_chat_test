window.addEventListener('DOMContentLoaded', () => {
    const chatWrap = document.querySelector('.chat-window-main-wrap');
    let socket;
    const checkUser = async () => {
        await fetch(`http://localhost:3000/check-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status) {
                socket = io('/', {query: `userId=${data.userId}`});
                socket.on('reconnecting', (msg) => {
                    console.log(msg)
                })
                socket.on(('test', (arg) => {
                    console.log('test')
                }));
                socket.on('disconnect', function () {
                    console.log('disconnect client event....');
                });
               
                const chatMessagesWrap = chatWrap.querySelector('.chat-messages-wrap');
                const userInput = chatWrap.querySelector('.chat-main-input');
                const sendBtn = chatWrap.querySelector('.chat-send-btn');
                const usersWrap = chatWrap.querySelector('.chat-window-users-wrap');
                const chatUsers = usersWrap.querySelectorAll('.user-item-wrap');

                sendBtn.addEventListener('click', (e) => {
                    if (!userInput.value) return;
                    socket.emit('message-to-all', {
                        userId: data.userId,
                        text: userInput.value,
                    })
                });

            }
        });
    };

    checkUser();
});
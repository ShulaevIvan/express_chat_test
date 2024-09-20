window.addEventListener('DOMContentLoaded', () => {
    const loginWrap = document.querySelector('.login-form-wrap');
    const loginForm = loginWrap.querySelector('form');
    const loginInput = loginWrap.querySelector('#login-input');
    const passwordInput = loginWrap.querySelector('#password-input');
    const sendBtn = loginWrap.querySelector('.login-enter-btn');

    const sendHandler = async (url, sendData) => {
        console.log(url)
        await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response)
        })
    };

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const sendData = {
            email: loginInput.value,
            password: passwordInput.value
        }
        if (sendData.email && sendData.password) {
            sendHandler('/login', sendData);
        }
    });

});
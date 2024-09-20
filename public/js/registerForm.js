window.addEventListener('DOMContentLoaded', () => {
    const popupWrap = document.querySelector('.register-popup-wrap');
    const registerForm = popupWrap.querySelector('form')
    const formInputs = Array.from(popupWrap.querySelectorAll('.form-item-input'));
    const messageForm = registerForm.querySelector('.message-text');
    const sendData = {};

    const inputHandler = (e, input) => {
        const inputType = input.getAttribute('name');
        sendData[inputType] = input.value;
    };

    const sendHandler = async (url, sendingData) => {
        messageForm.textContent = '';
        await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(sendingData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 201) {
                formInputs.forEach((item) => item.value = '');
            }
            return response.json();
        })
        .then((data) => {
            if (data && data.status === 'user exists') {
                messageForm.textContent = data.status;
            }
        })
    };

    formInputs.forEach((formInput) => {
        formInput.addEventListener('change', (e) => inputHandler(e, formInput));
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (sendData && sendData.username && sendData.email && sendData.password) {
            sendHandler('/register', sendData);
        }
    });

});
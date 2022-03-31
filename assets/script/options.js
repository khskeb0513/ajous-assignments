{
    chrome.runtime.sendMessage({type: 'GET_PORTLET_LIST'});

    chrome.runtime.onMessage.addListener(message => {
        switch (message.type) {
            case 'GET_PORTLET_LIST': {
                message.message.forEach(name => {
                    document.querySelector(`input[value=${name}]`).checked = true
                })
            }
        }
    })

    document.querySelector('button#save-portlet-list').addEventListener('click', () => {
        const list = [];
        document.querySelectorAll(`input[name=portlet-list]`).forEach(value => {
            if (!!value.checked) list.push(value.value)
        })
        chrome.runtime.sendMessage({type: 'SAVE_PORTLET_LIST', message: list});
    })
}

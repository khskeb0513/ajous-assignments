{
    chrome.runtime.sendMessage({type: 'GET_PORTLET_LIST'});

    chrome.runtime.onMessage.addListener(message => {
        switch (message.type) {
            case 'GET_PORTLET_LIST': {
                message.message.portletList.forEach(name => {
                    document.getElementById(`portlet-${name}`).style.display = 'block'
                    chrome.runtime.sendMessage({type: name});
                })
                break;
            }
            case 'ASSIGNMENTS': {
                document.getElementById('assignments-content').innerHTML = message.message
                break;
            }
            case 'MEALS': {
                if (!message.message) {
                    document.getElementById('meals-content').innerHTML = '<p>등록된 정보가 없습니다.</p>'
                } else {
                    document.getElementById('meals-content').innerHTML = message.message
                }
                break;
            }
            case 'LIBRARY': {
                if (!message.message) {
                    document.getElementById('library-content').innerHTML = '<p>등록된 정보가 없습니다.</p>'
                } else {
                    document.getElementById('library-content').innerHTML = message.message
                }
                break;
            }
        }
        return true;
    })
}

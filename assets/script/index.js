{
    chrome.runtime.sendMessage({type: 'ASSIGNMENTS'});
    chrome.runtime.sendMessage({type: 'MEALS'});
    chrome.runtime.sendMessage({type: 'LIBRARY'});

    chrome.runtime.onMessage.addListener(message => {
        switch (message.type) {
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
    })
}

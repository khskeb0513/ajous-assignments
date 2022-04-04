{
    chrome.runtime.sendMessage({type: 'GET_PORTLET_LIST'});

    chrome.runtime.onMessage.addListener(message => {
        document.querySelectorAll('.container img')
            .forEach(value => {
                value.setAttribute('style', 'cursor: zoom-in;')
                if (value.getAttribute('set-click-event') !== 'true') {
                    value.addEventListener('click', () => window.open(value.src, '_blank'))
                    value.setAttribute('set-click-event', 'true')
                }
            })

        switch (message.type) {
            case 'REFRESH_PAGE': {
                document.location.reload();
                return window.scrollTo(0, 0);
            }
            case 'GET_PORTLET_LIST': {
                message.message.forEach(name => {
                    const portletElement = document.getElementById(`portlet-${name}`)
                    if (!!portletElement) portletElement.style.display = 'block'
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
            case 'USE_LIBRARY': {
                document.getElementById('use-library-content').innerHTML = message.message
            }
        }
        return true;
    })
}

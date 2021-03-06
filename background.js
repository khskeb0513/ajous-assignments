const PortletEnum = {
    assignments: 'ASSIGNMENTS',
    meals: 'MEALS',
    library: 'LIBRARY',
    useLibrary: 'USE_LIBRARY'
}

chrome.runtime.onInstalled.addListener(details => {
    chrome.storage.sync.set({portletList: Object.values(PortletEnum)})
    chrome.tabs.create({url: 'landing.html'});
})

chrome.action.onClicked.addListener(tab => {
    chrome.tabs.create({url: 'index.html'});
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'REFRESH_PAGE': {
            return chrome.runtime.sendMessage({type: 'REFRESH_PAGE'});
        }
        case 'GET_PORTLET_LIST': {
            return chrome.storage.sync.get('portletList').then(r =>
                chrome.tabs.sendMessage(sender.tab.id, {...message, message: r.portletList})
            )
        }
        case 'SAVE_PORTLET_LIST': {
            return chrome.storage.sync.set({portletList: message.message})
        }
        case 'ASSIGNMENTS': {
            (async () => {
                const getCookie = async () => chrome.cookies.get({
                    url: 'https://eclass2.ajou.ac.kr', name: 'BbRouter'
                });
                const render = async () => {
                    const cookie = await getCookie()
                    return fetch('https://ajous.ga/assignments/render', {
                        method: 'POST', body: `cookie=${cookie.name}=${cookie.value}`, headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(r => r.text())
                };
                const requestAuth = () => chrome.windows.create({
                    type: "popup",
                    url: 'https://eclass2.ajou.ac.kr',
                    height: 360,
                    width: 420
                }).then(window => {
                    return chrome.webRequest.onBeforeRedirect.addListener(details => {
                        render().then(r => chrome.tabs.sendMessage(sender.tab.id, {...message, message: r}));
                        chrome.windows.remove(window.id);
                    }, {
                        urls: ['https://eclass2.ajou.ac.kr/webapps/*auth*']
                    });
                })
                const cookie = await getCookie();
                if (!cookie) return requestAuth();
                render().then(r => {
                    if (!r) {
                        return requestAuth();
                    } else {
                        render().then(r => chrome.tabs.sendMessage(sender.tab.id, {...message, message: r}));
                    }
                })
                return true;
            })()
            return true;
        }
        case 'MEALS': {
            const date = new Date();
            let month = (date.getMonth() + 1).toString();
            month = month.length === 1 ? 0 + month : month
            const dateStr = date.getFullYear() + month + date.getDate()
            fetch(`https://ajous.ga/meals/render?date=${dateStr}`)
                .then(r => r.text())
                .then(r => {
                    chrome.tabs.sendMessage(sender.tab.id, {...message, message: r})
                    return true;
                })
            return true;
        }
        case 'LIBRARY': {
            (async () => {
                const getCookie = async () => chrome.cookies.get({
                    url: 'https://library.ajou.ac.kr', name: 'AJOUPYXIS2'
                });
                const render = async () => {
                    const cookie = await getCookie()
                    return fetch('https://ajous.ga/library/render', {
                        method: 'POST', body: `cookieValue=${cookie.value}`, headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(r => r.text())
                };
                const requestAuth = () => chrome.windows.create({
                    type: "popup",
                    url: 'https://library.ajou.ac.kr/portal-sso/service_front.jsp?type=charge',
                    height: 360,
                    width: 420
                }).then(window => {
                    return chrome.webRequest.onCompleted.addListener(details => {
                        render().then(r => chrome.tabs.sendMessage(sender.tab.id, {...message, message: r}));
                        chrome.windows.remove(window.id);
                    }, {
                        urls: ['https://library.ajou.ac.kr/pyxis-api/1/api/charges*']
                    });
                })
                const cookie = await getCookie();
                if (!cookie) return requestAuth();
                render().then(r => {
                    if (!r) {
                        return requestAuth();
                    } else {
                        render().then(r => chrome.tabs.sendMessage(sender.tab.id, {...message, message: r}));
                    }
                })
                return true;
            })()
            return true;
        }
        case 'USE_LIBRARY': {
            fetch('https://library.ajou.ac.kr/pyxis-api/1/static-pages/MYLIBRARY-CHARGES')
                .then(r => r.json()).then(r => chrome.tabs.sendMessage(sender.tab.id, {...message, message: r.data}));
            return true;
        }
    }
})

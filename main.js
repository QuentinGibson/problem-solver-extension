function prepTote(tab) {
    const url = tab.url
    

}
function onClickHandler() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.active) {
            prepTote(tab)
        }
    })
}
chrome.contextMenus.onClicked.addListener(onClickHandler)

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Prep tote",
        "contexts": ["page"],
        "id": "prep_tote"
     })
})
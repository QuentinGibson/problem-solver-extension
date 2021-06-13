function prepTote(url) {
    function submitTote() {
        const toteForm = document.querySelector("form[action='/picklist_change_tote/set_tote']")
        const tote = document.querySelector("a[href='https:/view_tote/view_assignment?id=5186201']").innerText
        const input = document.querySelector('input[name="tote_code"]')

        input.value = tote
        toteForm.requestSubmit()

    }
    function addMissingItem() {
        const skippedElements = document.getElementsByClassName('item-status--skipped')
        if (skippedElements) {
            const firstSkipped = skippedElements[0]
            const skippedAsin = firstSkipped.getElementsByTagName('td')[1].getElementsByTagName('a').innerText
            const input = document.getElementsByName('asin_or_upc')
            const asinForm = document.querySelector("form[action='/picklist/pack_product']")

            input.value = skippedAsin
            asinForm.requestSubmit()
        } else {
            chrome.tabs.onUpdated.removeListener(onUpdateListener)
        }
    }

    const isTotePage = url => url.includes('view_pack_by_picklist')
    const isUnknownLocationPage = url => url.includes('pack_from_unknown_location')

    const toteForm = document.querySelector("form[action='/picklist_change_tote/set_tote']")
    const asinForm = document.querySelector("form[action='/picklist/pack_product']")

    if(isTotePage(url)) {
        if (toteForm) {
            submitTote()
        } else if (asinForm) {
            addMissingItem()
        }
    } else if (isUnknownLocationPage(url)) {
        const selectElement = document.getElementById('location_')
        const location = selectElement.getElementsByTagName('option')[selectElement.getElementsByTagName('option').length - 1].value
        selectElement.value = location

    }


}
function onClickHandler() {
    chrome.tabs.onUpdated.addListener(onUpdateListener)
}
chrome.contextMenus.onClicked.addListener(onClickHandler)

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Prep tote",
        "contexts": ["page"],
        "id": "prep_tote"
     })
})

const onUpdateListener = (tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.active) {
            const url = tab.url
            prepTote(url)
        }
    }
    